const manageAccountPage = {
  intro: () => cy.get('[data-cy="intro"]'),
  customerServiceHeading: () => cy.get('[data-cy="customer-service-heading"]'),
};

export default manageAccountPage;
