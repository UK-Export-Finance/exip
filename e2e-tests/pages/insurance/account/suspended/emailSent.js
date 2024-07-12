const emailSentPage = {
  weSentLinkTo: () => cy.get('[data-cy="we-sent-link-to"]'),
  checkYourEmail: () => cy.get('[data-cy="check-your-email"]'),
  emailPrefix: () => cy.get('[data-cy="email-prefix"]'),
  emailLink: () => cy.get('[data-cy="email-link"]'),
  emailOutro: () => cy.get('[data-cy="email-outro"]'),
};

export default emailSentPage;
