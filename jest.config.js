/** @type {import('@jest/types').Config.InitialOptions} */
module.exports = {
  globals: {
    // TODO: [PLAT-1260] Remove once Jest memory leak in Node ^16.11 is addressed
    'ts-jest': {
      isolatedModules: true,
    },
  },
  preset: 'ts-jest',
  setupFilesAfterEnv: ['./jest.setup.js'],
  testEnvironment: 'node',
  testPathIgnorePatterns: [
    'mocks',
    '<rootDir>/node_modules/',
    '<rootDir>/config/',
  ],
};
