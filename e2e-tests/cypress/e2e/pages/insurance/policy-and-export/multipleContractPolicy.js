import { FIELD_IDS } from '../../../../../constants';

const {
  INSURANCE: {
    POLICY_AND_EXPORTS: {
      CONTRACT_POLICY: {
        REQUESTED_START_DATE,
        CREDIT_PERIOD_WITH_BUYER,
        POLICY_CURRENCY_CODE,
        MULTIPLE: {
          TOTAL_MONTHS_OF_COVER,
          TOTAL_SALES_TO_BUYER,
          MAXIMUM_BUYER_WILL_OWE,
        },
      },
    },
  },
} = FIELD_IDS;

const multipleContractPolicy = {
  [REQUESTED_START_DATE]: {
    label: () => cy.get(`[data-cy="${REQUESTED_START_DATE}-label"]`),
    hint: () => cy.get(`[data-cy="${REQUESTED_START_DATE}-hint"]`),
    dayInput: () => cy.get(`[data-cy="${REQUESTED_START_DATE}-day-input"]`),
    monthInput: () => cy.get(`[data-cy="${REQUESTED_START_DATE}-month-input"]`),
    yearInput: () => cy.get(`[data-cy="${REQUESTED_START_DATE}-year-input"]`),
    errorMessage: () => cy.get(`[data-cy="${REQUESTED_START_DATE}-error-message"]`),
  },
  [TOTAL_MONTHS_OF_COVER]: {
    label: () => cy.get(`[data-cy="${TOTAL_MONTHS_OF_COVER}-label"]`),
    hint: () => cy.get(`[data-cy="${TOTAL_MONTHS_OF_COVER}-hint"]`),
    input: () => cy.get(`[data-cy="${TOTAL_MONTHS_OF_COVER}-input"]`),
    inputOption: () => cy.get(`[data-cy="${TOTAL_MONTHS_OF_COVER}-input"]`).find('option'),
    inputFirstOption: () => cy.get(`[data-cy="${TOTAL_MONTHS_OF_COVER}-input"]`).find('option').eq(0),
    inputOptionSelected: () => cy.get(`[data-cy="${TOTAL_MONTHS_OF_COVER}-input"]`).find(':selected'),
    errorMessage: () => cy.get(`[data-cy="${TOTAL_MONTHS_OF_COVER}-error-message"]`),
  },
  [TOTAL_SALES_TO_BUYER]: {
    label: () => cy.get(`[data-cy="${TOTAL_SALES_TO_BUYER}-label"]`),
    hint: () => cy.get(`[data-cy="${TOTAL_SALES_TO_BUYER}-hint"]`),
    prefix: () => cy.get(`[data-cy="${TOTAL_SALES_TO_BUYER}-prefix"]`),
    input: () => cy.get(`[data-cy="${TOTAL_SALES_TO_BUYER}-input"]`),
    errorMessage: () => cy.get(`[data-cy="${TOTAL_SALES_TO_BUYER}-error-message"]`),
  },
  [MAXIMUM_BUYER_WILL_OWE]: {
    label: () => cy.get(`[data-cy="${MAXIMUM_BUYER_WILL_OWE}-label"]`),
    hint: () => cy.get(`[data-cy="${MAXIMUM_BUYER_WILL_OWE}-hint"]`),
    prefix: () => cy.get(`[data-cy="${MAXIMUM_BUYER_WILL_OWE}-prefix"]`),
    input: () => cy.get(`[data-cy="${MAXIMUM_BUYER_WILL_OWE}-input"]`),
    errorMessage: () => cy.get(`[data-cy="${MAXIMUM_BUYER_WILL_OWE}-error-message"]`),
  },
  [CREDIT_PERIOD_WITH_BUYER]: {
    label: () => cy.get(`[data-cy="${CREDIT_PERIOD_WITH_BUYER}-label"]`),
    hint: () => cy.get(`[data-cy="${CREDIT_PERIOD_WITH_BUYER}-hint"]`),
    input: () => cy.get(`[data-cy="${CREDIT_PERIOD_WITH_BUYER}-input"]`),
    errorMessage: () => cy.get(`[data-cy="${CREDIT_PERIOD_WITH_BUYER}-error-message"]`),
  },
  [POLICY_CURRENCY_CODE]: {
    label: () => cy.get(`[data-cy="${POLICY_CURRENCY_CODE}-label"]`),
    input: () => cy.get(`[data-cy="${POLICY_CURRENCY_CODE}-input"]`),
    inputOption: () => cy.get(`[data-cy="${POLICY_CURRENCY_CODE}-input"]`).find('option'),
    inputFirstOption: () => cy.get(`[data-cy="${POLICY_CURRENCY_CODE}-input"]`).find('option').eq(0),
    inputOptionSelected: () => cy.get(`[data-cy="${POLICY_CURRENCY_CODE}-input"]`).find(':selected'),
  },
};

export default multipleContractPolicy;
