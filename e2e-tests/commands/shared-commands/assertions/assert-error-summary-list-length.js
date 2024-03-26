import partials from '../../../partials';

/**
 * assertErrorSummaryListLength
 * Assert the length of the error summary list
 * @param {Integer} expectedLength: Expected amount
 */
const assertErrorSummaryListLength = (expectedLength) => {
  cy.assertLength(partials.errorSummaryListItems(), expectedLength);
};

export default assertErrorSummaryListLength;
