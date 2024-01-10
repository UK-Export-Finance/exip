import { TEMPLATES } from '../../../../constants';
import { INSURANCE_ROUTES } from '../../../../constants/routes/insurance';
import POLICY_FIELD_IDS from '../../../../constants/field-ids/insurance/policy';
import { PAGES, PRE_CREDIT_PERIOD_DESCRIPTION } from '../../../../content-strings';
import { POLICY_FIELDS as FIELDS } from '../../../../content-strings/fields/insurance';
import insuranceCorePageVariables from '../../../../helpers/page-variables/core/insurance';
import getUserNameFromSession from '../../../../helpers/get-user-name-from-session';
import { Request, Response } from '../../../../../types';

const {
  INSURANCE_ROOT,
  POLICY: { PRE_CREDIT_PERIOD_SAVE_AND_BACK },
  PROBLEM_WITH_SERVICE,
} = INSURANCE_ROUTES;

const { NEED_PRE_CREDIT_PERIOD } = POLICY_FIELD_IDS;

const {
  SHARED_PAGES,
  PARTIALS: {
    INSURANCE: {
      POLICY: { PRE_CREDIT_PERIOD },
    },
  },
} = TEMPLATES;

/**
 * pageVariables
 * Page fields and "save and go back" URL
 * @param {Number} Application reference number
 * @returns {Object} Page variables
 */
export const pageVariables = (referenceNumber: number) => ({
  FIELDS: {
    NEED_PRE_CREDIT_PERIOD: {
      ID: NEED_PRE_CREDIT_PERIOD,
      ...FIELDS[NEED_PRE_CREDIT_PERIOD],
    },
  },
  SAVE_AND_BACK_URL: `${INSURANCE_ROOT}/${referenceNumber}${PRE_CREDIT_PERIOD_SAVE_AND_BACK}`,
});

/**
 * HTML_FLAGS
 * Conditional flags for the nunjucks template to match design
 */
export const HTML_FLAGS = {
  CUSTOM_CONTENT_HTML: PRE_CREDIT_PERIOD.CUSTOM_CONTENT_HTML,
};

export const TEMPLATE = SHARED_PAGES.SINGLE_RADIO;

export const PAGE_CONTENT_STRINGS = {
  ...PAGES.INSURANCE.POLICY.PRE_CREDIT_PERIOD,
  PRE_CREDIT_PERIOD_DESCRIPTION,
};

/**
 * get
 * Get the application and render the Pre-credit period page
 * @param {Express.Request} Express request
 * @param {Express.Response} Express response
 * @returns {Express.Response.render} Pre-credit period page
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
    application,
  });
};
