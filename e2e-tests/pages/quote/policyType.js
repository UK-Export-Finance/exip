import { FIELD_IDS } from '../../constants';

const {
  POLICY_TYPE,
  SINGLE_POLICY_TYPE,
  MULTIPLE_POLICY_TYPE,
  SINGLE_POLICY_LENGTH,
} = FIELD_IDS;

const policyTypePage = {
  [POLICY_TYPE]: {
    single: {
      label: () => cy.get(`[data-cy="${SINGLE_POLICY_TYPE}-label"]`),
      hintListItem: (index) => cy.get(`[data-cy="${SINGLE_POLICY_TYPE}-hint-list-item-${index}"]`),
      input: () => cy.get(`[data-cy="${SINGLE_POLICY_TYPE}-input"]`),
    },
    multiple: {
      label: () => cy.get(`[data-cy="${MULTIPLE_POLICY_TYPE}-label"]`),
      hintListItem: (index) => cy.get(`[data-cy="${MULTIPLE_POLICY_TYPE}-hint-list-item-${index}"]`),
      input: () => cy.get(`[data-cy="${MULTIPLE_POLICY_TYPE}-input"]`),
    },
    errorMessage: () => cy.get(`[data-cy="${POLICY_TYPE}-error-message"]`),
  },
  [SINGLE_POLICY_LENGTH]: {
    label: () => cy.get(`[data-cy="${SINGLE_POLICY_LENGTH}-label"]`),
    hint: () => cy.get(`[data-cy="${SINGLE_POLICY_LENGTH}-hint"]`),
    hintLink: () => cy.get(`[data-cy="${SINGLE_POLICY_LENGTH}-hint"] a`),
    input: () => cy.get(`[data-cy="${SINGLE_POLICY_LENGTH}-input"]`),
    errorMessage: () => cy.get(`[data-cy="${SINGLE_POLICY_LENGTH}-error-message"]`),
  },
};

export default policyTypePage;
