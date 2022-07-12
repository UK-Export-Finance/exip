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
  [FIELD_IDS.AMOUNT]: {
    label: () => cy.get(`[data-cy="${FIELD_IDS.AMOUNT}-label"]`),
    input: () => cy.get(`[data-cy="${FIELD_IDS.AMOUNT}-input"]`),
    inputOption: () => cy.get(`[data-cy="${FIELD_IDS.AMOUNT}-input"] option`),
    errorMessage: () => cy.get(`[data-cy="${FIELD_IDS.AMOUNT}-error-message"]`),
  },
  [FIELD_IDS.CREDIT_PERIOD]: {
    label: () => cy.get(`[data-cy="${FIELD_IDS.CREDIT_PERIOD}-label"]`),
    labelText: () => cy.get(`[data-cy="${FIELD_IDS.CREDIT_PERIOD}-label"]`),
    hint: () => cy.get(`[data-cy="${FIELD_IDS.CREDIT_PERIOD}-hint"]`).first(),
    input: () => cy.get(`[data-cy="${FIELD_IDS.CREDIT_PERIOD}-input"]`),
    errorMessage: () => cy.get(`[data-cy="${FIELD_IDS.CREDIT_PERIOD}-error-message"]`),
  },
  submitButton: () => cy.get('[data-cy="submit-button"]'),
};

export default tellUsAboutYourPolicyPage;
