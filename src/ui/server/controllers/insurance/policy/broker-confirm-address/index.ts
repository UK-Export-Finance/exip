import { PAGES } from '../../../../content-strings';
import { TEMPLATES } from '../../../../constants';
import { INSURANCE_ROUTES } from '../../../../constants/routes/insurance';
import generateUseDifferentBrokerAddressUrl from '../../../../helpers/generate-use-different-broker-address-url';
import generateEnterBrokerAddressManuallyUrl from '../../../../helpers/generate-enter-broker-address-manually-url';
import insuranceCorePageVariables from '../../../../helpers/page-variables/core/insurance';
import getUserNameFromSession from '../../../../helpers/get-user-name-from-session';
import isChangeRoute from '../../../../helpers/is-change-route';
import isCheckAndChangeRoute from '../../../../helpers/is-check-and-change-route';
import generateBrokerAddressInsetTextHtml from '../../../../helpers/generate-broker-address-inset-text-html';
import { Request, ResponseInsurance } from '../../../../../types';

const {
  INSURANCE_ROOT,
  ALL_SECTIONS,
  POLICY: { BROKER_DETAILS_ROOT, LOSS_PAYEE_ROOT, CHECK_YOUR_ANSWERS },
  CHECK_YOUR_ANSWERS: { TYPE_OF_POLICY: CHECK_AND_CHANGE_ROUTE },
  PROBLEM_WITH_SERVICE,
} = INSURANCE_ROUTES;

export const PAGE_CONTENT_STRINGS = PAGES.INSURANCE.POLICY.BROKER_CONFIRM_ADDRESS;

export const TEMPLATE = TEMPLATES.INSURANCE.POLICY.BROKER_CONFIRM_ADDRESS;

/**
 * pageVariables
 * "Use different address" and "Save and go back" URL
 * @param {number} referenceNumber: Application reference number
 * @param {boolean} isAChangeRoute: If the last part of a string/URL is 'change'
 * @param {boolean} isACheckAndChangeRoute: If the last part of a string/URL is 'check-and-change'
 * @returns {object} Page variables
 */
export const pageVariables = (referenceNumber: number, isAChangeRoute: boolean, isACheckAndChangeRoute: boolean) => ({
  USE_DIFFERENT_ADDRESS_URL: generateUseDifferentBrokerAddressUrl(referenceNumber, isAChangeRoute, isACheckAndChangeRoute),
  ENTER_ADDRESS_MANUALLY_URL: generateEnterBrokerAddressManuallyUrl(referenceNumber, isAChangeRoute, isACheckAndChangeRoute),
  SAVE_AND_BACK_URL: `${INSURANCE_ROOT}/${referenceNumber}${ALL_SECTIONS}`,
});

/**
 * Render the Confirm broker address page
 * @param {Express.Request} Express request
 * @param {ResponseInsurance} Express response for "insurance" routes
 * @returns {Express.Response.render} Confirm broker address page
 */
export const get = (req: Request, res: ResponseInsurance) => {
  const { application } = res.locals;

  if (!application) {
    return res.redirect(PROBLEM_WITH_SERVICE);
  }

  const { broker, referenceNumber } = application;
  const { postcode, buildingNumberOrName, fullAddress } = broker;

  /**
   * If a user manually navigates to this route,
   * without providing previously required address data
   * redirect the user back to BROKER_DETAILS,
   * where the data can be submitted.
   * NOTE: the required data is either address lookup fields, or a manual address entry field.
   */
  const hasAddressLookupFields = postcode && buildingNumberOrName;

  if (!hasAddressLookupFields && !fullAddress) {
    return res.redirect(`${INSURANCE_ROOT}/${referenceNumber}${BROKER_DETAILS_ROOT}`);
  }

  const submittedAnswer = generateBrokerAddressInsetTextHtml(application.broker);

  return res.render(TEMPLATE, {
    ...insuranceCorePageVariables({
      PAGE_CONTENT_STRINGS,
      BACK_LINK: req.headers.referer,
    }),
    ...pageVariables(application.referenceNumber, isChangeRoute(req.originalUrl), isCheckAndChangeRoute(req.originalUrl)),
    userName: getUserNameFromSession(req.session.user),
    submittedAnswer,
  });
};

/**
 * post
 * Redirect to the next part of the flow.
 * @param {Express.Request} Express request
 * @param {ResponseInsurance} Express response for "insurance" routes
 * @returns {Express.Response.redirect} Next part of the flow
 */
export const post = (req: Request, res: ResponseInsurance) => {
  const { application } = res.locals;

  if (!application) {
    return res.redirect(PROBLEM_WITH_SERVICE);
  }

  const { referenceNumber } = application;

  if (isChangeRoute(req.originalUrl)) {
    return res.redirect(`${INSURANCE_ROOT}/${referenceNumber}${CHECK_YOUR_ANSWERS}`);
  }

  if (isCheckAndChangeRoute(req.originalUrl)) {
    return res.redirect(`${INSURANCE_ROOT}/${referenceNumber}${CHECK_AND_CHANGE_ROUTE}`);
  }

  return res.redirect(`${INSURANCE_ROOT}/${referenceNumber}${LOSS_PAYEE_ROOT}`);
};
