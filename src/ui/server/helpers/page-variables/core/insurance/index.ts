import { ROUTES } from '../../../../constants';
import { CorePageVariablesInitialInput, CorePageVariables } from '../../../../../types';
import corePageVariables from '..';

const { FEEDBACK: feedbackRoute } = ROUTES.INSURANCE;

/**
 * insuranceCorePageVariables
 * Generate page variables required for every insurance page
 * @param {Object} Page content strings bespoke to the page
 * @param {String} Link to the previous page
 * @param {String} ORIGINAL_URL for the page user is on
 * @param {String} CUSTOM_CONTENT_HTML string for the location of the partial which contains HTML for custom content for single radio page
 * @param {String} CONDITIONAL_YES_HTML string for the location of the partial which contains HTML for conditional yes reveal single radio page
 * @param {String} CONDITIONAL_NO_HTML string for the location of the partial which contains HTML for conditional no reveal single radio page
 * @param {String} HINT_HTML string for the location of the partial which contains HTML for the hint for single radio page
 * @param {String} LEGEND_CLASS class for the legend on a single radio page
 * @param {Boolean} HORIZONTAL_RADIOS if radios are horizontal or not
 * @returns {Object} Common page content strings
 */
const insuranceCorePageVariables = ({
  PAGE_CONTENT_STRINGS,
  BACK_LINK,
  ORIGINAL_URL,
  CUSTOM_CONTENT_HTML,
  CONDITIONAL_YES_HTML,
  CONDITIONAL_NO_HTML,
  HINT_HTML,
  LEGEND_CLASS,
  HORIZONTAL_RADIOS,
}: CorePageVariablesInitialInput): CorePageVariables => ({
  ...corePageVariables({
    PAGE_CONTENT_STRINGS,
    BACK_LINK,
    FEEDBACK_ROUTE: feedbackRoute,
    ORIGINAL_URL,
    CUSTOM_CONTENT_HTML,
    CONDITIONAL_YES_HTML,
    CONDITIONAL_NO_HTML,
    HINT_HTML,
    LEGEND_CLASS,
    HORIZONTAL_RADIOS,
  }),
});

export default insuranceCorePageVariables;
