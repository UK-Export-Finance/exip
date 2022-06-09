import { FIELD_IDS } from '../../../constants';

const companyBasedPage = {
  heading: () => cy.get('[data-cy="heading"]'),
  [FIELD_IDS.COUNTRY]: {
    hint: () => cy.get(`[data-cy="${FIELD_IDS.COUNTRY}-hint"]`),
    searchInput: () => cy.get(`#${FIELD_IDS.COUNTRY}`),
    hiddenInput: () => cy.get(`#${FIELD_IDS.FINAL_DESTINATION}`),
    results: () => cy.get(`#${FIELD_IDS.COUNTRY} + ul li`),
    noResults: () => cy.get('.autocomplete__option--no-results'),
    errorMessage: () => cy.get(`[data-cy="${FIELD_IDS.COUNTRY}-error-message"]`),
  },
  submitButton: () => cy.get('[data-cy="submit-button"]'),
};

export default companyBasedPage;
