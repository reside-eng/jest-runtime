/* eslint-disable import/no-extraneous-dependencies, no-underscore-dangle, jsdoc/require-jsdoc */
const { default: JestRuntime } = require('jest-runtime');
const { compileFunction } = require('vm');
const { handlePotentialSyntaxError } = require('@jest/transform');

function notEmpty(value) {
  return value !== null && value !== undefined;
}

module.exports = class CompileFunctionRuntime extends JestRuntime {
  _execModule(localModule, options, moduleRegistry, from) {
    if (this.isTornDown) {
      this._logFormattedReferenceError(
        'You are trying to `import` a file after the Jest environment has been torn down.',
      );
      process.exitCode = 1;
      return;
    }

    // If the environment was disposed, prevent this module from being executed.
    if (!this._environment.global) {
      return;
    }

    const module = localModule;
    const { filename } = module;
    const lastExecutingModulePath = this._currentlyExecutingModulePath;
    this._currentlyExecutingModulePath = filename;
    const origCurrExecutingManualMock = this._isCurrentlyExecutingManualMock;
    this._isCurrentlyExecutingManualMock = filename;

    module.children = [];

    Object.defineProperty(module, 'parent', {
      enumerable: true,
      get() {
        const key = from || '';
        return moduleRegistry.get(key) || null;
      },
    });

    module.paths = this._resolver.getModulePaths(module.path);
    Object.defineProperty(module, 'require', {
      value: this._createRequireImplementation(module, options),
    });

    let compiledFunction = null;

    const vmContext = this._environment.getVmContext();

    if (vmContext) {
      try {
        compiledFunction = compileFunction(
          this.transformFile(filename, options),
          this.constructInjectedModuleParameters(),
          {
            filename,
            parsingContext: vmContext,
          },
        );
      } catch (e) {
        throw handlePotentialSyntaxError(e);
      }
    }

    if (compiledFunction === null) {
      this._logFormattedReferenceError(
        'You are trying to `import` a file after the Jest environment has been torn down.',
      );
      process.exitCode = 1;
      return;
    }

    const jestObject = this._createJestObjectFor(filename);

    this.jestObjectCaches.set(filename, jestObject);

    const lastArgs = [
      this._config.injectGlobals ? jestObject : undefined, // jest object
      ...this._config.sandboxInjectedGlobals.map((globalVariable) => {
        if (this._environment.global[globalVariable]) {
          return this._environment.global[globalVariable];
        }

        throw new Error(
          `You have requested '${globalVariable}' as a global variable, but it was not present. Please check your config or your global environment.`,
        );
      }),
    ];

    if (!this._mainModule && filename === this._testPath) {
      this._mainModule = module;
    }

    Object.defineProperty(module, 'main', {
      enumerable: true,
      value: this._mainModule,
    });

    try {
      compiledFunction.call(
        module.exports,
        module, // module object
        module.exports, // module exports
        module.require, // require implementation
        module.path, // __dirname
        module.filename, // __filename
        ...lastArgs.filter(notEmpty),
      );
    } catch (error) {
      this.handleExecutionError(error, module);
    }

    this._isCurrentlyExecutingManualMock = origCurrExecutingManualMock;
    this._currentlyExecutingModulePath = lastExecutingModulePath;
  }
};
