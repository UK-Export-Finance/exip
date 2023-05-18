import { INSURANCE_FIELD_IDS } from '../../../../../../constants/field-ids/insurance';

const {
  ACCOUNT: {
    FIRST_NAME,
    LAST_NAME,
  },
} = INSURANCE_FIELD_IDS;

const yourDetailsPage = {
  intro: () => cy.get('[data-cy="intro"]'),
  alreadyGotAnAccountHeading: () => cy.get('[data-cy="already-got-an-account"]'),
  signInButtonLink: () => cy.get('[data-cy="sign-in"]'),
  privacyNotice: {
    heading: () => cy.get('[data-cy="privacy-notice-heading"]'),
    text: () => cy.get('[data-cy="privacy-notice-text"]'),
    link: () => cy.get('[data-cy="privacy-notice-link"]'),
  },
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
};

export default yourDetailsPage;
