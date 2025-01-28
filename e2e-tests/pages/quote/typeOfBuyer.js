const typeOfBuyerPage = {
  description: {
    summary: () => cy.get('[data-cy="type-of-buyer"] summary'),
    details: () => cy.get('[data-cy="type-of-buyer"]'),
    body1: () => cy.get('[data-cy="details-body-1"]'),
    body2: () => cy.get('[data-cy="details-body-2"]'),
  },
};

export default typeOfBuyerPage;
