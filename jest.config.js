/** @type {import('@jest/types').Config.InitialOptions} */
module.exports = {
  setupFilesAfterEnv: ['./jest.setup.js'],
  testEnvironment: 'node',
  testPathIgnorePatterns: [
    'mocks',
    '<rootDir>/node_modules/',
    '<rootDir>/config/',
  ],
};
