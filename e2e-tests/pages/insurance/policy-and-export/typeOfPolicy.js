import { INSURANCE_FIELD_IDS } from '../../../constants/field-ids/insurance';

const {
  POLICY_AND_EXPORTS: {
    SINGLE_POLICY_TYPE,
    MULTIPLE_POLICY_TYPE,
    TYPE_OF_POLICY: { POLICY_TYPE },
  },
} = INSURANCE_FIELD_IDS;

const typeOfPolicy = {
  intro: () => cy.get('[data-cy="intro"]'),
  [POLICY_TYPE]: {
    single: {
      label: () => cy.get(`[data-cy="${SINGLE_POLICY_TYPE}-label"]`),
      input: () => cy.get(`[data-cy="${SINGLE_POLICY_TYPE}-input"]`),
      hintList: {
        item1: () => cy.get(`[data-cy="${SINGLE_POLICY_TYPE}-hint-list-item-1"]`),
        item2: () => cy.get(`[data-cy="${SINGLE_POLICY_TYPE}-hint-list-item-2"]`),
        item3: () => cy.get(`[data-cy="${SINGLE_POLICY_TYPE}-hint-list-item-3"]`),
        item4: () => cy.get(`[data-cy="${SINGLE_POLICY_TYPE}-hint-list-item-4"]`),
      },
      errorMessage: () => cy.get(`[data-cy="${POLICY_TYPE}-error-message"]`),
    },
    multiple: {
      label: () => cy.get(`[data-cy="${MULTIPLE_POLICY_TYPE}-label"]`),
      input: () => cy.get(`[data-cy="${MULTIPLE_POLICY_TYPE}-input"]`),
      hintList: {
        item1: () => cy.get(`[data-cy="${MULTIPLE_POLICY_TYPE}-hint-list-item-1"]`),
        item2: () => cy.get(`[data-cy="${MULTIPLE_POLICY_TYPE}-hint-list-item-2"]`),
        item3: () => cy.get(`[data-cy="${MULTIPLE_POLICY_TYPE}-hint-list-item-3"]`),
      },
      errorMessage: () => cy.get(`[data-cy="${POLICY_TYPE}-error-message"]`),
    },
  },
};

export default typeOfPolicy;
