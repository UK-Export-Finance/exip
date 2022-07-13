import {
  FIELD_IDS,
  FIELD_VALUES,
} from '../../../constants';

const policyTypePage = {
  heading: () => cy.get('[data-cy="heading"]'),
  [FIELD_IDS.POLICY_TYPE]: {
    single: {
      label: () => cy.get(`[data-cy="${FIELD_IDS.POLICY_TYPE}-${FIELD_VALUES.POLICY_TYPE.SINGLE}-label"]`),
      hint: () => cy.get(`[data-cy="${FIELD_IDS.POLICY_TYPE}-${FIELD_VALUES.POLICY_TYPE.SINGLE}-hint"]`),
      input: () => cy.get(`[data-cy="${FIELD_IDS.POLICY_TYPE}-${FIELD_VALUES.POLICY_TYPE.SINGLE}-input"]`),
    },
    multi: {
      label: () => cy.get(`[data-cy="${FIELD_IDS.POLICY_TYPE}-${FIELD_VALUES.POLICY_TYPE.MULTI}-label"]`),
      hint: () => cy.get(`[data-cy="${FIELD_IDS.POLICY_TYPE}-${FIELD_VALUES.POLICY_TYPE.MULTI}-hint"]`),
      input: () => cy.get(`[data-cy="${FIELD_IDS.POLICY_TYPE}-${FIELD_VALUES.POLICY_TYPE.MULTI}-input"]`),
    },
    errorMessage: () => cy.get(`[data-cy="${FIELD_IDS.POLICY_TYPE}-error-message"]`),
  },
  [FIELD_IDS.SINGLE_POLICY_LENGTH]: {
    label: () => cy.get(`[data-cy="${FIELD_IDS.SINGLE_POLICY_LENGTH}-label"]`),
    hint: () => cy.get(`[data-cy="${FIELD_IDS.SINGLE_POLICY_LENGTH}-hint"]`),
    input: () => cy.get(`[data-cy="${FIELD_IDS.SINGLE_POLICY_LENGTH}-input"]`),
    errorMessage: () => cy.get(`[data-cy="${FIELD_IDS.SINGLE_POLICY_LENGTH}-error-message"]`),
  },
  [FIELD_IDS.MULTI_POLICY_LENGTH]: {
    label: () => cy.get(`[data-cy="${FIELD_IDS.MULTI_POLICY_LENGTH}-label"]`),
    hint: () => cy.get(`[data-cy="${FIELD_IDS.MULTI_POLICY_LENGTH}-hint"]`),
    input: () => cy.get(`[data-cy="${FIELD_IDS.MULTI_POLICY_LENGTH}-input"]`),
    errorMessage: () => cy.get(`[data-cy="${FIELD_IDS.MULTI_POLICY_LENGTH}-error-message"]`),
  },
  submitButton: () => cy.get('[data-cy="submit-button"]'),
};

export default policyTypePage;
