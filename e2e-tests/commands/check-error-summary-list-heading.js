import partials from '../partials';
import checkText from './check-text';
import { ERROR_MESSAGES } from '../content-strings';

const checkErrorSummaryListHeading = () => {
  checkText(
    partials.errorSummaryListHeading(),
    ERROR_MESSAGES.THERE_IS_A_PROBLEM,
  );
};

export default checkErrorSummaryListHeading;
