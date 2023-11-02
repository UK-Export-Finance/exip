const noCompaniesHouseNumberPage = {
  body: () => cy.get('[data-cy="body"]'),
  actions: {
    contactEFM: () => cy.get('[data-cy="action-contact-efm"]'),
    contactEFMLink: () => cy.get('[data-cy="action-contact-efm-link"]'),
  },
};

export default noCompaniesHouseNumberPage;
