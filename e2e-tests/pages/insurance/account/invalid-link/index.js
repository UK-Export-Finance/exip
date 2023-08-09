const invalidLinkPage = {
  body: () => cy.get('[data-cy="body"]'),
  returnToSignInButton: () => cy.get('[data-cy="return-to-sign-in-link-button"]'),
};

export default invalidLinkPage;
