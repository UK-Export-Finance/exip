import { FIELDS } from '../../../constants';

const companyBasedPage = {
  visit: () => cy.visit('/final-destination'),
  heading: () => cy.get('[data-cy="heading"]'),
  [FIELDS.COUNTRY_SEARCH]: {
    hint: () => cy.get(`[data-cy="${FIELDS.COUNTRY_SEARCH}-hint"]`),
    searchInput: () => cy.get(`#${FIELDS.COUNTRY_SEARCH}`),
    hiddenInput: () => cy.get(`#${FIELDS.FINAL_DESTINATION}`),
    results: () => cy.get(`#${FIELDS.COUNTRY_SEARCH} + ul li`),
    noResults: () => cy.get('.autocomplete__option--no-results'),
    errorMessage: () => cy.get(`[data-cy="${FIELDS.COUNTRY_SEARCH}-error-message"]`),
  },
  submitButton: () => cy.get('[data-cy="submit-button"]'),
};

export default companyBasedPage;
