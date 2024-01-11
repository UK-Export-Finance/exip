const creditPeriodWithBuyer = {
  summary: () => cy.get('[data-cy="credit-period-with-buyer-description"] summary'),
  details: () => cy.get('[data-cy="credit-period-with-buyer-description"]'),
  protectsYou: () => cy.get('[data-cy="credit-period-with-buyer-description-protects-you"]'),
  insuresYou: () => cy.get('[data-cy="credit-period-with-buyer-description-insures-you"]'),
  happensBefore: () => cy.get('[data-cy="credit-period-with-buyer-description-happens-before"]'),
};

export default creditPeriodWithBuyer;
