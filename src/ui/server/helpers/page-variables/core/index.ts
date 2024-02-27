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
import { ROUTES } from '../../../constants';
import isInsuranceRoute from '../../is-insurance-route';
import { CorePageVariablesInput, CorePageVariables } from '../../../../types';

const { THERE_IS_A_PROBLEM } = ERROR_MESSAGES;

/**
 * corePageVariables
 * Generate page variables required for every page
 * @param {Object} Page content strings bespoke to the page
 * @param {String} Link to the previous page
 * @param {String} Link to feedback
 * @param {String} ORIGINAL_URL for the page user is on
 * @returns {Object} Common page content strings
 */
const corePageVariables = ({ PAGE_CONTENT_STRINGS, BACK_LINK, ORIGINAL_URL, USE_GENERIC_HEADER }: CorePageVariablesInput): CorePageVariables => {
  /**
   * Check if the ORIGINAL_URL is an insurance route or not.
   * If insurance - ORIGINAL_URL contains "insurance".
   * Otherwise, ORIGINAL_URL is a "quote" route.
   */
  const insuranceRoute = isInsuranceRoute(ORIGINAL_URL);

  let COOKIES_ROUTE = ROUTES.COOKIES;
  let FEEDBACK_ROUTE = LINKS.EXTERNAL.FEEDBACK;
  let FOOTER = QUOTE_FOOTER;
  let PRODUCT = { DESCRIPTION: PRODUCT_CONTENT_STRINGS.DESCRIPTION.QUOTE };
  let START_ROUTE = ROUTES.QUOTE.START;

  if (USE_GENERIC_HEADER) {
    PRODUCT = { DESCRIPTION: PRODUCT_CONTENT_STRINGS.DESCRIPTION.GENERIC };
  }

  /**
   * If the route is an insurance route,
   * this sets the footer, product and start route to be insurance ones
   */
  if (insuranceRoute) {
    COOKIES_ROUTE = ROUTES.INSURANCE.COOKIES;
    FEEDBACK_ROUTE = ROUTES.INSURANCE.FEEDBACK;
    FOOTER = INSURANCE_FOOTER;
    PRODUCT = { DESCRIPTION: PRODUCT_CONTENT_STRINGS.DESCRIPTION.APPLICATION };
    START_ROUTE = ROUTES.INSURANCE.START;
  }

  return {
    CONTENT_STRINGS: {
      ...PAGE_CONTENT_STRINGS,
      BUTTONS,
      COOKIES_CONSENT,
      ERROR_MESSAGES: { THERE_IS_A_PROBLEM },
      FOOTER,
      HEADER,
      LINKS,
      PHASE_BANNER,
      PRODUCT,
    },
    BACK_LINK,
    COOKIES_ROUTE,
    FEEDBACK_ROUTE,
    START_ROUTE,
    DATA_CY: {
      HEADING: 'heading',
      BACK_LINK: 'back-link',
    },
  };
};

export default corePageVariables;
