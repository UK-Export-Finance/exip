import checkText from '../e2e/helpers/check-text';

/**
 * assertSummaryListRowValue
 * Assert a summary list row's value.
 * E.g assertSummaryListRowValue({ rowA: {...}, rowB: {...} }, 'startDate', '01/02/2023')
 * @param {Object} Summary list cypress selectors from pages/partials.
 * @param {String} Field ID in the summary list to assert
 * @param {String} Expected value
 */
const assertSummaryListRowValue = (summaryList, fieldId, expected) => {
  checkText(
    summaryList[fieldId].value(),
    expected,
  );
};

export default assertSummaryListRowValue;
