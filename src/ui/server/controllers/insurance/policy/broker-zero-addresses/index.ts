import { PAGES } from '../../../../content-strings';
import { TEMPLATES } from '../../../../constants';
import { INSURANCE_ROUTES } from '../../../../constants/routes/insurance';
import insuranceCorePageVariables from '../../../../helpers/page-variables/core/insurance';
import getUserNameFromSession from '../../../../helpers/get-user-name-from-session';
import { Request, ResponseInsurance } from '../../../../../types';

const {
  INSURANCE_ROOT,
  PROBLEM_WITH_SERVICE,
  POLICY: { BROKER_DETAILS_ROOT, BROKER_MANUAL_ADDRESS_ROOT },
} = INSURANCE_ROUTES;

export const PAGE_CONTENT_STRINGS = PAGES.INSURANCE.POLICY.BROKER_ZERO_ADDRESSES;

export const TEMPLATE = TEMPLATES.INSURANCE.POLICY.BROKER_ZERO_ADDRESSES;

/**
 * pageVariables
 * Page fields and "save and go back" URL
 * @param {number} referenceNumber: Application reference number
 * @returns {object} Page variables
 */
export const pageVariables = (referenceNumber: number) => ({
  SEARCH_AGAIN_URL: `${INSURANCE_ROOT}/${referenceNumber}${BROKER_DETAILS_ROOT}`,
  ENTER_MANUALLY_URL: `${INSURANCE_ROOT}/${referenceNumber}${BROKER_MANUAL_ADDRESS_ROOT}`,
});

/**
 * Render the Broker - zero addresses found page
 * @param {Express.Request} Express request
 * @param {ResponseInsurance} Express response for "insurance" routes
 * @returns {Express.Response.render} Broker - zero addresses found page
 */
export const get = (req: Request, res: ResponseInsurance) => {
  try {
    const { application } = res.locals;

    if (!application) {
      return res.redirect(PROBLEM_WITH_SERVICE);
    }

    const {
      broker: { postcode, buildingNumberOrName },
    } = application;

    return res.render(TEMPLATE, {
      ...insuranceCorePageVariables({
        PAGE_CONTENT_STRINGS,
        BACK_LINK: req.headers.referer,
      }),
      ...pageVariables(application.referenceNumber),
      userName: getUserNameFromSession(req.session.user),
      postcode,
      buildingNumberOrName,
    });
  } catch (error) {
    console.error('Error getting broker zero addresses %o', error);

    return res.redirect(PROBLEM_WITH_SERVICE);
  }
};
