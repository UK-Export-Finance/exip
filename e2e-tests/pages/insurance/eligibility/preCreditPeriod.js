const preCreditPeriodPage = {
  description: {
    summary: () => cy.get('[data-cy="pre-credit-period"] summary'),
    details: () => cy.get('[data-cy="pre-credit-period"]'),
    intro: () => cy.get('[data-cy="pre-credit-period-intro"]'),
    body1: () => cy.get('[data-cy="pre-credit-period-body-1"]'),
    list: {
      intro: () => cy.get('[data-cy="pre-credit-period-list-intro"]'),
      item1: () => cy.get('[data-cy="pre-credit-period-list-item-1"]'),
      item2: () => cy.get('[data-cy="pre-credit-period-list-item-2"]'),
    },
    body2: () => cy.get('[data-cy="pre-credit-period-body-2"]'),
    body3: () => cy.get('[data-cy="pre-credit-period-body-3"]'),
  },
};

export default preCreditPeriodPage;
