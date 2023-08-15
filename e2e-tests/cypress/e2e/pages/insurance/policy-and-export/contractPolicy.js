import { INSURANCE_FIELD_IDS } from '../../../../../constants/field-ids/insurance';

const {
  POLICY_AND_EXPORTS: {
    CONTRACT_POLICY: {
      CREDIT_PERIOD_WITH_BUYER,
      REQUESTED_START_DATE,
    },
  },
} = INSURANCE_FIELD_IDS;

const contractPolicy = {
  [CREDIT_PERIOD_WITH_BUYER]: {
    label: () => cy.get(`[data-cy="${CREDIT_PERIOD_WITH_BUYER}-label"]`),
    hint: () => cy.get(`[data-cy="${CREDIT_PERIOD_WITH_BUYER}-hint"]`),
    input: () => cy.get(`[data-cy="${CREDIT_PERIOD_WITH_BUYER}-input"]`),
    errorMessage: () => cy.get(`[data-cy="${CREDIT_PERIOD_WITH_BUYER}-error-message"]`),
  },
  [REQUESTED_START_DATE]: {
    label: () => cy.get(`[data-cy="${REQUESTED_START_DATE}-label"]`),
    hint: () => cy.get(`[data-cy="${REQUESTED_START_DATE}-hint"]`),
    dayInput: () => cy.get(`[data-cy="${REQUESTED_START_DATE}-day-input"]`),
    monthInput: () => cy.get(`[data-cy="${REQUESTED_START_DATE}-month-input"]`),
    yearInput: () => cy.get(`[data-cy="${REQUESTED_START_DATE}-year-input"]`),
    errorMessage: () => cy.get(`[data-cy="${REQUESTED_START_DATE}-error-message"]`),
  },
};

export default contractPolicy;
