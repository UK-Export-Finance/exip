const buyerBodyPage = {
  description: {
    summary: () => cy.get('[data-cy="buyer-body"] summary'),
    details: () => cy.get('[data-cy="buyer-body"]'),
    body1: () => cy.get('[data-cy="details-body-1"]'),
    body2: () => cy.get('[data-cy="details-body-2"]'),
  },
};

export default buyerBodyPage;
