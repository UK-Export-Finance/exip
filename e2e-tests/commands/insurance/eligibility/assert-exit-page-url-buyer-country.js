import { autoCompleteField } from '../../../pages/shared';
import { FIELD_IDS } from '../../../constants';

const FIELD_ID = FIELD_IDS.ELIGIBILITY.BUYER_COUNTRY;

const baseUrl = Cypress.config('baseUrl');

/**
 * assertExitPageUrlBuyerCountry
 * can assert if url is correct after entering country that leads to exit page
 * @param {String} country to input
 * @param {String} url to check for exit page
 */
const assertExitPageUrlBuyerCountry = (country, url) => {
  cy.keyboardInput(autoCompleteField(FIELD_ID).input(), country);

  const results = autoCompleteField(FIELD_ID).results();
  results.first().click();

  cy.clickSubmitButton();

  const expectedUrl = `${baseUrl}${url}`;

  cy.assertUrl(expectedUrl);
};

export default assertExitPageUrlBuyerCountry;
