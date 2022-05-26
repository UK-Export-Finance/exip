import { FIELDS } from '../../../constants';

const companyBasedPage = {
  heading: () => cy.get('[data-cy="heading"]'),
  [FIELDS.COUNTRY]: {
    hint: () => cy.get(`[data-cy="${FIELDS.COUNTRY}-hint"]`),
    searchInput: () => cy.get(`#${FIELDS.COUNTRY}`),
    hiddenInput: () => cy.get(`#${FIELDS.FINAL_DESTINATION}`),
    results: () => cy.get(`#${FIELDS.COUNTRY} + ul li`),
    noResults: () => cy.get('.autocomplete__option--no-results'),
    errorMessage: () => cy.get(`[data-cy="${FIELDS.COUNTRY}-error-message"]`),
  },
  submitButton: () => cy.get('[data-cy="submit-button"]'),
};

export default companyBasedPage;
