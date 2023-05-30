import { FIELD_IDS } from '../../../../constants';

const buyerCountryPage = {
  hint: () => cy.get(`[data-cy="${FIELD_IDS.ELIGIBILITY.BUYER_COUNTRY}-hint"]`),
  input: () => cy.get(`#${FIELD_IDS.ELIGIBILITY.BUYER_COUNTRY}`),
  results: () => cy.get(`#${FIELD_IDS.ELIGIBILITY.BUYER_COUNTRY} + ul li`),
  noResults: () => cy.get('.autocomplete__option--no-results'),
  errorMessage: () => cy.get(`[data-cy="${FIELD_IDS.ELIGIBILITY.BUYER_COUNTRY}-error-message"]`),
};

export default buyerCountryPage;
