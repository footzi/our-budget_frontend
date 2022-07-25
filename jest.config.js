module.exports = {
  rootDir: './src',
  preset: 'ts-jest',
  // testEnvironment: 'node',
  testMatch: ['**/?(*.)+(spec|test).[jt]s?(x)'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
  },
  transform: {
    '\\.[jt]sx?$': 'ts-jest',
  },
  // transformIgnorePatterns: ['<rootDir>/node_modules/'],
  verbose: true,
  // automock: true,
};
