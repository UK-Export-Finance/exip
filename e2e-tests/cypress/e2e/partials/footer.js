const footer = {
  heading: () => cy.get('[data-cy="footer-heading"]'),
  email: () => cy.get('[data-cy="email"]'),
  phone: () => cy.get('[data-cy="phone"]'),
  openingTimes: () => cy.get('[data-cy="opening-times"]'),
  supportLinks: {
    heading: () => cy.get('[data-cy="support-links-heading"]'),
    cookies: () => cy.get('[data-cy="cookies"]'),
    termsAndConditions: () => cy.get('[data-cy="terms-and-conditions"]'),
    reportVulnerability: () => cy.get('[data-cy="report-vulnerability"]'),
    license: () => cy.get('[data-cy="license"]'),
    licenseLink: () => cy.get('[data-cy="license-link"]'),
    copyright: () => cy.get('[data-cy="copyright"]'),
  },
};

export default footer;
