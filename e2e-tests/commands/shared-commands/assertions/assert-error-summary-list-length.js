import { errorSummaryListItems } from '../../../partials';

/**
 * assertErrorSummaryListLength
 * Assert the length of the error summary list
 * @param {number} expectedLength: Expected amount
 */
const assertErrorSummaryListLength = (expectedLength) => {
  cy.assertLength(errorSummaryListItems(), expectedLength);
};

export default assertErrorSummaryListLength;
