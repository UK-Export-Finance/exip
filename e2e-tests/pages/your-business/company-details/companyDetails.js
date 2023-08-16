import { FIELD_IDS } from '../../../constants/field-ids';
import { yesRadioInput, noRadioInput } from '../../shared';

const {
  YOUR_COMPANY: {
    TRADING_NAME,
    TRADING_ADDRESS,
    WEBSITE,
    PHONE_NUMBER,
    YOUR_BUSINESS,
  },
  COMPANY_HOUSE: {
    SEARCH,
  },
} = FIELD_IDS.INSURANCE.EXPORTER_BUSINESS;

const companyDetails = {
  differentCompaniesHouseNumber: () => cy.get('[data-cy="different-companies-house-number"]'),

  yourBusinessHeading: () => cy.get(`[data-cy="${YOUR_BUSINESS}-heading`),
  yourBusinessSummaryList: () => cy.get(`[data-cy="${SEARCH}-summary-list`),

  [TRADING_NAME]: {
    label: () => cy.get(`[data-cy="${TRADING_NAME}-legend"]`),
    yesRadioInput: () => yesRadioInput().first(),
    noRadioInput: () => noRadioInput().first(),
    errorMessage: () => cy.get('[data-cy="inline-error-message"]').first(),
  },
  [TRADING_ADDRESS]: {
    label: () => cy.get(`[data-cy="${TRADING_ADDRESS}-legend"]`),
    yesRadioInput: () => yesRadioInput().eq(1),
    noRadioInput: () => noRadioInput().eq(1),
    errorMessage: () => cy.get('[data-cy="inline-error-message"]').eq(1),
  },
  [WEBSITE]: {
    label: () => cy.get(`[data-cy="${WEBSITE}-label"]`),
    input: () => cy.get(`[data-cy="${WEBSITE}"]`),
    errorMessage: () => cy.get(`[data-cy="${WEBSITE}-error"]`),
  },
  [PHONE_NUMBER]: {
    label: () => cy.get(`[data-cy="${PHONE_NUMBER}-label"]`),
    input: () => cy.get(`[data-cy="${PHONE_NUMBER}"]`),
    hint: () => cy.get(`[data-cy="${PHONE_NUMBER}-hint"]`),
    errorMessage: () => cy.get(`[data-cy="${PHONE_NUMBER}-error"]`),
  },
};

export default companyDetails;
