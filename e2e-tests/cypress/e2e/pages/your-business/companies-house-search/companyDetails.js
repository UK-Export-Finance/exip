const companyDetails = {
  companiesHouseSearch: () => cy.get('[data-cy="companies-house-search'),
  companiesHouseSearchLabel: () => cy.get('[data-cy="companies-house-search-label'),
  companiesHouseSearchHint: () => cy.get('[data-cy="companies-house-search-hint'),
  companiesHouseSearchButton: () => cy.get('[data-cy="companies-house-search-button'),
  companiesHouseSearchError: () => cy.get('[data-cy="companies-house-search-error'),

  companiesHouseNoNumber: () => cy.get('[data-cy="do-not-have-number'),

  yourBusinessHeading: () => cy.get('[data-cy="your-business-heading'),
  yourBusinessSummaryList: () => cy.get('[data-cy="companies-house-summary-list'),

  tradingName: () => cy.get('[data-cy="trading-name'),
  tradingNameYesRadio: () => cy.get('[data-cy="trading-name-yes'),
  tradingNameNoRadio: () => cy.get('[data-cy="trading-name-no'),

  tradingAddress: () => cy.get('[data-cy="trading-address'),
  tradingAddressYesRadio: () => cy.get('[data-cy="trading-address-yes'),
  tradingAddressNoRadio: () => cy.get('[data-cy="trading-address-no'),

  companyWebsiteHeading: () => cy.get('[data-cy="company-website-heading'),
  companyWebsite: () => cy.get('[data-cy="company-website'),
};

export default companyDetails;
