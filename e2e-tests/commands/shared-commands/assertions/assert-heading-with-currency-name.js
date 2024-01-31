import { heading } from '../../../pages/shared';

/**
 * assertHeadingWithCurrencyName
 * Assert a heading with a currency name and optional question mark
 * @param {String} pageTitle: Page title
 * @param {String} currencyName: Currency name
 * @param {Boolean} withQuestionMark: Add a question mark to the expected text.
 */
const assertHeadingWithCurrencyName = ({
  pageTitle,
  currencyName,
  withQuestionMark = false,
}) => {
  let expected = `${pageTitle} ${currencyName}`;

  if (withQuestionMark) {
    expected += ' ?';
  }

  cy.checkText(heading(), expected);
};

export default assertHeadingWithCurrencyName;
