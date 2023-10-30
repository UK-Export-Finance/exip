const noCompaniesHouseNumberPage = {
  body: () => cy.get('[data-cy="body"]'),
  actions: {
    updateCompanyDetails: () => cy.get('[data-cy="action-update-company-details"]'),
    updateCompanyDetailsLink: () => cy.get('[data-cy="action-update-company-details-link"]'),
    contactEFM: () => cy.get('[data-cy="action-contact-efm"]'),
    contactEFMLink: () => cy.get('[data-cy="action-contact-efm-link"]'),
  },
};

export default noCompaniesHouseNumberPage;
