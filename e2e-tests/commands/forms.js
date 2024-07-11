import { autoCompleteField } from '../pages/shared';
import { FIELD_IDS } from '../constants';
import { DZA } from '../fixtures/countries';

const FIELD_ID = FIELD_IDS.ELIGIBILITY.BUYER_COUNTRY;

/**
 * completeAndSubmitBuyerCountryForm
 * Complete and submit a buyer country form.
 * @param {String} countryName to input - defaults to Algeria mock country
 */
export const completeAndSubmitBuyerCountryForm = ({ countryName = DZA.NAME }) => {
  cy.keyboardInput(autoCompleteField(FIELD_ID).input(), countryName);
  const results = autoCompleteField(FIELD_ID).results();
  results.first().click();
  cy.clickSubmitButton();
};

export default completeAndSubmitBuyerCountryForm;
