import { FIELD_IDS } from '../../../../../constants';

const {
  INSURANCE: {
    POLICY_AND_EXPORTS: {
      CONTRACT_POLICY: {
        REQUESTED_START_DATE,
        CREDIT_PERIOD_WITH_BUYER,
        POLICY_CURRENCY_CODE,
        SINGLE: {
          COMPLETION_OF_CONTRACT_DATE,
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
  [COMPLETION_OF_CONTRACT_DATE]: {
    label: () => cy.get(`[data-cy="${COMPLETION_OF_CONTRACT_DATE}-label"]`),
    hint: () => cy.get(`[data-cy="${COMPLETION_OF_CONTRACT_DATE}-hint"]`),
    dayInput: () => cy.get(`[data-cy="${COMPLETION_OF_CONTRACT_DATE}-day-input"]`),
    monthInput: () => cy.get(`[data-cy="${COMPLETION_OF_CONTRACT_DATE}-month-input"]`),
    yearInput: () => cy.get(`[data-cy="${COMPLETION_OF_CONTRACT_DATE}-year-input"]`),
  },
  [TOTAL_CONTRACT_VALUE]: {
    label: () => cy.get(`[data-cy="${TOTAL_CONTRACT_VALUE}-label"]`),
    hint: () => cy.get(`[data-cy="${TOTAL_CONTRACT_VALUE}-hint"]`),
    prefix: () => cy.get(`[data-cy="${TOTAL_CONTRACT_VALUE}-prefix"]`),
    input: () => cy.get(`[data-cy="${TOTAL_CONTRACT_VALUE}-input"]`),
    errorMessage: () => cy.get(`[data-cy="${TOTAL_CONTRACT_VALUE}-error-message"]`),
  },
  [CREDIT_PERIOD_WITH_BUYER]: {
    label: () => cy.get(`[data-cy="${CREDIT_PERIOD_WITH_BUYER}-label"]`),
    hint: () => cy.get(`[data-cy="${CREDIT_PERIOD_WITH_BUYER}-hint"]`),
    input: () => cy.get(`[data-cy="${CREDIT_PERIOD_WITH_BUYER}-input"]`),
  },
  [POLICY_CURRENCY_CODE]: {
    label: () => cy.get(`[data-cy="${POLICY_CURRENCY_CODE}-label"]`),
    input: () => cy.get(`[data-cy="${POLICY_CURRENCY_CODE}-input"]`),
    inputOption: () => cy.get(`[data-cy="${POLICY_CURRENCY_CODE}-input"]`).find('option'),
    inputFirstOption: () => cy.get(`[data-cy="${POLICY_CURRENCY_CODE}-input"]`).find('option').eq(0),
    inputOptionSelected: () => cy.get(`[data-cy="${POLICY_CURRENCY_CODE}-input"]`).find(':selected'),
  },
};

export default singleContractPolicy;
