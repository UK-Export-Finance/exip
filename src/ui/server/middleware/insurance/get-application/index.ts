import { INSURANCE_ROUTES } from '../../../constants/routes/insurance';
import { Next, Request, Response } from '../../../../types';
import getApplication from '../../../helpers/get-application';

const { ALL_SECTIONS, POLICY_AND_EXPORTS, EXPORTER_BUSINESS, YOUR_BUYER, PAGE_NOT_FOUND } = INSURANCE_ROUTES;

/**
 * RELEVANT_ROUTES
 * Routes that need to GET and consume an application.
 * @returns {Array} Routes
 */
export const RELEVANT_ROUTES = [ALL_SECTIONS, POLICY_AND_EXPORTS.ROOT, EXPORTER_BUSINESS.ROOT, YOUR_BUYER.ROOT];

/**
 * getApplicationMiddleware
 * If the route is a relevant insurance route, get the application and add to res.locals
 * @param {Express.Request} Express request
 * @param {Express.Response} Express response
 * @returns {Express.Request.Next} request next or response redirect
 */
const getApplicationMiddleware = async (req: Request, res: Response, next: Next) => {
  const { originalUrl: url } = req;

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
