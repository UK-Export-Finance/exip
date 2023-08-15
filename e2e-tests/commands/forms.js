import { buyerCountryPage, submitButton } from '../pages/shared';

export const completeAndSubmitBuyerCountryForm = () => {
  cy.keyboardInput(buyerCountryPage.input(), 'Alg');
  const results = buyerCountryPage.results();
  results.first().click();
  submitButton().click();
};
