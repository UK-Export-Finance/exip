import { INSURANCE_ROUTES } from '../../../constants/routes/insurance';
import getApplicationByReferenceNumber from '../../../helpers/get-application-by-reference-number';
import getApplicationByReferenceNumberVariables from '../../../helpers/get-application-by-reference-number-variables';
import { Next, Request, Response } from '../../../../types';

const {
  ALL_SECTIONS,
  APPLICATION_SUBMITTED,
  CHECK_YOUR_ANSWERS: {
    TYPE_OF_POLICY: CHECK_YOUR_ANSWERS_APPLICATION_TYPE_OF_POLICY,
    YOUR_BUSINESS: CHECK_YOUR_ANSWERS_APPLICATION_YOUR_BUSINESS,
    YOUR_BUYER: CHECK_YOUR_ANSWERS_APPLICATION_YOUR_BUYER,
  },
  COMPLETE_OTHER_SECTIONS,
  DECLARATIONS,
  EXPORTER_BUSINESS,
  EXPORT_CONTRACT,
  PAGE_NOT_FOUND,
  POLICY,
  YOUR_BUYER,
} = INSURANCE_ROUTES;

/**
 * RELEVANT_ROUTES
 * Routes that need to GET and consume an application.
 * @returns {Array} Routes
 */
export const RELEVANT_ROUTES = [
  ALL_SECTIONS,
  EXPORTER_BUSINESS.ROOT,
  POLICY.ROOT,
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
 * getApplicationByReferenceNumberMiddleware
 * If the route is a relevant insurance route, get the application via getApplicationByReferenceNumber query and add to res.locals
 * @param {Express.Request} Express request
 * @param {Express.Response} Express response
 * @returns {Express.Request.Next} request next or response redirect
 */
const getApplicationByReferenceNumberMiddleware = async (req: Request, res: Response, next: Next) => {
  const { originalUrl: url } = req;

  /**
   * This middleware only needs to be run if we're in a routes which needs an application.
   * If we are on a route which does not require an application,
   * call next(), so that the user flow continues.
   * Irrelevant route examples: PAGE_NOT_FOUND, ACCESSIBILITY_STATEMENT
   */
  if (!RELEVANT_ROUTES.some((route) => url.includes(route))) {
    return next();
  }

  const { referenceNumber } = req.params;

  if (referenceNumber) {
    try {
      /**
       * generate variables for getting application,
       * Currently only used for decrypting certain pieces of data.
       */
      const variables = getApplicationByReferenceNumberVariables(referenceNumber, url);

      const application = await getApplicationByReferenceNumber(variables);

      if (application) {
        // TODO: unit test.
        res.locals.application = application;

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
