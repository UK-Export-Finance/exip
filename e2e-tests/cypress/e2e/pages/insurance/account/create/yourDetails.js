// TODO: remove INSURANCE_FIELD_IDS as FIELD_IDS from other places
import { INSURANCE_FIELD_IDS } from '../../../../../../constants/field-ids/insurance';

const {
  ACCOUNT: {
    FIRST_NAME,
    LAST_NAME,
    EMAIL,
    PASSWORD,
  },
} = INSURANCE_FIELD_IDS;

const yourDetailsPage = {
  intro: () => cy.get('[data-cy="intro"]'),
  alreadyGotAnAccountHeading: () => cy.get('[data-cy="already-got-an-account"]'),
  signInButtonLink: () => cy.get('[data-cy="sign-in"]'),
  [FIRST_NAME]: {
    label: () => cy.get(`[data-cy="${FIRST_NAME}-label"]`),
    input: () => cy.get(`[data-cy="${FIRST_NAME}-input"]`),
    errorMessage: () => cy.get(`[data-cy="${FIRST_NAME}-error-message"]`),
  },
  [LAST_NAME]: {
    label: () => cy.get(`[data-cy="${LAST_NAME}-label"]`),
    input: () => cy.get(`[data-cy="${LAST_NAME}-input"]`),
    errorMessage: () => cy.get(`[data-cy="${LAST_NAME}-error-message"]`),
  },
  [EMAIL]: {
    label: () => cy.get(`[data-cy="${EMAIL}-label"]`),
    input: () => cy.get(`[data-cy="${EMAIL}-input"]`),
    errorMessage: () => cy.get(`[data-cy="${EMAIL}-error-message"]`),
  },
  [PASSWORD]: {
    label: () => cy.get(`[data-cy="${PASSWORD}-label"]`),
    input: () => cy.get(`[data-cy="${PASSWORD}-input"]`),
    errorMessage: () => cy.get(`[data-cy="${PASSWORD}-error-message"]`),
  },
};

export default yourDetailsPage;
