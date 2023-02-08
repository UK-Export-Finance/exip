import { INSURANCE_FIELD_IDS } from '../../../../../../constants/field-ids/insurance';

const {
  ACCOUNT: {
    FIRST_NAME,
    LAST_NAME,
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
  [PASSWORD]: {
    hint: {
      intro: () => cy.get(`[data-cy="${PASSWORD}-hint-intro"]`),
      listItem1: () => cy.get(`[data-cy="${PASSWORD}-hint-list-item-1"]`),
      listItem2: () => cy.get(`[data-cy="${PASSWORD}-hint-list-item-2"]`),
      listItem3: () => cy.get(`[data-cy="${PASSWORD}-hint-list-item-3"]`),
      listItem4: () => cy.get(`[data-cy="${PASSWORD}-hint-list-item-4"]`),
    },
  },
};

export default yourDetailsPage;
