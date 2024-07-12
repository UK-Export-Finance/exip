const emailSentPage = {
  weSentLinkTo: () => cy.get('[data-cy="we-sent-link-to"]'),
  checkYourEmail: () => cy.get('[data-cy="check-your-email"]'),
  emailOutro: () => cy.get('[data-cy="email-outro"]'),
};

export default emailSentPage;
