import { autoCompleteField } from '../../../pages/shared';
import { FIELD_IDS } from '../../../constants';
import { COUNTRY_QUOTE_SUPPORT } from '../../../fixtures/countries';

const FIELD_ID = FIELD_IDS.ELIGIBILITY.BUYER_COUNTRY;

const { ONLINE_SUPPORT } = COUNTRY_QUOTE_SUPPORT;
/**
 * completeAndSubmitBuyerCountryForm
 * Complete and submit a buyer country form.
 * @param {String} countryName to input - defaults to ONLINE_SUPPORT mock country
 */
export const completeAndSubmitBuyerCountryForm = ({ countryName = ONLINE_SUPPORT.NAME }) => {
  cy.keyboardInput(autoCompleteField(FIELD_ID).input(), countryName);
  const results = autoCompleteField(FIELD_ID).results();
  results.first().click();
  cy.clickSubmitButton();
};

export default completeAndSubmitBuyerCountryForm;
