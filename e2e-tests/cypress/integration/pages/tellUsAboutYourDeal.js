import { FIELDS, FIELD_VALUES } from '../../../constants';

const tellUsAboutYourDealPage = {
  heading: () => cy.get('[data-cy="heading"]'),
  description: () => cy.get('[data-cy="description"]'),

  [FIELDS.CREDIT_LIMIT_GROUP]: {
    label: () => cy.get(`[data-cy="${FIELDS.CREDIT_LIMIT_GROUP}-label"]`),
    labelText: () => cy.get(`[data-cy="${FIELDS.CREDIT_LIMIT_GROUP}-label-text"]`),
    hint: () => cy.get(`[data-cy="${FIELDS.CREDIT_LIMIT_GROUP}-hint"]`),
    errorMessage: () => cy.get(`[data-cy="${FIELDS.CREDIT_LIMIT_GROUP}-error-message"]`),
  },
  [FIELDS.CREDIT_LIMIT_CURRENCY]: {
    label: () => cy.get(`[data-cy="${FIELDS.CREDIT_LIMIT_CURRENCY}-label"]`),
    input: () => cy.get(`[data-cy="${FIELDS.CREDIT_LIMIT_CURRENCY}-input"]`),
    inputOption: () => cy.get(`[data-cy="${FIELDS.CREDIT_LIMIT_CURRENCY}-input"] option`),
    errorMessage: () => cy.get(`[data-cy="${FIELDS.CREDIT_LIMIT_CURRENCY}-error-message"]`),
  },
  [FIELDS.CREDIT_LIMIT]: {
    label: () => cy.get(`[data-cy="${FIELDS.CREDIT_LIMIT}-label"]`),
    input: () => cy.get(`[data-cy="${FIELDS.CREDIT_LIMIT}-input"]`),
    errorMessage: () => cy.get(`[data-cy="${FIELDS.CREDIT_LIMIT}-error-message"]`),
  },
  [FIELDS.PRE_CREDIT_PERIOD]: {
    label: () => cy.get(`[data-cy="${FIELDS.PRE_CREDIT_PERIOD}-label"]`),
    labelText: () => cy.get(`[data-cy="${FIELDS.PRE_CREDIT_PERIOD}-label-text"]`),
    hint: () => cy.get(`[data-cy="${FIELDS.PRE_CREDIT_PERIOD}-hint"]`),
    input: () => cy.get(`[data-cy="${FIELDS.PRE_CREDIT_PERIOD}-input"]`),
    errorMessage: () => cy.get(`[data-cy="${FIELDS.PRE_CREDIT_PERIOD}-error-message"]`),
  },
  [FIELDS.CREDIT_PERIOD]: {
    label: () => cy.get(`[data-cy="${FIELDS.CREDIT_PERIOD}-label"]`),
    labelText: () => cy.get(`[data-cy="${FIELDS.CREDIT_PERIOD}-label-text"]`),
    hint: () => cy.get(`[data-cy="${FIELDS.CREDIT_PERIOD}-hint"]`),
    input: () => cy.get(`[data-cy="${FIELDS.CREDIT_PERIOD}-input"]`),
    errorMessage: () => cy.get(`[data-cy="${FIELDS.CREDIT_PERIOD}-error-message"]`),
  },
  [FIELDS.POLICY_LENGTH]: {
    label: () => cy.get(`[data-cy="${FIELDS.POLICY_LENGTH}-label"]`),
    labelText: () => cy.get(`[data-cy="${FIELDS.POLICY_LENGTH}-label-text"]`),
    hint: () => cy.get(`[data-cy="${FIELDS.POLICY_LENGTH}-hint"]`),
    input: () => cy.get(`[data-cy="${FIELDS.POLICY_LENGTH}-input"]`),
    errorMessage: () => cy.get(`[data-cy="${FIELDS.POLICY_LENGTH}-error-message"]`),
  },
  [FIELDS.POLICY_TYPE]: {
    label: () => cy.get(`[data-cy="${FIELDS.POLICY_TYPE}-label-text"]`),
    hint: () => cy.get(`[data-cy="${FIELDS.POLICY_TYPE}-hint"]`),
    single: {
      label: () => cy.get(`[data-cy="${FIELDS.POLICY_TYPE}-${FIELD_VALUES.POLICY_TYPE.SINGLE}-label"]`),
      hint: () => cy.get(`[data-cy="${FIELDS.POLICY_TYPE}-${FIELD_VALUES.POLICY_TYPE.SINGLE}-hint"]`),
      input: () => cy.get(`[data-cy="${FIELDS.POLICY_TYPE}-${FIELD_VALUES.POLICY_TYPE.SINGLE}-input"]`),
    },
    multi: {
      label: () => cy.get(`[data-cy="${FIELDS.POLICY_TYPE}-${FIELD_VALUES.POLICY_TYPE.MULTI}-label"]`),
      hint: () => cy.get(`[data-cy="${FIELDS.POLICY_TYPE}-${FIELD_VALUES.POLICY_TYPE.MULTI}-hint"]`),
      input: () => cy.get(`[data-cy="${FIELDS.POLICY_TYPE}-${FIELD_VALUES.POLICY_TYPE.MULTI}-input"]`),
    },
    errorMessage: () => cy.get(`[data-cy="${FIELDS.POLICY_TYPE}-error-message"]`),
  },
  submitButton: () => cy.get('[data-cy="submit-button"]'),
};

export default tellUsAboutYourDealPage;
