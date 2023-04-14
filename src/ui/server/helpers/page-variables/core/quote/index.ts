import { PRODUCT, LINKS } from '../../../../content-strings';
import { ROUTES } from '../../../../constants';
import { CorePageVariablesInitialInput, CorePageVariables } from '../../../../../types';
import corePageVariables from '..';

const { START: quoteStart } = ROUTES.QUOTE;

/**
 * quoteCorePageVariables
 * Generate page variables required for every quote page
 * @param {Object} Page content strings bespoke to the page
 * @param {String} Link to the previous page
 * @returns {Object} Common page content strings
 */
const quoteCorePageVariables = ({ PAGE_CONTENT_STRINGS, BACK_LINK }: CorePageVariablesInitialInput): CorePageVariables => ({
  ...corePageVariables({
    PAGE_CONTENT_STRINGS,
    PRODUCT: {
      ...PRODUCT,
      DESCRIPTION: PRODUCT.DESCRIPTION.QUOTE,
    },
    BACK_LINK,
    START_ROUTE: quoteStart,
    FEEDBACK_ROUTE: LINKS.EXTERNAL.FEEDBACK,
  }),
});

export default quoteCorePageVariables;
