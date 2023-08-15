const reactivatedPage = {
  thankYou: () => cy.get('[data-cy="thank-you"]'),
  continue: () => cy.get('[data-cy="continue"]'),
};

export default reactivatedPage;
