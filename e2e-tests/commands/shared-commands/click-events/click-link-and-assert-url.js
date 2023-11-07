import assertUrl from '../assertions/assert-url';

/**
 * clickLinkAndAssertUrl
 * Click a link and assert the URL
 * @param {Function} Cypress selector
 * @param {String} Expected URL
 */
const clickLinkAndAssertUrl = ({
  link,
  expectedUrl,
}) => {
  link.click();

  assertUrl(expectedUrl);
};

export default clickLinkAndAssertUrl;
