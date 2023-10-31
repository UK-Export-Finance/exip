import { FIELD_IDS } from '../../../constants/field-ids';
import { yesRadioInput, noRadioInput } from '../../shared';

const {
  YOUR_COMPANY: {
    TRADING_NAME,
    TRADING_ADDRESS,
    YOUR_BUSINESS,
  },
} = FIELD_IDS.INSURANCE.EXPORTER_BUSINESS;

const companyDetails = {
  yourBusinessHeading: () => cy.get(`[data-cy="${YOUR_BUSINESS}-heading`),
  [TRADING_NAME]: {
    label: () => cy.get(`[data-cy="${TRADING_NAME}-legend"]`),
    yesRadioInput: () => yesRadioInput().first(),
    noRadioInput: () => noRadioInput().first(),
    errorMessage: () => cy.get(`[data-cy="${TRADING_NAME}-error-message"]`),
  },
  [TRADING_ADDRESS]: {
    label: () => cy.get(`[data-cy="${TRADING_ADDRESS}-legend"]`),
    yesRadioInput: () => yesRadioInput().eq(1),
    noRadioInput: () => noRadioInput().eq(1),
    errorMessage: () => cy.get(`[data-cy="${TRADING_ADDRESS}-error-message"]`),
  },
};

export default companyDetails;
