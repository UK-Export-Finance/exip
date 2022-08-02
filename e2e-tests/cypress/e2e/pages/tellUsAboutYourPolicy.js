import { FIELD_IDS } from '../../../constants';

const tellUsAboutYourPolicyPage = {
  heading: () => cy.get('[data-cy="heading"]'),
  description: () => cy.get('[data-cy="description"]'),
  [FIELD_IDS.AMOUNT_CURRENCY]: {
    legend: () => cy.get(`[data-cy="${FIELD_IDS.AMOUNT_CURRENCY}-legend"]`),
  },
  [FIELD_IDS.CURRENCY]: {
    label: () => cy.get(`[data-cy="${FIELD_IDS.CURRENCY}-label"]`),
    input: () => cy.get(`[data-cy="${FIELD_IDS.CURRENCY}-input"]`),
    inputOptionSelected: () => cy.get(`[data-cy="${FIELD_IDS.CURRENCY}-input"]`).find(':selected'),
    errorMessage: () => cy.get(`[data-cy="${FIELD_IDS.CURRENCY}-error-message"]`),
  },
  [FIELD_IDS.CONTRACT_VALUE]: {
    label: () => cy.get(`[data-cy="${FIELD_IDS.CONTRACT_VALUE}-label"]`),
    input: () => cy.get(`[data-cy="${FIELD_IDS.CONTRACT_VALUE}-input"]`),
    inputOption: () => cy.get(`[data-cy="${FIELD_IDS.CONTRACT_VALUE}-input"] option`),
    errorMessage: () => cy.get(`[data-cy="${FIELD_IDS.CONTRACT_VALUE}-error-message"]`),
  },
  [FIELD_IDS.MAX_AMOUNT_OWED]: {
    label: () => cy.get(`[data-cy="${FIELD_IDS.MAX_AMOUNT_OWED}-label"]`),
    input: () => cy.get(`[data-cy="${FIELD_IDS.MAX_AMOUNT_OWED}-input"]`),
    inputOption: () => cy.get(`[data-cy="${FIELD_IDS.MAX_AMOUNT_OWED}-input"] option`),
    errorMessage: () => cy.get(`[data-cy="${FIELD_IDS.MAX_AMOUNT_OWED}-error-message"]`),
  },
  [FIELD_IDS.PERCENTAGE_OF_COVER]: {
    label: () => cy.get(`[data-cy="${FIELD_IDS.PERCENTAGE_OF_COVER}-label"]`),
    hint: () => cy.get(`[data-cy="${FIELD_IDS.PERCENTAGE_OF_COVER}-hint"]`),
    input: () => cy.get(`[data-cy="${FIELD_IDS.PERCENTAGE_OF_COVER}-input"]`),
    inputOption: () => cy.get(`[data-cy="${FIELD_IDS.PERCENTAGE_OF_COVER}-input"] option`),
    errorMessage: () => cy.get(`[data-cy="${FIELD_IDS.PERCENTAGE_OF_COVER}-error-message"]`),
  },
  [FIELD_IDS.CREDIT_PERIOD]: {
    label: () => cy.get(`[data-cy="${FIELD_IDS.CREDIT_PERIOD}-label"]`),
    labelText: () => cy.get(`[data-cy="${FIELD_IDS.CREDIT_PERIOD}-label"]`),
    hint: () => cy.get(`[data-cy="${FIELD_IDS.CREDIT_PERIOD}-hint"]`),
    input: () => cy.get(`[data-cy="${FIELD_IDS.CREDIT_PERIOD}-input"]`),
    errorMessage: () => cy.get(`[data-cy="${FIELD_IDS.CREDIT_PERIOD}-error-message"]`),
  },
  submitButton: () => cy.get('[data-cy="submit-button"]'),
};

export default tellUsAboutYourPolicyPage;
