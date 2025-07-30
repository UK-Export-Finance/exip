import { ROUTES } from '../../../../constants';
import { CorePageVariablesInitialInput, CorePageVariables } from '../../../../../types';
import corePageVariables from '..';

const { FEEDBACK: feedbackRoute } = ROUTES.INSURANCE;

/**
 * insuranceCorePageVariables
 * Generate page variables required for every insurance page
 * @param {object} Page content strings bespoke to the page
 * @param {string} Link to the previous page
 * @param {string} ORIGINAL_URL for the page user is on
 * @param {object} HTML_FLAGS object containing HTML flags - CUSTOM_CONTENT_HTML, CONDITIONAL_YES/NO_HTML, HINT_HTML, LEGEND_CLASS, HORIZONTAL_RADIOS
 * @returns {object} Common page content strings
 */
const insuranceCorePageVariables = ({ PAGE_CONTENT_STRINGS, BACK_LINK, ORIGINAL_URL, HTML_FLAGS }: CorePageVariablesInitialInput): CorePageVariables => ({
  ...corePageVariables({
    PAGE_CONTENT_STRINGS,
    BACK_LINK,
    FEEDBACK_ROUTE: feedbackRoute,
    ORIGINAL_URL,
    HTML_FLAGS,
  }),
});

export default insuranceCorePageVariables;
