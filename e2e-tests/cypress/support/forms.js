import { buyerCountryPage, submitButton } from '../e2e/pages/shared';

export const completeAndSubmitBuyerCountryForm = () => {
  cy.keyboardInput(buyerCountryPage.searchInput(), 'Alg');
  const results = buyerCountryPage.results();
  results.first().click();
  submitButton().click();
};
