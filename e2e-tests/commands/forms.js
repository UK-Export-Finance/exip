import { countryInput, submitButton } from '../pages/shared';
import { FIELD_IDS } from '../constants';
import mockCountries from '../fixtures/countries';

const FIELD_ID = FIELD_IDS.ELIGIBILITY.BUYER_COUNTRY;

/**
 * completeAndSubmitBuyerCountryForm
 * Complete and submit a buyer country form.
 */
export const completeAndSubmitBuyerCountryForm = ({ countryName = mockCountries[1].NAME }) => {
  cy.keyboardInput(countryInput.field(FIELD_ID).input(), countryName);
  const results = countryInput.field(FIELD_ID).results();
  results.first().click();
  submitButton().click();
};

export default completeAndSubmitBuyerCountryForm;
