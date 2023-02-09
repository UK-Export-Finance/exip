const yourDetailsPage = {
  resetPasswordLink: () => cy.get('[data-cy="reset-password"]'),
  needToCreateAccountHeading: () => cy.get('[data-cy="need-to-create-account"]'),
  createAccountLink: () => cy.get('[data-cy="create-account"]'),
};

export default yourDetailsPage;
