import singleInputPageVariables from '..';
import { LINKS } from '../../../../content-strings';
import { SingleInputPageVariablesInitialInput } from '../../../../../types';

/**
 * quoteSingleInputPageVariables
 * Generate page variables for a quote page with a single input form
 * @param {string} Field/input ID
 * @param {object} Page content strings bespoke to the page
 * @param {string} Link to the previous page
 * @param {string} ORIGINAL_URL for the page user is on
 * @param {object} HTML_FLAGS object containing HTML flags - CUSTOM_CONTENT_HTML, CONDITIONAL_YES/NO_HTML, HINT_HTML, LEGEND_CLASS, HORIZONTAL_RADIOS
 * @returns {object} Common page content strings combined with field specifics
 */
const quoteSingleInputPageVariables = ({ FIELD_ID, PAGE_CONTENT_STRINGS, BACK_LINK, ORIGINAL_URL, HTML_FLAGS }: SingleInputPageVariablesInitialInput) =>
  singleInputPageVariables({
    PAGE_CONTENT_STRINGS,
    BACK_LINK,
    FIELD_ID,
    FEEDBACK_ROUTE: LINKS.EXTERNAL.FEEDBACK,
    ORIGINAL_URL,
    HTML_FLAGS,
  });

export default quoteSingleInputPageVariables;
