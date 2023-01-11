import { FIELDS } from '../../../../content-strings/fields/insurance/your-buyer';

const {
  YOUR_BUYER: {
    BUYER_COUNTRY: {
      ID,
    },
  },
} = FIELDS;

export const yourBuyer = {
  [ID]: {
    label: () => cy.get(`[data-cy="${ID}-label"]`),
    input: () => cy.get(`[data-cy="${ID}-input"]`),
    inputOption: () => cy.get(`[data-cy="${ID}-input"]`).find('option'),
    inputFirstOption: () => cy.get(`[data-cy="${ID}-input"]`).find('option').eq(0),
    inputOptionSelected: () => cy.get(`[data-cy="${ID}-input"]`).find(':selected'),
    errorMessage: () => cy.get(`[data-cy="${ID}-error-message"]`),
  },
};
