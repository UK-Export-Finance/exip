import { FIELD_IDS } from '../../../constants';

const {
  INSURANCE: {
    POLICY_AND_EXPORTS: {
      CONTRACT_POLICY: {
        REQUESTED_START_DATE,
        CREDIT_PERIOD_WITH_BUYER,
        SINGLE: {
          CONTRACT_COMPLETION_DATE,
          TOTAL_CONTRACT_VALUE,
        },
      },
    },
  },
} = FIELD_IDS;

const singleContractPolicy = {
  [REQUESTED_START_DATE]: {
    label: () => cy.get(`[data-cy="${REQUESTED_START_DATE}-label"]`),
    hint: () => cy.get(`[data-cy="${REQUESTED_START_DATE}-hint"]`),
    dayInput: () => cy.get(`[data-cy="${REQUESTED_START_DATE}-day-input"]`),
    monthInput: () => cy.get(`[data-cy="${REQUESTED_START_DATE}-month-input"]`),
    yearInput: () => cy.get(`[data-cy="${REQUESTED_START_DATE}-year-input"]`),
    errorMessage: () => cy.get(`[data-cy="${REQUESTED_START_DATE}-error-message"]`),
  },
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
  [CREDIT_PERIOD_WITH_BUYER]: {
    label: () => cy.get(`[data-cy="${CREDIT_PERIOD_WITH_BUYER}-label"]`),
    hint: () => cy.get(`[data-cy="${CREDIT_PERIOD_WITH_BUYER}-hint"]`),
    input: () => cy.get(`[data-cy="${CREDIT_PERIOD_WITH_BUYER}-input"]`),
    errorMessage: () => cy.get(`[data-cy="${CREDIT_PERIOD_WITH_BUYER}-error-message"]`),
  },
};

export default singleContractPolicy;
