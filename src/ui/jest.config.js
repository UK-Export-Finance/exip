// module.exports = {
//   collectCoverageFrom: [
//     'server/controllers/**/*.{js,}',
//     'server/routes/**/*.{js,}',
//     'server/helpers/*.{js,}',
//     'server/generate-quote/*.{js,}',
//   ],
//   coverageDirectory: 'generated_reports/coverage/unit',
//   testMatch: ['**/*.test.js', '**/*.component-test.js'],
//   moduleNameMapper: {
//     '^.+\\.(css|less|scss)$': 'babel-jest',
//   },
// };

module.exports = {
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: ['server/controllers/**/*.{ts,}', 'server/routes/**/*.{ts,}', 'server/helpers/*.{ts,}', 'server/generate-quote/*.{ts,}'],
  coverageDirectory: 'generated_reports/coverage/tests',
  coveragePathIgnorePatterns: ['/node_modules/'],
  testMatch: ['**/*.test.ts'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  preset: 'ts-jest',
  testEnvironment: 'node',
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json',
    },
  },
};
