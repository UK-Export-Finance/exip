import { TEMPLATES } from '../../../../constants';
import { INSURANCE_ROUTES } from '../../../../constants/routes/insurance';
import { POLICY as POLICY_FIELD_IDS } from '../../../../constants/field-ids/insurance/policy';
import { PAGES } from '../../../../content-strings';
import { POLICY_FIELDS as FIELDS } from '../../../../content-strings/fields/insurance';
import insuranceCorePageVariables from '../../../../helpers/page-variables/core/insurance';
import getUserNameFromSession from '../../../../helpers/get-user-name-from-session';
import constructPayload from '../../../../helpers/construct-payload';
import generateValidationErrors from './validation';
import { Request, Response } from '../../../../../types';

const {
  INSURANCE_ROOT,
  POLICY: { BROKER_ROOT, OTHER_COMPANY_DETAILS_SAVE_AND_BACK },
  PROBLEM_WITH_SERVICE,
} = INSURANCE_ROUTES;

const {
  REQUESTED_JOINTLY_INSURED_PARTY: { COMPANY_NAME, COMPANY_NUMBER, COUNTRY },
} = POLICY_FIELD_IDS;

export const PAGE_CONTENT_STRINGS = PAGES.INSURANCE.POLICY.OTHER_COMPANY_DETAILS;

/**
 * pageVariables
 * Page fields and "save and go back" URL
 * @param {Number} Application reference number
 * @returns {Object} Page variables
 */
export const pageVariables = (referenceNumber: number) => ({
  FIELDS: {
    COMPANY_NAME: {
      ID: COMPANY_NAME,
      ...FIELDS.REQUESTED_JOINTLY_INSURED_PARTY[COMPANY_NAME],
    },
    COMPANY_NUMBER: {
      ID: COMPANY_NUMBER,
      ...FIELDS.REQUESTED_JOINTLY_INSURED_PARTY[COMPANY_NUMBER],
    },
    COUNTRY: {
      ID: COUNTRY,
      ...FIELDS.REQUESTED_JOINTLY_INSURED_PARTY[COUNTRY],
    },
  },
  SAVE_AND_BACK_URL: `${INSURANCE_ROOT}/${referenceNumber}${OTHER_COMPANY_DETAILS_SAVE_AND_BACK}`,
});

export const TEMPLATE = TEMPLATES.INSURANCE.POLICY.OTHER_COMPANY_DETAILS;

export const FIELD_IDS = [COMPANY_NAME, COMPANY_NUMBER, COUNTRY];

/**
 * get
 * Get the application and render the Policy - Other company details page
 * @param {Express.Request} Express request
 * @param {Express.Response} Express response
 * @returns {Express.Response.render} Policy - Other company details page
 */
export const get = (req: Request, res: Response) => {
  const { application } = res.locals;

  if (!application) {
    return res.redirect(PROBLEM_WITH_SERVICE);
  }

  return res.render(TEMPLATE, {
    ...insuranceCorePageVariables({
      PAGE_CONTENT_STRINGS,
      BACK_LINK: req.headers.referer,
    }),
    ...pageVariables,
    userName: getUserNameFromSession(req.session.user),
  });
};

/**
 * post
 * Check Policy - Other company details validation errors and if successful, redirect to the next part of the flow.
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

  const payload = constructPayload(req.body, FIELD_IDS);

  const validationErrors = generateValidationErrors(payload);

  if (validationErrors) {
    return res.render(TEMPLATE, {
      ...insuranceCorePageVariables({
        PAGE_CONTENT_STRINGS,
        BACK_LINK: req.headers.referer,
      }),
      ...pageVariables(application.referenceNumber),
      userName: getUserNameFromSession(req.session.user),
      submittedValues: payload,
      validationErrors,
    });
  }

  return res.redirect(`${INSURANCE_ROOT}/${referenceNumber}${BROKER_ROOT}`);
};
