const footer = {
  supportLinks: {
    heading: () => cy.get('[data-cy="support-links-heading"]'),
    accessibilityStatement: () => cy.get('[data-cy="accessibility-statement"]'),
    privacy: () => cy.get('[data-cy="privacy"]'),
    cookies: () => cy.get('[data-cy="cookies"]'),
    reportVulnerability: () => cy.get('[data-cy="report-vulnerability"]'),
    contact: () => cy.get('[data-cy="contact"]'),
    license: () => cy.get('[data-cy="license"]'),
    licenseLink: () => cy.get('[data-cy="license-link"]'),
    copyright: () => cy.get('[data-cy="copyright"]'),
  },
};

export default footer;
