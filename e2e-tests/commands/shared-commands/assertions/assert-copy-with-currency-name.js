/**
 * assertCopyWithCurrencyName
 * Assert a selector with a currency name and optional question mark
 * @param {String} pageTitle: Page title
 * @param {String} currencyName: Currency name
 * @param {String} currencyName: Currency name
 * @param {Function} selector: Cypress selector
 * @param {Boolean} withQuestionMark: Add a question mark to the expected text.
 */
const assertCopyWithCurrencyName = ({
  pageTitle,
  currencyName,
  selector,
  withQuestionMark = false,
}) => {
  let expected = `${pageTitle} ${currencyName}`;

  if (withQuestionMark) {
    expected += '?';
  }

  cy.checkText(selector, expected);
};

export default assertCopyWithCurrencyName;
