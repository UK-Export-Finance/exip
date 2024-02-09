import { FIELD_IDS } from '../../../constants/field-ids';
import { yesRadioInput, noRadioInput } from '../../shared';

const {
  YOUR_COMPANY: {
    HAS_DIFFERENT_TRADING_NAME,
    TRADING_ADDRESS,
    YOUR_BUSINESS,
  },
} = FIELD_IDS.INSURANCE.EXPORTER_BUSINESS;

const companyDetails = {
  differentCompaniesHouseNumber: () => cy.get('[data-cy="different-companies-house-number"]'),
  yourBusinessHeading: () => cy.get(`[data-cy="${YOUR_BUSINESS}-heading`),
  [HAS_DIFFERENT_TRADING_NAME]: {
    label: () => cy.get(`[data-cy="${HAS_DIFFERENT_TRADING_NAME}-legend"]`),
    noRadioInput: () => noRadioInput().first(),
    yesRadioInput: () => yesRadioInput().first(),
    errorMessage: () => cy.get(`[data-cy="${HAS_DIFFERENT_TRADING_NAME}-error-message"]`),
  },
  [TRADING_ADDRESS]: {
    label: () => cy.get(`[data-cy="${TRADING_ADDRESS}-legend"]`),
    noRadioInput: () => noRadioInput().eq(1),
    yesRadioInput: () => yesRadioInput().eq(1),
    errorMessage: () => cy.get(`[data-cy="${TRADING_ADDRESS}-error-message"]`),
  },
};

export default companyDetails;
