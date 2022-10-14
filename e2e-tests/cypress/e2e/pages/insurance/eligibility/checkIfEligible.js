const checkIfEligiblePage = {
  heading: () => cy.get('[data-cy="heading"]'),
  body: () => cy.get('[data-cy="body"]'),
  submitButton: () => cy.get('[data-cy="submit-button"]'),
};

export default checkIfEligiblePage;
