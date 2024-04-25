import { INSURANCE_ROUTES } from '../../../constants/routes/insurance';
import getApplication from '../../../helpers/get-application';
import mapTotalContractValueOverThreshold from '../map-total-contract-value-over-threshold';
import { Next, Request, Response } from '../../../../types';

const { PAGE_NOT_FOUND } = INSURANCE_ROUTES;

const { ALL_SECTIONS, POLICY, EXPORTER_BUSINESS, YOUR_BUYER, EXPORT_CONTRACT } = INSURANCE_ROUTES;
const {
  COMPLETE_OTHER_SECTIONS,
  CHECK_YOUR_ANSWERS: {
    TYPE_OF_POLICY: CHECK_YOUR_ANSWERS_APPLICATION_TYPE_OF_POLICY,
    YOUR_BUSINESS: CHECK_YOUR_ANSWERS_APPLICATION_YOUR_BUSINESS,
    YOUR_BUYER: CHECK_YOUR_ANSWERS_APPLICATION_YOUR_BUYER,
  },
  DECLARATIONS,
  APPLICATION_SUBMITTED,
} = INSURANCE_ROUTES;

// routes in policy that require a get-application-by-reference-number middleware
const {
  ROOT,
  LOSS_PAYEE_ROOT,
  LOSS_PAYEE_CHANGE,
  LOSS_PAYEE_CHECK_AND_CHANGE,
  LOSS_PAYEE_FINANCIAL_DETAILS_UK_ROOT,
  LOSS_PAYEE_FINANCIAL_DETAILS_UK_CHANGE,
  LOSS_PAYEE_FINANCIAL_DETAILS_UK_CHECK_AND_CHANGE,
  LOSS_PAYEE_FINANCIAL_DETAILS_INTERNATIONAL_ROOT,
  LOSS_PAYEE_FINANCIAL_DETAILS_INTERNATIONAL_CHANGE,
  LOSS_PAYEE_FINANCIAL_DETAILS_INTERNATIONAL_CHECK_AND_CHANGE,
  CHECK_YOUR_ANSWERS,
  ...POLICY_ROUTES
} = POLICY;

/**
 * RELEVANT_ROUTES
 * Routes that need to GET and consume an application.
 * @returns {Array} Routes
 */
export const RELEVANT_ROUTES = [
  ALL_SECTIONS,
  // remaining policy routes which do not require get-application-by-reference-number middleware
  ...Object.values(POLICY_ROUTES),
  EXPORTER_BUSINESS.ROOT,
  YOUR_BUYER.ROOT,
  EXPORT_CONTRACT.ROOT,
  DECLARATIONS.ROOT,
  CHECK_YOUR_ANSWERS_APPLICATION_TYPE_OF_POLICY,
  CHECK_YOUR_ANSWERS_APPLICATION_YOUR_BUSINESS,
  CHECK_YOUR_ANSWERS_APPLICATION_YOUR_BUYER,
  COMPLETE_OTHER_SECTIONS,
  APPLICATION_SUBMITTED,
];

/**
 * getApplicationMiddleware
 * If the route is a relevant insurance route, get the application and add to res.locals
 * @param {Express.Request} Express request
 * @param {Express.Response} Express response
 * @returns {Express.Request.Next} request next or response redirect
 */
const getApplicationMiddleware = async (req: Request, res: Response, next: Next) => {
  const { originalUrl: url } = req;

  /**
   * This middleware only needs to be run if we're in an application route.
   * If we are on a route that does not require application data,
   * skip these checks by calling next(), so that the user flow continues.
   * Irrelevant route examples: eligibility, login, create account, problem with service.
   */
  if (!RELEVANT_ROUTES.some((route) => url.includes(route))) {
    return next();
  }

  const { referenceNumber } = req.params;

  if (referenceNumber) {
    try {
      const application = await getApplication(Number(referenceNumber));

      if (application) {
        // maps and adds totalContractValueOverThreshold to application
        res.locals.application = mapTotalContractValueOverThreshold(application);

        return next();
      }

      return res.redirect(PAGE_NOT_FOUND);
    } catch (err) {
      console.error('Error getting application %O', err);

      return res.redirect(PAGE_NOT_FOUND);
    }
  }

  return res.redirect(PAGE_NOT_FOUND);
};

export default getApplicationMiddleware;
