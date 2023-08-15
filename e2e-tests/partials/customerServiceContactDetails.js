const customerServiceContactDetails = {
  heading: () => cy.get('[data-cy="customer-service-heading"]'),
  telephone: () => cy.get('[data-cy="customer-service-telephone"]'),
  email: () => cy.get('[data-cy="customer-service-email"]'),
  openingHours: () => cy.get('[data-cy="customer-service-opening-hours"]'),
  callChargesLink: () => cy.get('[data-cy="customer-service-call-charges"]'),
};

export default customerServiceContactDetails;
