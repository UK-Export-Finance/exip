module.exports = {
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: [
    'custom-resolvers/**/*.{ts,}',
    'emails/**/*.{ts,}',
    'generate-xlsx/**/*.{ts,}',
    'helpers/**/*.{ts,}',
    'integrations/**/*.{ts,}',
    'middleware/**/*.{ts,}',
    'server/generate-quote/*.{ts,}',
  ],
  testTimeout: 60000,
  workerIdleMemoryLimit: '512MB'
};
