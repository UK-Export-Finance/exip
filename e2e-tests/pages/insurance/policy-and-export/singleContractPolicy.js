import { INSURANCE_FIELD_IDS } from '../../../constants/field-ids/insurance';
import contractPolicy from './contractPolicy';

const {
  POLICY_AND_EXPORTS: {
    CONTRACT_POLICY: {
      SINGLE: {
        CONTRACT_COMPLETION_DATE,
        TOTAL_CONTRACT_VALUE,
      },
    },
  },
} = INSURANCE_FIELD_IDS;

const singleContractPolicy = {
  ...contractPolicy,
  [CONTRACT_COMPLETION_DATE]: {
    label: () => cy.get(`[data-cy="${CONTRACT_COMPLETION_DATE}-label"]`),
    hint: () => cy.get(`[data-cy="${CONTRACT_COMPLETION_DATE}-hint"]`),
    dayInput: () => cy.get(`[data-cy="${CONTRACT_COMPLETION_DATE}-day-input"]`),
    monthInput: () => cy.get(`[data-cy="${CONTRACT_COMPLETION_DATE}-month-input"]`),
    yearInput: () => cy.get(`[data-cy="${CONTRACT_COMPLETION_DATE}-year-input"]`),
    errorMessage: () => cy.get(`[data-cy="${CONTRACT_COMPLETION_DATE}-error-message"]`),
  },
  [TOTAL_CONTRACT_VALUE]: {
    label: () => cy.get(`[data-cy="${TOTAL_CONTRACT_VALUE}-label"]`),
    hint: {
      needMoreCover: () => cy.get(`[data-cy="${TOTAL_CONTRACT_VALUE}-hint-need-more-cover"]`),
      link: () => cy.get(`[data-cy="${TOTAL_CONTRACT_VALUE}-hint-link"]`),
      noDecimals: () => cy.get(`[data-cy="${TOTAL_CONTRACT_VALUE}-hint-no-decimals"]`),
    },
    prefix: () => cy.get(`[data-cy="${TOTAL_CONTRACT_VALUE}-prefix"]`),
    input: () => cy.get(`[data-cy="${TOTAL_CONTRACT_VALUE}-input"]`),
    errorMessage: () => cy.get(`[data-cy="${TOTAL_CONTRACT_VALUE}-error-message"]`),
  },
};

export default singleContractPolicy;
