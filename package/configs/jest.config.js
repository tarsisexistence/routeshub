module.exports = {
  globals: {
    'ts-jest': {
      tsConfig: `${__dirname}/tsconfig.spec.json`
    }
  },
  moduleNameMapper: {
    '^lib$': `../${__dirname}/package/index`,
    '^lib(.*)': `../${__dirname}/package/src/$1`
  },
  setupFilesAfterEnv: [`${__dirname}/jest/setup.ts`]
};
