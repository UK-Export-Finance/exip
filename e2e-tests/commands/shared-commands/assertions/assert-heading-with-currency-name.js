import { heading } from '../../../pages/shared';

/**
 * assertHeadingWithCurrencyName
 * Assert a heading with a currency name and optional question mark
 * @param {String} pageTitle: Page title
 * @param {String} currencyName: Currency name
 * @param {String} currencyName: Currency name
 * @param {Function} selector: Cypress selector
 * @param {Boolean} withQuestionMark: Add a question mark to the expected text.
 */
const assertHeadingWithCurrencyName = ({ pageTitle, currencyName, selector, withQuestionMark = false }) => {
  let expected = `${pageTitle} ${currencyName}`;

  if (withQuestionMark) {
    expected += '?';
  }

  /**
   * if selector provided, check text on selector
   * else check heading text
   */
  if (selector) {
    cy.checkText(selector, expected);
  } else {
    cy.checkText(heading(), expected);
  }
};

export default assertHeadingWithCurrencyName;
