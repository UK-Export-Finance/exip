const preCreditPeriodDescription = {
  summary: () => cy.get('[data-cy="pre-credit-period-description"] summary'),
  details: () => cy.get('[data-cy="pre-credit-period-description"]'),
  protectsYou: () => cy.get('[data-cy="pre-credit-period-description-protects-you"]'),
  insuresYou: () => cy.get('[data-cy="pre-credit-period-description-insures-you"]'),
  happensBefore: () => cy.get('[data-cy="pre-credit-period-description-happens-before"]'),
};

export default preCreditPeriodDescription;
