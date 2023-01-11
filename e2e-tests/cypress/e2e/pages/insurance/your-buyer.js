import { FIELDS } from '../../../../content-strings/fields/insurance/your-buyer';

const {
  YOUR_BUYER: {
    BUYER_COUNTRY,
    BUYER_ORGANISATION,
  },
} = FIELDS;

export const yourBuyer = {
  [BUYER_COUNTRY.ID]: {
    label: () => cy.get(`[data-cy="${BUYER_COUNTRY.ID}-label"]`),
    input: () => cy.get(`[data-cy="${BUYER_COUNTRY.ID}-input"]`),
    inputOption: () => cy.get(`[data-cy="${BUYER_COUNTRY.ID}-input"]`).find('option'),
    inputFirstOption: () => cy.get(`[data-cy="${BUYER_COUNTRY.ID}-input"]`).find('option').eq(0),
    inputOptionSelected: () => cy.get(`[data-cy="${BUYER_COUNTRY.ID}-input"]`).find(':selected'),
    errorMessage: () => cy.get(`[data-cy="${BUYER_COUNTRY.ID}-error-message"]`),
  },
  [BUYER_ORGANISATION.ID]: {
    label: () => cy.get(`[data-cy="${BUYER_ORGANISATION.ID}-label"]`),
    input: () => cy.get(`[data-cy="${BUYER_ORGANISATION.ID}-input"]`),
    errorMessage: () => cy.get(`[data-cy="${BUYER_ORGANISATION.ID}-error-message"]`),
  },
};
