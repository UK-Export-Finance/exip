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
  tradingNameHeading: () => cy.get('[data-cy="trading-name-heading'),

  tradingAddress: () => cy.get('[data-cy="trading-address'),
  tradingAddressHeading: () => cy.get('[data-cy="trading-address-heading'),

  companyWebsiteHeading: () => cy.get('[data-cy="company-website-heading'),
  companyWebsite: () => cy.get('[data-cy="company-website'),

  phoneNumberHeading: () => cy.get('[data-cy="company-phone-heading'),
  phoneNumberHint: () => cy.get('[data-cy="company-phone-hint'),
  phoneNumber: () => cy.get('[data-cy="company-phone'),
};

export default companyDetails;
