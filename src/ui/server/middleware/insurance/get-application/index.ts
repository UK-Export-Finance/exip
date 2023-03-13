import { INSURANCE_ROUTES } from '../../../constants/routes/insurance';
import { Next, Request, Response } from '../../../../types';
import getApplication from '../../../helpers/get-application';

const { ALL_SECTIONS, POLICY_AND_EXPORTS, EXPORTER_BUSINESS, YOUR_BUYER, PAGE_NOT_FOUND, CHECK_YOUR_ANSWERS } = INSURANCE_ROUTES;

/**
 * RELEVANT_ROUTES
 * Routes that need to GET and consume an application.
 * @returns {Array} Routes
 */
export const RELEVANT_ROUTES = [ALL_SECTIONS, POLICY_AND_EXPORTS.ROOT, EXPORTER_BUSINESS.ROOT, YOUR_BUYER.ROOT, CHECK_YOUR_ANSWERS.ROOT];

/**
 * getApplicationMiddleware
 * If the route is a relevant insurance route, get the application and add to res.locals
 * @param {Express.Request} Express request
 * @param {Express.Response} Express response
 * @returns {Express.Request.Next} request next or response redirect
 */
const getApplicationMiddleware = async (req: Request, res: Response, next: Next) => {
  const { originalUrl: url } = req;

  // This middleware only needs to be run if we're in an application route.
  // If we are on a route that does not require application data,
  // skip these checks by calling next(), so that the user flow continues.
  // Irrelevant route examples: eligibility, login, create account, problem with service.
  if (!RELEVANT_ROUTES.some((route) => url.includes(route))) {
    return next();
  }

  const { referenceNumber } = req.params;

  if (referenceNumber) {
    try {
      const application = await getApplication(Number(referenceNumber));

      if (application) {
        res.locals.application = application;
        return next();
      }

      return res.redirect(PAGE_NOT_FOUND);
    } catch (err) {
      console.error('Error getting application ', { err });

      return res.redirect(PAGE_NOT_FOUND);
    }
  }

  return res.redirect(PAGE_NOT_FOUND);
};

export default getApplicationMiddleware;
