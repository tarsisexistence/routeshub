module.exports = {
  globals: {
    'ts-jest': {
      tsConfig: '<rootDir>/package/configs/tsconfig.spec.json'
    }
  },
  moduleNameMapper: {
    '^lib$': '<rootDir>/package/index',
    '^lib(.*)': '<rootDir>/package/src/$1'
  }
};
