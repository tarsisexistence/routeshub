module.exports = {
  globals: {
    'ts-jest': {
      tsConfig: '<rootDir>/configs/tsconfig.spec.json'
    }
  },
  moduleNameMapper: {
    '^lib$': '<rootDir>/index',
    '^lib(.*)': '<rootDir>/src/$1'
  },
  setupFilesAfterEnv: [`${__dirname}/jest/setup.ts`]
};
