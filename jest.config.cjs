// Конфигурация Jest для unit-тестов React-компонентов и функций
module.exports = {
  testEnvironment: 'jsdom',
  roots: ['<rootDir>/src'],
  testMatch: ['**/*.test.{js,jsx}'],
  transform: { '^.+\\.[jt]sx?$': 'babel-jest' },
  moduleNameMapper: {
    '\\.(css|less|scss)$': 'identity-obj-proxy',
    '\\.(svg|png|jpg|jpeg|gif|webp)$': '<rootDir>/test/fileMock.cjs',
  },
  setupFilesAfterEnv: ['<rootDir>/test/setupTests.js'],
};
