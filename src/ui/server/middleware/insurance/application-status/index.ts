import { INSURANCE_ROUTES } from '../../../constants/routes/insurance';
import { APPLICATION } from '../../../constants';
import { Next, Request, Response } from '../../../../types';

const { APPLICATION_SUBMITTED, NO_ACCESS_APPLICATION_SUBMITTED } = INSURANCE_ROUTES;

/**
 * middleware to check if application is submitted
 * if submitted, access is not allowed to application apart from application submitted page
 * @param {Express.Request} Express request
 * @param {Express.Response} Express response
 * @param {Next}
 * @returns {Express.Response.redirect} redirects to no access page or next
 */
export const applicationStatusMiddleware = async (req: Request, res: Response, next: Next) => {
  const { baseUrl: url } = req;

  const isApplicationSubmittedRoute = (route: string) => route.includes(APPLICATION_SUBMITTED);

  // do not run any checks if the requested route is: APPLICATION_SUBMITTED
  if (isApplicationSubmittedRoute(url)) {
    return next();
  }

  /**
   * If the status is submitted,
   * dont allow the user to view/access the application and redirect to NO_ACCESS_APPLICATION_SUBMITTED.
   * Otherwise, redirect to the application.
   */
  if (res.locals.application) {
    const { application } = res.locals;

    if (application.status === APPLICATION.STATUS.SUBMITTED) {
      return res.redirect(NO_ACCESS_APPLICATION_SUBMITTED);
    }
  }

  return next();
};

export default applicationStatusMiddleware;
