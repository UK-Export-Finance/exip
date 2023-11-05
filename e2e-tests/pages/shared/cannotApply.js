const cannotApply = {
  reason: () => cy.get('[data-cy="reason"]'),
  actions: {
    intro: () => cy.get('[data-cy="actions-intro"]'),
    listItems: () => cy.get('[data-cy="actions-list"] li'),
    eligibility: () => cy.get('[data-cy="action-eligibility"]'),
    eligibilityLink: () => cy.get('[data-cy="action-eligibility-link"]'),
    approvedBroker: () => cy.get('[data-cy="action-approved-broker"]'),
    approvedBrokerLink: () => cy.get('[data-cy="action-approved-broker-link"]'),
  },
};

export default cannotApply;
