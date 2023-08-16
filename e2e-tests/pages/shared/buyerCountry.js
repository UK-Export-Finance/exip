import { FIELD_IDS } from '../../constants';

const FIELD_ID = FIELD_IDS.ELIGIBILITY.BUYER_COUNTRY;

const buyerCountryPage = {
  hint: () => cy.get(`[data-cy="${FIELD_ID}-hint"]`),
  input: () => cy.get(`#${FIELD_ID}`),
  results: () => cy.get(`#${FIELD_ID} + ul li`),
  noResults: () => cy.get('.autocomplete__option--no-results'),
  errorMessage: () => cy.get(`[data-cy="${FIELD_ID}-error-message"]`),
};

export default buyerCountryPage;
