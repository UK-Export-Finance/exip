import { errorSummaryListItems } from '../../../partials';

/**
 * assertErrorSummaryListDoesNotExist
 * Assert the error summary list does not exist
 */
const assertErrorSummaryListDoesNotExist = () => {
  errorSummaryListItems().should('not.exist');
};

export default assertErrorSummaryListDoesNotExist;
