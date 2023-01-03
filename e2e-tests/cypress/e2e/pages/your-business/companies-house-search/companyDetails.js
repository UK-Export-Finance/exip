import { FIELD_IDS } from '../../../../../constants/field-ids';

const {
  YOUR_COMPANY: {
    TRADING_NAME,
    TRADING_ADDRESS,
    WEBSITE,
    PHONE_NUMBER,
    YOUR_BUSINESS,
  },
  COMPANY_HOUSE: {
    INDEX,
    INPUT,
  },
} = FIELD_IDS.INSURANCE.EXPORTER_BUSINESS;

const companyDetails = {
  companiesHouseSearch: () => cy.get(`[data-cy="${INPUT}-search`),
  companiesHouseSearchLabel: () => cy.get(`[data-cy="${INPUT}-search-label`),
  companiesHouseSearchHint: () => cy.get(`[data-cy="${INPUT}-search-hint`),
  companiesHouseSearchButton: () => cy.get(`[data-cy="${INPUT}-search-button`),
  companiesHouseSearchError: () => cy.get(`[data-cy="${INPUT}-search-error`),

  companiesHouseNoNumber: () => cy.get('[data-cy="do-not-have-number'),

  yourBusinessHeading: () => cy.get(`[data-cy="${YOUR_BUSINESS}-heading`),
  yourBusinessSummaryList: () => cy.get(`[data-cy="${INDEX}-summary-list`),

  tradingName: () => cy.get(`[data-cy="${TRADING_NAME}`),
  tradingNameLabel: () => cy.get(`[data-cy="${TRADING_NAME}-heading`),

  tradingAddress: () => cy.get(`[data-cy="${TRADING_ADDRESS}`),
  tradingAddressLabel: () => cy.get(`[data-cy="${TRADING_ADDRESS}-heading`),

  companyWebsiteLabel: () => cy.get(`[data-cy="${WEBSITE}-label`),
  companyWebsite: () => cy.get(`[data-cy="${WEBSITE}`),
  companyWebsiteError: () => cy.get(`[data-cy="${WEBSITE}-error`),

  phoneNumberLabel: () => cy.get(`[data-cy="${PHONE_NUMBER}-label`),
  phoneNumberHint: () => cy.get(`[data-cy="${PHONE_NUMBER}-hint`),
  phoneNumber: () => cy.get(`[data-cy="${PHONE_NUMBER}`),
};

export default companyDetails;
