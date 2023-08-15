import { FIELD_IDS } from '../../constants';

const {
  ELIGIBILITY: {
    AMOUNT_CURRENCY,
    CURRENCY,
    CONTRACT_VALUE,
    MAX_AMOUNT_OWED,
    PERCENTAGE_OF_COVER,
    CREDIT_PERIOD,
  },
} = FIELD_IDS;

const tellUsAboutYourPolicyPage = {
  description: () => cy.get('[data-cy="description"]'),
  [AMOUNT_CURRENCY]: {
    legend: () => cy.get(`[data-cy="${AMOUNT_CURRENCY}-legend"]`),
  },
  [CURRENCY]: {
    label: () => cy.get(`[data-cy="${CURRENCY}-label"]`),
    input: () => cy.get(`[data-cy="${CURRENCY}-input"]`),
    inputOptionSelected: () => cy.get(`[data-cy="${CURRENCY}-input"]`).find(':selected'),
    errorMessage: () => cy.get(`[data-cy="${CURRENCY}-error-message"]`),
  },
  [CONTRACT_VALUE]: {
    label: () => cy.get(`[data-cy="${CONTRACT_VALUE}-label"]`),
    input: () => cy.get(`[data-cy="${CONTRACT_VALUE}-input"]`),
    inputOption: () => cy.get(`[data-cy="${CONTRACT_VALUE}-input"] option`),
    errorMessage: () => cy.get(`[data-cy="${CONTRACT_VALUE}-error-message"]`),
  },
  [MAX_AMOUNT_OWED]: {
    label: () => cy.get(`[data-cy="${MAX_AMOUNT_OWED}-label"]`),
    input: () => cy.get(`[data-cy="${MAX_AMOUNT_OWED}-input"]`),
    inputOption: () => cy.get(`[data-cy="${MAX_AMOUNT_OWED}-input"] option`),
    errorMessage: () => cy.get(`[data-cy="${MAX_AMOUNT_OWED}-error-message"]`),
  },
  [PERCENTAGE_OF_COVER]: {
    label: () => cy.get(`[data-cy="${PERCENTAGE_OF_COVER}-label"]`),
    hint: () => cy.get(`[data-cy="${PERCENTAGE_OF_COVER}-hint"]`),
    input: () => cy.get(`[data-cy="${PERCENTAGE_OF_COVER}-input"]`),
    inputOption: () => cy.get(`[data-cy="${PERCENTAGE_OF_COVER}-input"] option`),
    errorMessage: () => cy.get(`[data-cy="${PERCENTAGE_OF_COVER}-error-message"]`),
  },
  [CREDIT_PERIOD]: {
    label: () => cy.get(`[data-cy="${CREDIT_PERIOD}-label"]`),
    labelText: () => cy.get(`[data-cy="${CREDIT_PERIOD}-label"]`),
    hint: () => cy.get(`[data-cy="${CREDIT_PERIOD}-hint"]`),
    hintLink: () => cy.get(`[data-cy="${CREDIT_PERIOD}-hint-link"]`),
    input: () => cy.get(`[data-cy="${CREDIT_PERIOD}-input"]`),
    inputOption: () => cy.get(`[data-cy="${CREDIT_PERIOD}-input"] option`),
    errorMessage: () => cy.get(`[data-cy="${CREDIT_PERIOD}-error-message"]`),
  },
};

export default tellUsAboutYourPolicyPage;
