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
 * @returns {Object} Common page content strings combined with field specifics
 */
const insuranceSingleInputPageVariables = ({
  FIELD_ID,
  PAGE_CONTENT_STRINGS,
  BACK_LINK,
  HAS_SAVE_AND_BACK = true,
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
    HAS_SAVE_AND_BACK,
    CUSTOM_CONTENT_HTML,
    CONDITIONAL_YES_HTML,
    CONDITIONAL_NO_HTML,
    HINT_HTML,
    LEGEND_CLASS,
    HORIZONTAL_RADIOS,
  });

export default insuranceSingleInputPageVariables;
