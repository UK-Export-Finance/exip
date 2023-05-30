import { FIELD_IDS } from '../../../../constants';

const buyerCountryPage = {
  heading: () => cy.get('[data-cy="heading"]'),
  hint: () => cy.get(`[data-cy="${FIELD_IDS.ELIGIBILITY.BUYER_COUNTRY}-hint"]`),
  input: () => cy.get(`#${FIELD_IDS.ELIGIBILITY.BUYER_COUNTRY}`),
  results: () => cy.get(`#${FIELD_IDS.ELIGIBILITY.BUYER_COUNTRY} + ul li`),
  noResults: () => cy.get('.autocomplete__option--no-results'),
  errorMessage: () => cy.get(`[data-cy="${FIELD_IDS.ELIGIBILITY.BUYER_COUNTRY}-error-message"]`),
  submitButton: () => cy.get('[data-cy="submit-button"]'),
};

export default buyerCountryPage;
