module.exports = {
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: [
    'constants/XLSX-CONFIG/**/*.{ts,}',
    'custom-resolvers/**/*.{ts,}',
    'emails/**/*.{ts,}',
    'generate-xlsx/**/*.{ts,}',
    'helpers/**/*.{ts,}',
    'integrations/**/*.{ts,}',
    'middleware/**/*.{ts,}',
    'server/generate-quote/*.{ts,}',
  ],
  testTimeout: 60000,
  workerIdleMemoryLimit: '512MB',
  coverageReporters: ['text', 'text-summary'],
  coverageDirectory: 'generated_reports/coverage/tests',
  coveragePathIgnorePatterns: ['/node_modules/'],
  testMatch: ['**/*.test.ts'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  testEnvironment: 'node',
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json',
    },
  },
};
