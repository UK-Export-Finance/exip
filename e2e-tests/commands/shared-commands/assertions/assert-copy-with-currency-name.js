/**
 * assertCopyWithCurrencyName
 * Assert a selector with a currency name and optional question mark
 * @param {string} expectedCopy: Expected text
 * @param {string} currencyName: Currency name
 * @param {string} currencyName: Currency name
 * @param {Function} selector: Cypress selector
 * @param {boolean} withQuestionMark: Add a question mark to the expected text.
 */
const assertCopyWithCurrencyName = ({ expectedCopy, currencyName, selector, withQuestionMark = false }) => {
  let expected = `${expectedCopy} ${currencyName}`;

  if (withQuestionMark) {
    expected += '?';
  }

  cy.checkText(selector, expected);
};

export default assertCopyWithCurrencyName;
