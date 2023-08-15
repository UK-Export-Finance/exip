const verifyEmailLinkExpiredPage = {
  body: () => cy.get('[data-cy="body"]'),
  createAccount: () => cy.get('[data-cy="create-account"]'),
};

export default verifyEmailLinkExpiredPage;
