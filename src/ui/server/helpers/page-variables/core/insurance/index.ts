import { ROUTES } from '../../../../constants';
import { CorePageVariablesInitialInput, CorePageVariables } from '../../../../../types';
import corePageVariables from '..';

const { FEEDBACK: feedbackRoute } = ROUTES.INSURANCE;

/**
 * insuranceCorePageVariables
 * Generate page variables required for every insurance page
 * @param {Object} Page content strings bespoke to the page
 * @param {String} Link to the previous page
 * @param {String} originalUrl for the page user is on
 * @returns {Object} Common page content strings
 */
const insuranceCorePageVariables = ({ PAGE_CONTENT_STRINGS, BACK_LINK, originalUrl }: CorePageVariablesInitialInput): CorePageVariables => ({
  ...corePageVariables({
    PAGE_CONTENT_STRINGS,
    BACK_LINK,
    FEEDBACK_ROUTE: feedbackRoute,
    originalUrl,
  }),
});

export default insuranceCorePageVariables;
