import {
  FIELD_IDS,
  FIELD_VALUES,
} from '../../../../../constants';

const { INSURANCE } = FIELD_IDS;

const typeOfPolicy = {
  intro: () => cy.get(`[data-cy="intro"]`),
  [INSURANCE.POLICY_AND_EXPORTS.POLICY_TYPE]: {
    single: {
      label: () => cy.get(`[data-cy="${INSURANCE.POLICY_AND_EXPORTS.SINGLE_POLICY_TYPE}-label"]`),
      input: () => cy.get(`[data-cy="${INSURANCE.POLICY_AND_EXPORTS.SINGLE_POLICY_TYPE}-input"]`),
      hintList: {
        item1: () => cy.get(`[data-cy="${INSURANCE.POLICY_AND_EXPORTS.SINGLE_POLICY_TYPE}-hint-list-item-1"]`),
        item2: () => cy.get(`[data-cy="${INSURANCE.POLICY_AND_EXPORTS.SINGLE_POLICY_TYPE}-hint-list-item-2"]`),
        item3: () => cy.get(`[data-cy="${INSURANCE.POLICY_AND_EXPORTS.SINGLE_POLICY_TYPE}-hint-list-item-3"]`),
        item4: () => cy.get(`[data-cy="${INSURANCE.POLICY_AND_EXPORTS.SINGLE_POLICY_TYPE}-hint-list-item-4"]`),
      },
    },
    multi: {
      label: () => cy.get(`[data-cy="${INSURANCE.POLICY_AND_EXPORTS.MULTI_POLICY_TYPE}-label"]`),
      input: () => cy.get(`[data-cy="${INSURANCE.POLICY_AND_EXPORTS.MULTI_POLICY_TYPE}-input"]`),
      hintList: {
        item1: () => cy.get(`[data-cy="${INSURANCE.POLICY_AND_EXPORTS.MULTI_POLICY_TYPE}-hint-list-item-1"]`),
        item2: () => cy.get(`[data-cy="${INSURANCE.POLICY_AND_EXPORTS.MULTI_POLICY_TYPE}-hint-list-item-2"]`),
        item3: () => cy.get(`[data-cy="${INSURANCE.POLICY_AND_EXPORTS.MULTI_POLICY_TYPE}-hint-list-item-3"]`),
      },
    },
    errorMessage: () => cy.get(`[data-cy="${FIELD_IDS.POLICY_TYPE}-error-message"]`),
  },
  [FIELD_IDS.SINGLE_POLICY_LENGTH]: {
    label: () => cy.get(`[data-cy="${FIELD_IDS.SINGLE_POLICY_LENGTH}-label"]`),
    hint: () => cy.get(`[data-cy="${FIELD_IDS.SINGLE_POLICY_LENGTH}-hint"]`),
    hintLink: () => cy.get(`[data-cy="${FIELD_IDS.SINGLE_POLICY_LENGTH}-hint"] a`),
    input: () => cy.get(`[data-cy="${FIELD_IDS.SINGLE_POLICY_LENGTH}-input"]`),
    errorMessage: () => cy.get(`[data-cy="${FIELD_IDS.SINGLE_POLICY_LENGTH}-error-message"]`),
  },
};

export default typeOfPolicy;
