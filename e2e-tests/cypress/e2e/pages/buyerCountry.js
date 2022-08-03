import { FIELD_IDS } from '../../../constants';

const buyerCountryPage = {
  heading: () => cy.get('[data-cy="heading"]'),
  hint: () => cy.get(`[data-cy="${FIELD_IDS.COUNTRY}-hint"]`),
  searchInput: () => cy.get(`#${FIELD_IDS.COUNTRY}`),
  hiddenInput: () => cy.get(`#${FIELD_IDS.BUYER_COUNTRY}`),
  results: () => cy.get(`#${FIELD_IDS.COUNTRY} + ul li`),
  noResults: () => cy.get('.autocomplete__option--no-results'),
  errorMessage: () => cy.get(`[data-cy="${FIELD_IDS.COUNTRY}-error-message"]`),
  submitButton: () => cy.get('[data-cy="submit-button"]'),
};

export default buyerCountryPage;
