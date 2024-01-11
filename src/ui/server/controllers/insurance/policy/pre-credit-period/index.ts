import { TEMPLATES } from '../../../../constants';
import { INSURANCE_ROUTES } from '../../../../constants/routes/insurance';
import POLICY_FIELD_IDS from '../../../../constants/field-ids/insurance/policy';
import { PAGES, PRE_CREDIT_PERIOD_DESCRIPTION as PRE_CREDIT_PERIOD_DESCRIPTION_STRINGS } from '../../../../content-strings';
import { POLICY_FIELDS as FIELDS } from '../../../../content-strings/fields/insurance';
import insuranceCorePageVariables from '../../../../helpers/page-variables/core/insurance';
import getUserNameFromSession from '../../../../helpers/get-user-name-from-session';
import constructPayload from '../../../../helpers/construct-payload';
import { sanitiseData } from '../../../../helpers/sanitise-data';
import generateValidationErrors from './validation';
import { Request, Response } from '../../../../../types';

const {
  INSURANCE_ROOT,
  POLICY: { PRE_CREDIT_PERIOD_SAVE_AND_BACK, BROKER_ROOT },
  PROBLEM_WITH_SERVICE,
} = INSURANCE_ROUTES;

const { NEED_PRE_CREDIT_PERIOD, PRE_CREDIT_PERIOD_DESCRIPTION } = POLICY_FIELD_IDS;

const {
  SHARED_PAGES,
  PARTIALS: {
    INSURANCE: { POLICY },
  },
} = TEMPLATES;

export const PAGE_CONTENT_STRINGS = {
  ...PAGES.INSURANCE.POLICY.PRE_CREDIT_PERIOD,
  HINT: FIELDS[NEED_PRE_CREDIT_PERIOD].HINT,
  PRE_CREDIT_PERIOD_DESCRIPTION: PRE_CREDIT_PERIOD_DESCRIPTION_STRINGS,
};

/**
 * pageVariables
 * Page fields and "save and go back" URL
 * @param {Number} Application reference number
 * @returns {Object} Page variables
 */
export const pageVariables = (referenceNumber: number) => ({
  FIELD_ID: NEED_PRE_CREDIT_PERIOD,
  FIELD_HINT: PAGE_CONTENT_STRINGS.HINT,
  FIELDS: {
    NEED_PRE_CREDIT_PERIOD: {
      ID: NEED_PRE_CREDIT_PERIOD,
      ...FIELDS[NEED_PRE_CREDIT_PERIOD],
    },
    PRE_CREDIT_PERIOD_DESCRIPTION: {
      ID: PRE_CREDIT_PERIOD_DESCRIPTION,
      ...FIELDS[PRE_CREDIT_PERIOD_DESCRIPTION],
    },
  },
  SAVE_AND_BACK_URL: `${INSURANCE_ROOT}/${referenceNumber}${PRE_CREDIT_PERIOD_SAVE_AND_BACK}`,
});

/**
 * HTML_FLAGS
 * Conditional flags for the nunjucks template to match design
 */
export const HTML_FLAGS = {
  HORIZONTAL_RADIOS: true,
  NO_RADIO_AS_FIRST_OPTION: true,
  CONDITIONAL_YES_HTML: POLICY.PRE_CREDIT_PERIOD.CUSTOM_CONTENT_HTML,
  CUSTOM_CONTENT_HTML: POLICY.PRE_CREDIT_PERIOD_DESCRIPTION.CUSTOM_CONTENT_HTML,
};

export const TEMPLATE = SHARED_PAGES.SINGLE_RADIO;

export const FIELD_IDS = [NEED_PRE_CREDIT_PERIOD, PRE_CREDIT_PERIOD_DESCRIPTION];

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

/**
 * post
 * Check Pre-credit period validation errors and if successful, redirect to the next part of the flow.
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
  const refNumber = Number(referenceNumber);

  const payload = constructPayload(req.body, FIELD_IDS);
  const sanitisedData = sanitiseData(payload);

  const validationErrors = generateValidationErrors(payload);

  if (validationErrors) {
    return res.render(TEMPLATE, {
      ...insuranceCorePageVariables({
        PAGE_CONTENT_STRINGS,
        BACK_LINK: req.headers.referer,
        HTML_FLAGS,
      }),
      ...pageVariables(refNumber),
      userName: getUserNameFromSession(req.session.user),
      application,
      submittedValues: sanitisedData,
      validationErrors,
    });
  }

  res.redirect(`${INSURANCE_ROOT}/${referenceNumber}${BROKER_ROOT}`);
};
