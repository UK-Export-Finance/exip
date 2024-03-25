import { TEMPLATES } from '../../../../constants';
import { INSURANCE_ROUTES } from '../../../../constants/routes/insurance';
import EXPORT_CONTRACT_FIELD_IDS from '../../../../constants/field-ids/insurance/export-contract';
import { PAGES } from '../../../../content-strings';
import { EXPORT_CONTRACT_FIELDS as FIELDS } from '../../../../content-strings/fields/insurance/export-contract';
import singleInputPageVariables from '../../../../helpers/page-variables/single-input/insurance';
import getUserNameFromSession from '../../../../helpers/get-user-name-from-session';
import mapApplicationToFormFields from '../../../../helpers/mappings/map-application-to-form-fields';
import { Request, Response } from '../../../../../types';

const {
  INSURANCE_ROOT,
  PROBLEM_WITH_SERVICE,
  EXPORT_CONTRACT: { CHECK_YOUR_ANSWERS },
} = INSURANCE_ROUTES;

const {
  HOW_WILL_YOU_GET_PAID: { PAYMENT_TERMS_DESCRIPTION },
} = EXPORT_CONTRACT_FIELD_IDS;

const {
  INSURANCE: {
    EXPORT_CONTRACT: { HOW_WILL_YOU_GET_PAID },
  },
} = TEMPLATES;

export const FIELD_ID = PAYMENT_TERMS_DESCRIPTION;

export const PAGE_CONTENT_STRINGS = PAGES.INSURANCE.EXPORT_CONTRACT.HOW_WILL_YOU_GET_PAID;

export const TEMPLATE = HOW_WILL_YOU_GET_PAID;

/**
 * pageVariables
 * Page fields and "save and go back" URL
 * @param {Number} Application reference number
 * @returns {Object} Page variables
 */
export const pageVariables = (referenceNumber: number) => ({
  FIELD: {
    ID: FIELD_ID,
    ...FIELDS.HOW_WILL_YOU_GET_PAID[FIELD_ID],
  },
  SAVE_AND_BACK_URL: `${INSURANCE_ROOT}/${referenceNumber}#`,
});

/**
 * get
 * Get the application and render the "How will you get paid" page
 * @param {Express.Request} Express request
 * @param {Express.Response} Express response
 * @returns {Express.Response.render} "How will you get paid" page
 */
export const get = (req: Request, res: Response) => {
  const { application } = res.locals;

  if (!application) {
    return res.redirect(PROBLEM_WITH_SERVICE);
  }

  const { referenceNumber } = req.params;
  const refNumber = Number(referenceNumber);

  return res.render(TEMPLATE, {
    ...singleInputPageVariables({ FIELD_ID, PAGE_CONTENT_STRINGS, BACK_LINK: req.headers.referer }),
    ...pageVariables(refNumber),
    userName: getUserNameFromSession(req.session.user),
    application: mapApplicationToFormFields(application),
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
