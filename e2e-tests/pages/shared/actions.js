const actions = {
  intro: () => cy.get('[data-cy="actions-intro"]'),
  eligibility: () => cy.get('[data-cy="action-eligibility"]'),
  eligibilityLink: () => cy.get('[data-cy="action-eligibility-link"]'),
  approvedBroker: () => cy.get('[data-cy="action-approved-broker"]'),
  approvedBrokerLink: () => cy.get('[data-cy="action-approved-broker-link"]'),
  updateCompanyDetails: () => cy.get('[data-cy="action-update-company-details"]'),
  updateCompanyDetailsLink: () => cy.get('[data-cy="action-update-company-details-link"]'),
  contactEFM: () => cy.get('[data-cy="action-contact-efm"]'),
  contactEFMLink: () => cy.get('[data-cy="action-contact-efm-link"]'),
};

export default actions;
