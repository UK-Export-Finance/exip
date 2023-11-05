import partials from '../../../partials';
import checkText from './check-text';
import { ERROR_MESSAGES } from '../../../content-strings';

/**
 * checkErrorSummaryListHeading
 * Check that the error summary list has the correct heading.
 */
const checkErrorSummaryListHeading = () => {
  checkText(
    partials.errorSummaryListHeading(),
    ERROR_MESSAGES.THERE_IS_A_PROBLEM,
  );
};

export default checkErrorSummaryListHeading;
