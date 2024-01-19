import { TEMPLATES } from '../../../../constants';
import { INSURANCE_ROUTES } from '../../../../constants/routes/insurance';
import POLICY_FIELD_IDS from '../../../../constants/field-ids/insurance/policy';
import { PAGES } from '../../../../content-strings';
import { POLICY_FIELDS as FIELDS } from '../../../../content-strings/fields/insurance';
import insuranceCorePageVariables from '../../../../helpers/page-variables/core/insurance';
import getUserNameFromSession from '../../../../helpers/get-user-name-from-session';
import { Request, Response } from '../../../../../types';

const {
  INSURANCE_ROOT,
  POLICY: { BROKER_ROOT, ANOTHER_COMPANY_SAVE_AND_BACK },
  PROBLEM_WITH_SERVICE,
} = INSURANCE_ROUTES;

const { NEED_ANOTHER_COMPANY_TO_BE_INSURED } = POLICY_FIELD_IDS;

const { SHARED_PAGES } = TEMPLATES;

export const FIELD_ID = NEED_ANOTHER_COMPANY_TO_BE_INSURED;

export const PAGE_CONTENT_STRINGS = {
  ...PAGES.INSURANCE.POLICY.ANOTHER_COMPANY,
  HINT: FIELDS[NEED_ANOTHER_COMPANY_TO_BE_INSURED].HINT,
};

/**
 * pageVariables
 * Page fields and "save and go back" URL
 * @param {Number} Application reference number
 * @returns {Object} Page variables
 */
export const pageVariables = (referenceNumber: number) => ({
  FIELD_ID: NEED_ANOTHER_COMPANY_TO_BE_INSURED,
  FIELD_HINT: PAGE_CONTENT_STRINGS.HINT,
  SAVE_AND_BACK_URL: `${INSURANCE_ROOT}/${referenceNumber}${ANOTHER_COMPANY_SAVE_AND_BACK}`,
});

/**
 * HTML_FLAGS
 * Conditional flags for the nunjucks template to match design
 */
export const HTML_FLAGS = {
  HORIZONTAL_RADIOS: true,
  NO_RADIO_AS_FIRST_OPTION: true,
};

export const TEMPLATE = SHARED_PAGES.SINGLE_RADIO;

/**
 * get
 * Get the application and render the Policy - Another company page
 * @param {Express.Request} Express request
 * @param {Express.Response} Express response
 * @returns {Express.Response.render} Policy - Another company page
 */
export const get = (req: Request, res: Response) => {
  const { application } = res.locals;

  if (!application) {
    return res.redirect(PROBLEM_WITH_SERVICE);
  }

  const { referenceNumber } = req.params;
  const refNumber = Number(referenceNumber);

  return res.render(TEMPLATE, {
    ...insuranceCorePageVariables({
      PAGE_CONTENT_STRINGS,
      BACK_LINK: req.headers.referer,
      HTML_FLAGS,
    }),
    ...pageVariables(refNumber),
    userName: getUserNameFromSession(req.session.user),
  });
};

/**
 * post
 * Check Policy - Another company validation errors and if successful, redirect to the next part of the flow.
 * @param {Express.Request} Express request
 * @param {Express.Response} Express response
 * @returns {Express.Response.redirect} Next part of the flow or error page
 */
export const post = async (req: Request, res: Response) => {
  const { application } = res.locals;

  if (!application) {
    return res.redirect(PROBLEM_WITH_SERVICE);
  }

  const { referenceNumber } = req.params;

  return res.redirect(`${INSURANCE_ROOT}/${referenceNumber}${BROKER_ROOT}`);
};
