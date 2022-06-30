import { FIELD_IDS } from '../../../constants';

const buyerBasedPage = {
  heading: () => cy.get('[data-cy="heading"]'),
  searchInput: () => cy.get(`#${FIELD_IDS.COUNTRY}`, { timeout: 10000 }),
  hiddenInput: () => cy.get(`#${FIELD_IDS.BUYER_COUNTRY}`),
  results: () => cy.get(`#${FIELD_IDS.COUNTRY} + ul li`),
  noResults: () => cy.get('.autocomplete__option--no-results'),
  errorMessage: () => cy.get(`[data-cy="${FIELD_IDS.COUNTRY}-error-message"]`),
  submitButton: () => cy.get('[data-cy="submit-button"]'),
};

export default buyerBasedPage;
