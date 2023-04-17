import { PRODUCT } from '../../../../content-strings';
import { ROUTES } from '../../../../constants';
import { CorePageVariablesInitialInput, CorePageVariables } from '../../../../../types';
import corePageVariables from '..';

const { START: startRoute, FEEDBACK: feedbackRoute } = ROUTES.INSURANCE;

/**
 * insuranceCorePageVariables
 * Generate page variables required for every insurance page
 * @param {Object} Page content strings bespoke to the page
 * @param {String} Link to the previous page
 * @returns {Object} Common page content strings
 */
const insuranceCorePageVariables = ({ PAGE_CONTENT_STRINGS, BACK_LINK }: CorePageVariablesInitialInput): CorePageVariables => ({
  ...corePageVariables({
    PAGE_CONTENT_STRINGS,
    PRODUCT: {
      ...PRODUCT,
      DESCRIPTION: PRODUCT.DESCRIPTION.APPLICATION,
    },
    BACK_LINK,
    START_ROUTE: startRoute,
    FEEDBACK_ROUTE: feedbackRoute,
  }),
});

export default insuranceCorePageVariables;
