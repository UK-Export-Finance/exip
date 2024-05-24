/**
 * assertCopyWithCurrencyName
 * Assert a selector with a currency name and optional question mark
 * @param {String} expectedCopy: Expected text
 * @param {String} currencyName: Currency name
 * @param {String} currencyName: Currency name
 * @param {Function} selector: Cypress selector
 * @param {Boolean} withQuestionMark: Add a question mark to the expected text.
 */
const assertCopyWithCurrencyName = ({
  expectedCopy, currencyName, selector, withQuestionMark = false,
}) => {
  let expected = `${expectedCopy} ${currencyName}`;

  if (withQuestionMark) {
    expected += '?';
  }

  cy.checkText(selector, expected);
};

export default assertCopyWithCurrencyName;
