import { FIELD_IDS } from '../../../constants';

const FIELD_ID = FIELD_IDS.ELIGIBILITY.BUYER_COUNTRY;

const baseUrl = Cypress.config('baseUrl');

/**
 * enterCountryAndAssertExitPageUrlBuyerCountry
 * can assert if url is correct after entering country that leads to exit page
 * @param {String} country to input
 * @param {String} url to check for exit page
 */
const enterCountryAndAssertExitPageUrlBuyerCountry = (country, url) => {
  cy.autocompleteKeyboardInput(FIELD_ID, country);

  cy.clickSubmitButton();

  const expectedUrl = `${baseUrl}${url}`;

  cy.assertUrl(expectedUrl);
};

export default enterCountryAndAssertExitPageUrlBuyerCountry;
