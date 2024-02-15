import { PAGES } from '../../../../content-strings';
import { TEMPLATES } from '../../../../constants';
import { INSURANCE_ROUTES } from '../../../../constants/routes/insurance';
import POLICY_FIELD_IDS from '../../../../constants/field-ids/insurance/policy';
import insuranceCorePageVariables from '../../../../helpers/page-variables/core/insurance';
import getUserNameFromSession from '../../../../helpers/get-user-name-from-session';
import mapApplicationToFormFields from '../../../../helpers/mappings/map-application-to-form-fields';
import { Request, Response } from '../../../../../types';

const {
  BROKER_DETAILS: { FULL_ADDRESS },
} = POLICY_FIELD_IDS;

const {
  INSURANCE_ROOT,
  ALL_SECTIONS,
  POLICY: { BROKER_DETAILS_ROOT, CHECK_YOUR_ANSWERS },
  PROBLEM_WITH_SERVICE,
} = INSURANCE_ROUTES;

export const PAGE_CONTENT_STRINGS = PAGES.INSURANCE.POLICY.BROKER_CONFIRM_ADDRESS;

export const TEMPLATE = TEMPLATES.INSURANCE.POLICY.BROKER_CONFIRM_ADDRESS;

/**
 * pageVariables
 * "Use different address" and "Save and go back" URL
 * @param {Number} Application reference number
 * @returns {Object} Page variables
 */
export const pageVariables = (referenceNumber: number) => ({
  FIELD_ID: FULL_ADDRESS,
  USE_DIFFERENT_ADDRESS_URL: `${INSURANCE_ROOT}/${referenceNumber}${BROKER_DETAILS_ROOT}`,
  SAVE_AND_BACK_URL: `${INSURANCE_ROOT}/${referenceNumber}${ALL_SECTIONS}`,
});

/**
 * Render the Confirm broker address page
 * @param {Express.Request} Express request
 * @param {Express.Response} Express response
 * @returns {Express.Response.render} renders Confirm broker address page with previously submitted details
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
    ...pageVariables(application.referenceNumber),
    userName: getUserNameFromSession(req.session.user),
    application: mapApplicationToFormFields(application),
  });
};

/**
 * post
 * Redirect to the next part of the flow.
 * @param {Express.Request} Express request
 * @param {Express.Response} Express response
 * @returns {Express.Response.redirect} Next part of the flow
 */
export const post = (req: Request, res: Response) => {
  const { application } = res.locals;

  if (!application) {
    return res.redirect(PROBLEM_WITH_SERVICE);
  }

  const { referenceNumber } = application;

  return res.redirect(`${INSURANCE_ROOT}/${referenceNumber}${CHECK_YOUR_ANSWERS}`);
};
