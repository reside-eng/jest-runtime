<!-- Replace this title and any other reference to `jest-runtime` with
the UI library's name – i.e. fastify-tools -->

<div align="center">
   <h1>@side/jest-runtime</h1>
   <div>Custom runtime for Jest which addresses memory leak when using Typescript</div>
   </br>
</div>

<div align="center">

   <!-- TODO: Uncomment public package specific badges below -->
   <!-- [![NPM version][npm-image]][npm-url]
   [![License][license-image]][license-url] -->

[![Build Status][build-status-image]][build-status-url]
[![Coverage][coverage-image]][coverage-url]
[![semantic-release][semantic-release-icon]][semantic-release-url]
[![Code Style][code-style-image]][code-style-url]

</div>

**NOTE** This package was intentionally left as JS instead of being converted to TS because it is only a slight modification of existing Jest code

1. Install SWC if you haven't already `@swc/core @swc/jest`
1. Make sure to configure SWC if you haven't already:

   ```
   {
      "jsc": {
         "parser": {
            "syntax": "typescript",
            "decorators": true
         },
         "transform": {
            "legacyDecorator": true,
            "decoratorMetadata": true
         }
      }
   }
   ```

1. Install custom runtime: `yarn add @side/jest-runtime`
1. Use within `jest.config.js`:
   ```js
   module.exports = {
     transform: {
       '^.+\\.ts$': '@swc/jest',
     },
     runtime: '@side/jest-runtime',
   };
   ```

This is the template repository for creating additional typescript libraries.
Once a new repository has been created off this template, follow the steps below
to finalize the initial setup process:

1. Find all relevant `TODO:` references and make adjustments accordingly
1. Start making PRs with basic functionality - continue to next section once library is publishable

## Enable Publishing

1. Add your new repository to the repositories with access to [`NPM_PUBLISH_TOKEN` org level secret](https://github.com/organizations/reside-eng/settings/secrets/actions/NPM_PUBLISH_TOKEN)
1. Create a PR removing `if: ${{ false }}` from release workflow
1. Merge above mentioned PR to create first release - this will take a while since all PRs up until this first release will be marked as released by semantic-release

[npm-image]: https://img.shields.io/npm/v/@side/jest-runtime.svg?style=flat-square
[npm-url]: https://npmjs.org/package/@side/jest-runtime
[build-status-image]: https://github.com/reside-eng/jest-runtime/actions/workflows/release.yml/badge.svg
[build-status-url]: https://github.com/reside-eng/jest-runtime/actions
[license-image]: https://img.shields.io/npm/l/@side/jest-runtime.svg?style=flat-square
[license-url]: https://github.com/reside-eng/jest-runtime/blob/main/LICENSE
[code-style-image]: https://img.shields.io/badge/code%20style-airbnb-blue.svg?style=flat-square
[code-style-url]: https://github.com/airbnb/javascript
[semantic-release-icon]: https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg?style=flat-square
[semantic-release-url]: https://github.com/semantic-release/semantic-release
[coverage-image]: https://coveralls.io/repos/github/reside-eng/jest-runtime/badge.svg?branch=main&t=w0cgzF
[coverage-url]: https://coveralls.io/github/reside-eng/jest-runtime?branch=main
