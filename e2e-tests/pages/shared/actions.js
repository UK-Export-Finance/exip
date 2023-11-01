const actions = {
  intro: () => cy.get('[data-cy="actions-intro"]'),
  eligibility: () => cy.get('[data-cy="action-eligibility"]'),
  eligibilityLink: () => cy.get('[data-cy="action-eligibility-link"]'),
  approvedBroker: () => cy.get('[data-cy="action-approved-broker"]'),
  approvedBrokerLink: () => cy.get('[data-cy="action-approved-broker-link"]'),
};

export default actions;
