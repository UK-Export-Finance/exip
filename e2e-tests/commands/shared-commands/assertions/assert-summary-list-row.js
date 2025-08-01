import { LINKS, DEFAULT } from '../../../content-strings';

/**
 * assertSummaryListRow
 * Assert a summary list row.
 * @param {object} summaryList: Summary list cypress selectors from pages/partials.
 * @param {string} fieldId: Field ID in the summary list to assert
 * @param {string} expectedKey: Expected key of the row
 * @param {string} expectedValue: Expected value of the row
 * @param {string} expectedChangeLinkText: Expected change link text - either add/change or should not exist
 */
const assertSummaryListRow = (summaryList, fieldId, expectedKey, expectedValue, expectedChangeLinkText) => {
  cy.assertSummaryListRowKey(summaryList, fieldId, expectedKey);

  /**
   * if value exists then check the value
   * else, check for default empty string
   */
  if (expectedValue) {
    cy.assertSummaryListRowValue(summaryList, fieldId, expectedValue);
  } else {
    cy.assertSummaryListRowValue(summaryList, fieldId, DEFAULT.EMPTY);
  }

  /**
   * expectedText for changelink can either be change, add or not exist
   * If there is a value for the summaryList row and expectedChangeLinkText, then text should contain change
   * If there is no value for the summaryList row but expectedChangeLinkText, then text should contain add
   * If there is neither, then the expectedText should be undefined
   */
  let expectedText;

  if (expectedValue && expectedChangeLinkText) {
    expectedText = `${LINKS.CHANGE} ${expectedChangeLinkText}`;
  } else if (expectedChangeLinkText) {
    expectedText = `${LINKS.ADD} ${expectedChangeLinkText}`;
  }

  cy.assertSummaryListRowChangeText(summaryList, fieldId, expectedText);
};

export default assertSummaryListRow;
