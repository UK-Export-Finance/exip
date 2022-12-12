import { BUTTONS, COOKIES_CONSENT, FOOTER, LINKS } from '../../../content-strings';
import { CorePageVariablesInput, CorePageVariables } from '../../../../types';

/**
 * corePageVariables
 * Generate page variables required for every page
 * @param {Object} Page content strings bespoke to the page
 * @param {String} Product string
 * @param {String} Link to the previous page
 * @param {String} Link to the start route for the header
 * @returns {Object} Common page content strings
 */
const corePageVariables = ({ PAGE_CONTENT_STRINGS, PRODUCT, BACK_LINK, START_ROUTE }: CorePageVariablesInput): CorePageVariables => ({
  CONTENT_STRINGS: {
    ...PAGE_CONTENT_STRINGS,
    BUTTONS,
    COOKIES_CONSENT,
    FOOTER,
    LINKS,
    PRODUCT,
  },
  BACK_LINK,
  START_ROUTE,
});

export default corePageVariables;
