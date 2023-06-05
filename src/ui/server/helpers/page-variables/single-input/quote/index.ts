import singleInputPageVariables from '..';
import { LINKS } from '../../../../content-strings';
import { SingleInputPageVariablesInitialInput } from '../../../../../types';

/**
 * quoteSingleInputPageVariables
 * Generate page variables for a quote page with a single input form
 * @param {String} Field/input ID
 * @param {Object} Page content strings bespoke to the page
 * @param {String} Link to the previous page
 * @param {String} ORIGINAL_URL for the page user is on
 * @returns {Object} Common page content strings combined with field specifics
 */
const quoteSingleInputPageVariables = ({ FIELD_ID, PAGE_CONTENT_STRINGS, BACK_LINK, ORIGINAL_URL }: SingleInputPageVariablesInitialInput) =>
  singleInputPageVariables({
    PAGE_CONTENT_STRINGS,
    BACK_LINK,
    FIELD_ID,
    FEEDBACK_ROUTE: LINKS.EXTERNAL.FEEDBACK,
    ORIGINAL_URL,
  });

export default quoteSingleInputPageVariables;
