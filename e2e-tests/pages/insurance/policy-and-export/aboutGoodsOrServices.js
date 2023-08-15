import { FIELD_IDS } from '../../../constants';

const {
  INSURANCE: {
    POLICY_AND_EXPORTS: {
      ABOUT_GOODS_OR_SERVICES: { DESCRIPTION, FINAL_DESTINATION },
    },
  },
} = FIELD_IDS;

const aboutGoodsOrServices = {
  [DESCRIPTION]: {
    label: () => cy.get(`[data-cy="${DESCRIPTION}-label"]`),
    hint: {
      intro: () => cy.get(`[data-cy="${DESCRIPTION}-hint-intro"]`),
      list: {
        item1: () => cy.get(`[data-cy="${DESCRIPTION}-hint-list-item-1"]`),
        item2: () => cy.get(`[data-cy="${DESCRIPTION}-hint-list-item-2"]`),
        item3: () => cy.get(`[data-cy="${DESCRIPTION}-hint-list-item-3"]`),
      },
    },
    prefix: () => cy.get(`[data-cy="${DESCRIPTION}-prefix"]`),
    input: () => cy.get(`[data-cy="${DESCRIPTION}-input"]`),
    errorMessage: () => cy.get(`[data-cy="${DESCRIPTION}-error-message"]`),
  },
  [FINAL_DESTINATION]: {
    label: () => cy.get(`[data-cy="${FINAL_DESTINATION}-label"]`),
    input: () => cy.get(`[data-cy="${FINAL_DESTINATION}-input"]`),
    inputOption: () => cy.get(`[data-cy="${FINAL_DESTINATION}-input"]`).find('option'),
    inputFirstOption: () => cy.get(`[data-cy="${FINAL_DESTINATION}-input"]`).find('option').eq(0),
    inputOptionSelected: () => cy.get(`[data-cy="${FINAL_DESTINATION}-input"]`).find(':selected'),
    errorMessage: () => cy.get(`[data-cy="${FINAL_DESTINATION}-error-message"]`),
  },
};

export default aboutGoodsOrServices;
