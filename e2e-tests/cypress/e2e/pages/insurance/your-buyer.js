import { YOUR_BUYER_FIELD_IDS } from '../../../../content-strings/fields/insurance/your-buyer';

const {
  BUYER_COUNTRY,
  BUYER_ORGANISATION,
} = YOUR_BUYER_FIELD_IDS;

export const yourBuyer = {
  [BUYER_COUNTRY]: {
    label: () => cy.get(`[data-cy="${BUYER_COUNTRY}-label"]`),
    input: () => cy.get(`[data-cy="${BUYER_COUNTRY}-input"]`),
    inputOption: () => cy.get(`[data-cy="${BUYER_COUNTRY}-input"]`).find('option'),
    inputFirstOption: () => cy.get(`[data-cy="${BUYER_COUNTRY}-input"]`).find('option').eq(0),
    inputOptionSelected: () => cy.get(`[data-cy="${BUYER_COUNTRY}-input"]`).find(':selected'),
    errorMessage: () => cy.get(`[data-cy="${BUYER_COUNTRY}-error-message"]`),
  },
  [BUYER_ORGANISATION]: {
    label: () => cy.get(`[data-cy="${BUYER_ORGANISATION}-label"]`),
    input: () => cy.get(`[data-cy="${BUYER_ORGANISATION}-input"]`),
    errorMessage: () => cy.get(`[data-cy="${BUYER_ORGANISATION}-error-message"]`),
  },
};
