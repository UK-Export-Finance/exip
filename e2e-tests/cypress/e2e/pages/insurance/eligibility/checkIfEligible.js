const checkIfEligiblePage = {
  heading: () => cy.get('[data-cy="heading"]'),
  submitButton: () => cy.get('[data-cy="submit-button"]'),
};

export default checkIfEligiblePage;
