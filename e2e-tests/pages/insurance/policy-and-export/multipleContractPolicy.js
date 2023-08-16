import { INSURANCE_FIELD_IDS } from '../../../constants/field-ids/insurance';
import contractPolicy from './contractPolicy';

const {
  POLICY_AND_EXPORTS: {
    CONTRACT_POLICY: {
      MULTIPLE: {
        TOTAL_MONTHS_OF_COVER,
        TOTAL_SALES_TO_BUYER,
        MAXIMUM_BUYER_WILL_OWE,
      },
    },
  },
} = INSURANCE_FIELD_IDS;

const multipleContractPolicy = {
  ...contractPolicy,
  [TOTAL_MONTHS_OF_COVER]: {
    label: () => cy.get(`[data-cy="${TOTAL_MONTHS_OF_COVER}-label"]`),
    hint: () => cy.get(`[data-cy="${TOTAL_MONTHS_OF_COVER}-hint"]`),
    input: () => cy.get(`[data-cy="${TOTAL_MONTHS_OF_COVER}-input"]`),
    inputOption: () => cy.get(`[data-cy="${TOTAL_MONTHS_OF_COVER}-input"]`).find('option'),
    inputFirstOption: () => cy.get(`[data-cy="${TOTAL_MONTHS_OF_COVER}-input"]`).find('option').eq(0),
    inputOptionSelected: () => cy.get(`[data-cy="${TOTAL_MONTHS_OF_COVER}-input"]`).find(':selected'),
    errorMessage: () => cy.get(`[data-cy="${TOTAL_MONTHS_OF_COVER}-error-message"]`),
  },
  [TOTAL_SALES_TO_BUYER]: {
    label: () => cy.get(`[data-cy="${TOTAL_SALES_TO_BUYER}-label"]`),
    hint: () => cy.get(`[data-cy="${TOTAL_SALES_TO_BUYER}-hint"]`),
    prefix: () => cy.get(`[data-cy="${TOTAL_SALES_TO_BUYER}-prefix"]`),
    input: () => cy.get(`[data-cy="${TOTAL_SALES_TO_BUYER}-input"]`),
    errorMessage: () => cy.get(`[data-cy="${TOTAL_SALES_TO_BUYER}-error-message"]`),
  },
  [MAXIMUM_BUYER_WILL_OWE]: {
    label: () => cy.get(`[data-cy="${MAXIMUM_BUYER_WILL_OWE}-label"]`),
    hint: {
      forExample: () => cy.get(`[data-cy="${MAXIMUM_BUYER_WILL_OWE}-hint-for-example"]`),
      needMoreCover: () => cy.get(`[data-cy="${MAXIMUM_BUYER_WILL_OWE}-hint-need-more-cover"]`),
      fillInFormLink: () => cy.get(`[data-cy="${MAXIMUM_BUYER_WILL_OWE}-hint-fill-in-form-link"]`),
      noDecimals: () => cy.get(`[data-cy="${MAXIMUM_BUYER_WILL_OWE}-hint-no-decimals"]`),
    },
    text: () => cy.get('[data-cy="details-1"]'),
    link: () => cy.get('[data-cy="details-1"]  a'),
    prefix: () => cy.get(`[data-cy="${MAXIMUM_BUYER_WILL_OWE}-prefix"]`),
    input: () => cy.get(`[data-cy="${MAXIMUM_BUYER_WILL_OWE}-input"]`),
    errorMessage: () => cy.get(`[data-cy="${MAXIMUM_BUYER_WILL_OWE}-error-message"]`),
  },
};

export default multipleContractPolicy;
