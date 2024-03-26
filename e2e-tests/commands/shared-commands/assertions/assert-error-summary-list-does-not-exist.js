import partials from '../../../partials';

/**
 * assertErrorSummaryListDoesNotExist
 * Assert the error summary list does not exist
 */
const assertErrorSummaryListDoesNotExist = () => {
  partials.errorSummaryListItems().should('not.exist');
};

export default assertErrorSummaryListDoesNotExist;
