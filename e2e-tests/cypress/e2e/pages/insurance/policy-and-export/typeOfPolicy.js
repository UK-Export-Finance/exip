import { FIELD_IDS } from '../../../../../constants';

const { INSURANCE } = FIELD_IDS;

const SINGLE_POLICY_TYPE_ID = INSURANCE.POLICY_AND_EXPORTS.SINGLE_POLICY_TYPE;
const MULTI_POLICY_TYPE_ID = INSURANCE.POLICY_AND_EXPORTS.MULTI_POLICY_TYPE;
const SINGLE_POLICY_LENGTH_ID = FIELD_IDS.SINGLE_POLICY_LENGTH;

const typeOfPolicy = {
  intro: () => cy.get('[data-cy="intro"]'),
  [INSURANCE.POLICY_AND_EXPORTS.POLICY_TYPE]: {
    single: {
      label: () => cy.get(`[data-cy="${SINGLE_POLICY_TYPE_ID}-label"]`),
      input: () => cy.get(`[data-cy="${SINGLE_POLICY_TYPE_ID}-input"]`),
      hintList: {
        item1: () => cy.get(`[data-cy="${SINGLE_POLICY_TYPE_ID}-hint-list-item-1"]`),
        item2: () => cy.get(`[data-cy="${SINGLE_POLICY_TYPE_ID}-hint-list-item-2"]`),
        item3: () => cy.get(`[data-cy="${SINGLE_POLICY_TYPE_ID}-hint-list-item-3"]`),
        item4: () => cy.get(`[data-cy="${SINGLE_POLICY_TYPE_ID}-hint-list-item-4"]`),
      },
    },
    multiple: {
      label: () => cy.get(`[data-cy="${MULTI_POLICY_TYPE_ID}-label"]`),
      input: () => cy.get(`[data-cy="${MULTI_POLICY_TYPE_ID}-input"]`),
      hintList: {
        item1: () => cy.get(`[data-cy="${MULTI_POLICY_TYPE_ID}-hint-list-item-1"]`),
        item2: () => cy.get(`[data-cy="${MULTI_POLICY_TYPE_ID}-hint-list-item-2"]`),
        item3: () => cy.get(`[data-cy="${MULTI_POLICY_TYPE_ID}-hint-list-item-3"]`),
      },
    },
    errorMessage: () => cy.get(`[data-cy="${FIELD_IDS.POLICY_TYPE}-error-message"]`),
  },
  [SINGLE_POLICY_LENGTH_ID]: {
    label: () => cy.get(`[data-cy="${SINGLE_POLICY_LENGTH_ID}-label"]`),
    hint: () => cy.get(`[data-cy="${SINGLE_POLICY_LENGTH_ID}-hint"]`),
    hintLink: () => cy.get(`[data-cy="${SINGLE_POLICY_LENGTH_ID}-hint"] a`),
    input: () => cy.get(`[data-cy="${SINGLE_POLICY_LENGTH_ID}-input"]`),
    errorMessage: () => cy.get(`[data-cy="${SINGLE_POLICY_LENGTH_ID}-error-message"]`),
  },
};

export default typeOfPolicy;
