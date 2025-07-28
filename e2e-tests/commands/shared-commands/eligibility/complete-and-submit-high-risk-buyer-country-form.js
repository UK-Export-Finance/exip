import { autoCompleteField } from '../../../pages/shared';
import { FIELD_IDS } from '../../../constants';
import { COUNTRY_QUOTE_SUPPORT } from '../../../fixtures/countries';

const FIELD_ID = FIELD_IDS.ELIGIBILITY.BUYER_COUNTRY;

const { HIGH_RISK_COUNTRY_1 } = COUNTRY_QUOTE_SUPPORT;
/**
 * completeAndSubmitHighRiskBuyerCountryForm
 * Complete and submit a buyer country form by selecting a High Risk country
 * @param {String} countryName to input - defaults to HIGH_RISK_COUNTRY_1 mock country
 */
export const completeAndSubmitHighRiskBuyerCountryForm = ({ countryName = HIGH_RISK_COUNTRY_1.NAME }) => {
  cy.keyboardInput(autoCompleteField(FIELD_ID).input(), countryName);
  const results = autoCompleteField(FIELD_ID).results();
  results.first().click();

  cy.clickSubmitButton();
};

export default completeAndSubmitHighRiskBuyerCountryForm;
