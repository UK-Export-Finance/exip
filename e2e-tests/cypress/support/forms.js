import { buyerCountryPage } from '../e2e/pages/shared';

export const completeAndSubmitBuyerCountryForm = () => {
  buyerCountryPage.searchInput().type('Alg');
  const results = buyerCountryPage.results();
  results.first().click();
  buyerCountryPage.submitButton().click();
};
