module.exports = {
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: [
    'custom-resolvers/**/*.{ts,}',
    'emails/**/*.{ts,}',
    'generate-xlsx/**/*.{ts,}',
    'integrations/**/*.{ts,}',
    'middleware/**/*.{ts,}',
    'server/generate-quote/*.{ts,}',
  ],
  testTimeout: 60000,
};
