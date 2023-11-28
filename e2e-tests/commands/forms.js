import { countryInput, submitButton } from '../pages/shared';
import { FIELD_IDS } from '../constants';

const FIELD_ID = FIELD_IDS.ELIGIBILITY.BUYER_COUNTRY;

/**
 * completeAndSubmitBuyerCountryForm
 * Complete and submit a buyer country form.
 */
export const completeAndSubmitBuyerCountryForm = ({ country = 'Alg' }) => {
  cy.keyboardInput(countryInput.field(FIELD_ID).input(), country);
  const results = countryInput.field(FIELD_ID).results();
  results.first().click();
  submitButton().click();
};

export default completeAndSubmitBuyerCountryForm;
