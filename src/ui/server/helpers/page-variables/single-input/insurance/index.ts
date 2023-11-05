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
const insuranceSingleInputPageVariables = ({ FIELD_ID, PAGE_CONTENT_STRINGS, BACK_LINK }: SingleInputPageVariablesInitialInput) =>
  singleInputPageVariables({
    PAGE_CONTENT_STRINGS,
    BACK_LINK,
    FIELD_ID,
    FEEDBACK_ROUTE: feedbackRoute,
  });

export default insuranceSingleInputPageVariables;
