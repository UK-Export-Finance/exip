import { CorePageVariablesInitialInput, CorePageVariables } from '../../../../../types';
import corePageVariables from '..';

/**
 * quoteCorePageVariables
 * Generate page variables required for every quote page
 * @param {Object} Page content strings bespoke to the page
 * @param {String} Link to the previous page
 * @param {String} originalUrl for the page user is on
 * @returns {Object} Common page content strings
 */
const quoteCorePageVariables = ({ PAGE_CONTENT_STRINGS, BACK_LINK, originalUrl }: CorePageVariablesInitialInput): CorePageVariables => ({
  ...corePageVariables({
    PAGE_CONTENT_STRINGS,
    BACK_LINK,
    originalUrl,
  }),
});

export default quoteCorePageVariables;
