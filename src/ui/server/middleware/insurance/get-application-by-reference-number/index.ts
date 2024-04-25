import { INSURANCE_ROUTES } from '../../../constants/routes/insurance';
import getApplicationByReferenceNumber from '../../../helpers/get-application-by-reference-number';
import mapTotalContractValueOverThreshold from '../map-total-contract-value-over-threshold';
import getApplicationByReferenceNumberVariables from '../../../helpers/get-application-by-reference-number-variables';
import { Next, Request, Response } from '../../../../types';

const { PAGE_NOT_FOUND } = INSURANCE_ROUTES;

const { POLICY } = INSURANCE_ROUTES;
const {
  CHECK_YOUR_ANSWERS: { TYPE_OF_POLICY: CHECK_YOUR_ANSWERS_APPLICATION_TYPE_OF_POLICY },
} = INSURANCE_ROUTES;

/**
 * RELEVANT_ROUTES
 * Routes that need to GET and consume an application.
 * @returns {Array} Routes
 */
export const RELEVANT_ROUTES = [
  POLICY.LOSS_PAYEE_FINANCIAL_DETAILS_UK_ROOT,
  POLICY.LOSS_PAYEE_FINANCIAL_DETAILS_UK_CHANGE,
  POLICY.LOSS_PAYEE_FINANCIAL_DETAILS_UK_CHECK_AND_CHANGE,
  POLICY.LOSS_PAYEE_FINANCIAL_DETAILS_INTERNATIONAL_ROOT,
  POLICY.LOSS_PAYEE_FINANCIAL_DETAILS_INTERNATIONAL_CHANGE,
  POLICY.LOSS_PAYEE_FINANCIAL_DETAILS_INTERNATIONAL_CHECK_AND_CHANGE,
  POLICY.CHECK_YOUR_ANSWERS,
  CHECK_YOUR_ANSWERS_APPLICATION_TYPE_OF_POLICY,
];

/**
 * getApplicationByReferenceNumberMiddleware
 * If the route is a relevant insurance route, get the application via getApplicationByReferenceNumber query and add to res.locals
 * @param {Express.Request} Express request
 * @param {Express.Response} Express response
 * @returns {Express.Request.Next} request next or response redirect
 */
const getApplicationByReferenceNumberMiddleware = async (req: Request, res: Response, next: Next) => {
  const { originalUrl: url } = req;

  /**
   * This middleware only needs to be run if we're in routes which need decryption.
   * If we are on a route which does not need decryption,
   * skip these checks by calling next(), so that the user flow continues.
   * Irrelevant route examples: all routes apart from POLICY financial details.
   */
  if (!RELEVANT_ROUTES.some((route) => url.includes(route))) {
    return next();
  }

  const { referenceNumber } = req.params;

  if (referenceNumber) {
    try {
      // generate variables for getting application, such as decryptFinancialUk
      const variables = getApplicationByReferenceNumberVariables(referenceNumber, url);

      const application = await getApplicationByReferenceNumber(variables);

      if (application) {
        // maps and adds totalContractValueOverThreshold to application
        res.locals.application = mapTotalContractValueOverThreshold(application);
        return next();
      }

      return res.redirect(PAGE_NOT_FOUND);
    } catch (err) {
      console.error('Error getting application by reference number %O', err);

      return res.redirect(PAGE_NOT_FOUND);
    }
  }

  return res.redirect(PAGE_NOT_FOUND);
};

export default getApplicationByReferenceNumberMiddleware;
