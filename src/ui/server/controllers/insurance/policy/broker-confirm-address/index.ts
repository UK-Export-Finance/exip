import { PAGES } from '../../../../content-strings';
import { TEMPLATES } from '../../../../constants';
import { INSURANCE_ROUTES } from '../../../../constants/routes/insurance';
import POLICY_FIELD_IDS from '../../../../constants/field-ids/insurance/policy';
import insuranceCorePageVariables from '../../../../helpers/page-variables/core/insurance';
import getUserNameFromSession from '../../../../helpers/get-user-name-from-session';
import replaceNewLineWithLineBreak from '../../../../helpers/replace-new-line-with-line-break';
import isChangeRoute from '../../../../helpers/is-change-route';
import { Request, Response } from '../../../../../types';

const {
  BROKER_MANUAL_ADDRESS: { FULL_ADDRESS: FIELD_ID },
} = POLICY_FIELD_IDS;

const {
  INSURANCE_ROOT,
  ALL_SECTIONS,
  POLICY: { BROKER_DETAILS_ROOT, BROKER_MANUAL_ADDRESS_ROOT, LOSS_PAYEE_ROOT, CHECK_YOUR_ANSWERS },
  PROBLEM_WITH_SERVICE,
} = INSURANCE_ROUTES;

export const PAGE_CONTENT_STRINGS = PAGES.INSURANCE.POLICY.BROKER_CONFIRM_ADDRESS;

export const TEMPLATE = TEMPLATES.INSURANCE.POLICY.BROKER_CONFIRM_ADDRESS;

/**
 * pageVariables
 * "Use different address" and "Save and go back" URL
 * @param {Number} referenceNumber: Application reference number
 * @returns {Object} Page variables
 */
export const pageVariables = (referenceNumber: number) => ({
  USE_DIFFERENT_ADDRESS_URL: `${INSURANCE_ROOT}/${referenceNumber}${BROKER_DETAILS_ROOT}`,
  ENTER_ADDRESS_MANUALLY_URL: `${INSURANCE_ROOT}/${referenceNumber}${BROKER_MANUAL_ADDRESS_ROOT}`,
  SAVE_AND_BACK_URL: `${INSURANCE_ROOT}/${referenceNumber}${ALL_SECTIONS}`,
});

/**
 * Render the Confirm broker address page
 * @param {Express.Request} Express request
 * @param {Express.Response} Express response
 * @returns {Express.Response.render} Confirm broker address page
 */
export const get = (req: Request, res: Response) => {
  const { application } = res.locals;

  if (!application) {
    return res.redirect(PROBLEM_WITH_SERVICE);
  }

  /**
   * Generate a submittedAnswer const
   * This is required because the address value is a single string with line break characters.
   * However, for this page, the address is rendered as pure HTML.
   * Therefore, we need to transform \r\n characters into <br />,
   * In order for the address to be rendered with multiple lines.
   */
  const submittedAnswer = replaceNewLineWithLineBreak(application.broker[FIELD_ID]);

  return res.render(TEMPLATE, {
    ...insuranceCorePageVariables({
      PAGE_CONTENT_STRINGS,
      BACK_LINK: req.headers.referer,
    }),
    ...pageVariables(application.referenceNumber),
    userName: getUserNameFromSession(req.session.user),
    submittedAnswer,
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

  if (isChangeRoute(req.originalUrl)) {
    return res.redirect(`${INSURANCE_ROOT}/${referenceNumber}${CHECK_YOUR_ANSWERS}`);
  }

  return res.redirect(`${INSURANCE_ROOT}/${referenceNumber}${LOSS_PAYEE_ROOT}`);
};
