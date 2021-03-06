module.exports = {
  globals: {
    PROD: true,
    TEST: true,
  },
  testEnvironment: 'node',
  moduleNameMapper: {
    '\\.(scss|css)$': 'identity-obj-proxy',
  },
  globalSetup: '<rootDir>/test/setTZ.ts',
  setupFilesAfterEnv: ['<rootDir>/test/server/config.ts'],
  rootDir: '../..',
  roots: ['<rootDir>/src', '<rootDir>/test/server'],
};
