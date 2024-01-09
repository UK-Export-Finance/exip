import {
  BUTTONS,
  COOKIES_CONSENT,
  ERROR_MESSAGES,
  HEADER,
  QUOTE_FOOTER,
  INSURANCE_FOOTER,
  PHASE_BANNER,
  LINKS,
  PRODUCT as PRODUCT_CONTENT_STRINGS,
} from '../../../content-strings';
import { CorePageVariablesInput, CorePageVariables } from '../../../../types';
import { ROUTES } from '../../../constants';
import isInsuranceRoute from '../../is-insurance-route';

const { THERE_IS_A_PROBLEM } = ERROR_MESSAGES;

/**
 * corePageVariables
 * Generate page variables required for every page
 * @param {Object} Page content strings bespoke to the page
 * @param {String} Link to the previous page
 * @param {String} Link to feedback
 * @param {String} ORIGINAL_URL for the page user is on
 * @param {String} USE_GENERIC_HEADER
 * @param {Object} HTML_FLAGS object containing HTML flags - CUSTOM_CONTENT_HTML, CONDITIONAL_YES/NO_HTML, HINT_HTML, LEGEND_CLASS, HORIZONTAL_RADIOS
 * @returns {Object} Common page content strings
 */
const corePageVariables = ({ PAGE_CONTENT_STRINGS, BACK_LINK, ORIGINAL_URL, USE_GENERIC_HEADER, HTML_FLAGS }: CorePageVariablesInput): CorePageVariables => {
  /**
   * checks if rhe ORIGINAL_URL is an insurance route or not
   * if insurance - either contains insurance or is undefined
   * if is not undefined and does not contain insurance, then is a quote route
   */
  const insuranceRoute = isInsuranceRoute(ORIGINAL_URL);

  let FOOTER = QUOTE_FOOTER;
  let PRODUCT = { DESCRIPTION: PRODUCT_CONTENT_STRINGS.DESCRIPTION.QUOTE };
  let START_ROUTE = ROUTES.QUOTE.START;
  let FEEDBACK_ROUTE = LINKS.EXTERNAL.FEEDBACK;

  if (USE_GENERIC_HEADER) {
    PRODUCT = { DESCRIPTION: PRODUCT_CONTENT_STRINGS.DESCRIPTION.GENERIC };
  }

  /**
   * If the route is an insurance route,
   * this sets the footer, product and start route to be insurance ones
   */
  if (insuranceRoute) {
    FOOTER = INSURANCE_FOOTER;
    PRODUCT = { DESCRIPTION: PRODUCT_CONTENT_STRINGS.DESCRIPTION.APPLICATION };
    START_ROUTE = ROUTES.INSURANCE.START;
    FEEDBACK_ROUTE = ROUTES.INSURANCE.FEEDBACK;
  }

  return {
    CONTENT_STRINGS: {
      ...PAGE_CONTENT_STRINGS,
      BUTTONS,
      COOKIES_CONSENT,
      ERROR_MESSAGES: { THERE_IS_A_PROBLEM },
      HEADER,
      FOOTER,
      LINKS,
      PHASE_BANNER,
      PRODUCT,
    },
    BACK_LINK,
    START_ROUTE,
    FEEDBACK_ROUTE,
    DATA_CY: {
      HEADING: 'heading',
      BACK_LINK: 'back-link',
    },
    ...HTML_FLAGS,
  };
};

export default corePageVariables;
