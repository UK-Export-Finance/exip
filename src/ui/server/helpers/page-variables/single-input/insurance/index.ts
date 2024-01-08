import singleInputPageVariables from '..';
import { ROUTES } from '../../../../constants';
import { SingleInputPageVariablesInitialInput } from '../../../../../types';

const { FEEDBACK: feedbackRoute } = ROUTES.INSURANCE;

/**
 * insuranceSingleInputPageVariables
 * Generate page variables for an insurance page with a single input form
 * @param {String} Field/input ID
 * @param {Object} Page content strings bespoke to the page
 * @param {String} Link to the previous page
 * @param {String} CUSTOM_CONTENT_HTML string for the location of the partial which contains HTML for custom content for single radio page
 * @param {String} CONDITIONAL_YES_HTML string for the location of the partial which contains HTML for conditional yes reveal single radio page
 * @param {String} CONDITIONAL_NO_HTML string for the location of the partial which contains HTML for conditional no reveal single radio page
 * @param {String} HINT_HTML string for the location of the partial which contains HTML for the hint for single radio page
 * @param {String} LEGEND_CLASS class for the legend on a single radio page
 * @param {Boolean} HORIZONTAL_RADIOS if radios are horizontal or not
 * @returns {Object} Common page content strings combined with field specifics
 */
const insuranceSingleInputPageVariables = ({
  FIELD_ID,
  PAGE_CONTENT_STRINGS,
  BACK_LINK,
  CUSTOM_CONTENT_HTML,
  CONDITIONAL_YES_HTML,
  CONDITIONAL_NO_HTML,
  HINT_HTML,
  LEGEND_CLASS,
  HORIZONTAL_RADIOS,
}: SingleInputPageVariablesInitialInput) =>
  singleInputPageVariables({
    PAGE_CONTENT_STRINGS,
    BACK_LINK,
    FIELD_ID,
    FEEDBACK_ROUTE: feedbackRoute,
    CUSTOM_CONTENT_HTML,
    CONDITIONAL_YES_HTML,
    CONDITIONAL_NO_HTML,
    HINT_HTML,
    LEGEND_CLASS,
    HORIZONTAL_RADIOS,
  });

export default insuranceSingleInputPageVariables;
