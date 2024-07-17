const yourDetailsPage = {
  alreadyGotAnAccountHeading: () => cy.get('[data-cy="already-got-an-account"]'),
  privacyNotice: {
    heading: () => cy.get('[data-cy="privacy-notice-heading"]'),
    text: () => cy.get('[data-cy="privacy-notice-text"]'),
    link: () => cy.get('[data-cy="privacy-notice-link"]'),
  },
};

export default yourDetailsPage;
