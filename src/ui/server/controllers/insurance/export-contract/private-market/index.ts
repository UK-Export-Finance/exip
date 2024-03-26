import { TEMPLATES } from '../../../../constants';
import { INSURANCE_ROUTES } from '../../../../constants/routes/insurance';
import EXPORT_CONTRACT_FIELD_IDS from '../../../../constants/field-ids/insurance/export-contract';
import { PAGES, PRIVATE_MARKET_WHY_DESCRIPTION } from '../../../../content-strings';
import singleInputPageVariables from '../../../../helpers/page-variables/single-input/insurance';
import getUserNameFromSession from '../../../../helpers/get-user-name-from-session';
import mapApplicationToFormFields from '../../../../helpers/mappings/map-application-to-form-fields';
import { Request, Response } from '../../../../../types';

const {
  INSURANCE_ROOT,
  EXPORT_CONTRACT: { CHECK_YOUR_ANSWERS },
  PROBLEM_WITH_SERVICE,
} = INSURANCE_ROUTES;

const {
  PRIVATE_MARKET: { ATTEMPTED },
} = EXPORT_CONTRACT_FIELD_IDS;

const {
  PARTIALS: {
    INSURANCE: { EXPORT_CONTRACT },
  },
} = TEMPLATES;

export const FIELD_ID = ATTEMPTED;

export const PAGE_CONTENT_STRINGS = {
  ...PAGES.INSURANCE.EXPORT_CONTRACT.PRIVATE_MARKET,
  PRIVATE_MARKET_WHY_DESCRIPTION,
};

export const TEMPLATE = TEMPLATES.SHARED_PAGES.SINGLE_RADIO;

/**
 * HTML_FLAGS
 * Conditional flags for the nunjucks template to match design
 */
export const HTML_FLAGS = {
  HORIZONTAL_RADIOS: true,
  NO_RADIO_AS_FIRST_OPTION: true,
  CUSTOM_CONTENT_HTML: EXPORT_CONTRACT.PRIVATE_MARKET.CUSTOM_CONTENT_HTML,
};

/**
 * pageVariables
 * Page fields and "save and go back" URL
 * @param {Number} Application reference number
 * @returns {Object} Page variables
 */
export const pageVariables = (referenceNumber: number) => ({
  FIELD_ID,
  SAVE_AND_BACK_URL: `${INSURANCE_ROOT}/${referenceNumber}#`,
});

/**
 * get
 * Get the application and render the "Private market" page
 * @param {Express.Request} Express request
 * @param {Express.Response} Express response
 * @returns {Express.Response.render} "Private market" page
 */
export const get = (req: Request, res: Response) => {
  const { application } = res.locals;

  if (!application) {
    return res.redirect(PROBLEM_WITH_SERVICE);
  }

  const { referenceNumber } = req.params;
  const refNumber = Number(referenceNumber);

  return res.render(TEMPLATE, {
    ...singleInputPageVariables({ FIELD_ID, PAGE_CONTENT_STRINGS, BACK_LINK: req.headers.referer, HTML_FLAGS }),
    ...pageVariables(refNumber),
    userName: getUserNameFromSession(req.session.user),
    application: mapApplicationToFormFields(application),
    FIELD_HINT: PAGE_CONTENT_STRINGS.HINT,
  });
};

/**
 * post
 * Redirect to the next part of the flow.
 * @param {Express.Request} Express request
 * @param {Express.Response} Express response
 * @returns {Express.Response.redirect} Next part of the flow or error page
 */
export const post = (req: Request, res: Response) => {
  const { application } = res.locals;

  if (!application) {
    return res.redirect(PROBLEM_WITH_SERVICE);
  }

  const { referenceNumber } = req.params;

  return res.redirect(`${INSURANCE_ROOT}/${referenceNumber}${CHECK_YOUR_ANSWERS}`);
};
