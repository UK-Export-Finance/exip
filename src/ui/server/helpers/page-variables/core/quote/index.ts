import { CorePageVariablesInitialInput, CorePageVariables } from '../../../../../types';
import corePageVariables from '..';

/**
 * quoteCorePageVariables
 * Generate page variables required for every quote page
 * @param {object} Page content strings bespoke to the page
 * @param {string} Link to the previous page
 * @param {string} ORIGINAL_URL for the page user is on
 * @returns {object} Common page content strings
 */
const quoteCorePageVariables = ({ PAGE_CONTENT_STRINGS, BACK_LINK, ORIGINAL_URL }: CorePageVariablesInitialInput): CorePageVariables => ({
  ...corePageVariables({
    PAGE_CONTENT_STRINGS,
    BACK_LINK,
    ORIGINAL_URL,
  }),
});

export default quoteCorePageVariables;
