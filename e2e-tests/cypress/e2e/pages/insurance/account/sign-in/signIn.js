const signInPage = {
  successBanner: {
    container: () => cy.get('[data-cy="success-banner"]'),
    heading: () => cy.get('[data-cy="success-banner-heading"]'),
    continue: () => cy.get('[data-cy="success-banner-continue"]'),
  },
  resetPasswordLink: () => cy.get('[data-cy="reset-password"]'),
  needToCreateAccountHeading: () => cy.get('[data-cy="need-to-create-account"]'),
  createAccountLink: () => cy.get('[data-cy="create-account"]'),
};

export default signInPage;
