import { PAGES } from '../../../../content-strings';
import { TEMPLATES } from '../../../../constants';
import { INSURANCE_ROUTES } from '../../../../constants/routes/insurance';
import generateEnterBrokerAddressManuallyUrl from '../../../../helpers/generate-enter-broker-address-manually-url';
import insuranceCorePageVariables from '../../../../helpers/page-variables/core/insurance';
import getUserNameFromSession from '../../../../helpers/get-user-name-from-session';
import isChangeRoute from '../../../../helpers/is-change-route';
import generateBrokerAddressInsetTextHtml from '../../../../helpers/generate-broker-address-inset-text-html';
import { Request, Response } from '../../../../../types';

const {
  INSURANCE_ROOT,
  ALL_SECTIONS,
  POLICY: { BROKER_DETAILS_ROOT, BROKER_DETAILS_CHANGE, LOSS_PAYEE_ROOT, CHECK_YOUR_ANSWERS },
  PROBLEM_WITH_SERVICE,
} = INSURANCE_ROUTES;

export const PAGE_CONTENT_STRINGS = PAGES.INSURANCE.POLICY.BROKER_CONFIRM_ADDRESS;

export const TEMPLATE = TEMPLATES.INSURANCE.POLICY.BROKER_CONFIRM_ADDRESS;

/**
 * pageVariables
 * "Use different address" and "Save and go back" URL
 * @param {Number} referenceNumber: Application reference number
 * @param {Boolean} isAChangeRoute: If the last part of a string/URL is 'change'
 * @returns {Object} Page variables
 */
export const pageVariables = (referenceNumber: number, isAChangeRoute: boolean) => {
  let useDifferentAddressUrl = `${INSURANCE_ROOT}/${referenceNumber}`;

  /**
   * If the route is a "change" route,
   * the "use different address" link/URL should link to the BROKER_DETAILS_CHANGE. Otherwise, BROKER_DETAILS.
   * Otherwise, during the "change your answers" journey, a user would not be immediately taken back to "check your answers"
   */
  if (isAChangeRoute) {
    useDifferentAddressUrl += BROKER_DETAILS_CHANGE;
  } else {
    useDifferentAddressUrl += BROKER_DETAILS_ROOT;
  }

  return {
    USE_DIFFERENT_ADDRESS_URL: useDifferentAddressUrl,
    ENTER_ADDRESS_MANUALLY_URL: generateEnterBrokerAddressManuallyUrl(referenceNumber, isAChangeRoute),
    SAVE_AND_BACK_URL: `${INSURANCE_ROOT}/${referenceNumber}${ALL_SECTIONS}`,
  };
};

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
    ...pageVariables(application.referenceNumber, isChangeRoute(req.originalUrl)),
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
