import { INSURANCE_ROUTES } from '../../../constants/routes/insurance';
import { APPLICATION } from '../../../constants';
import isSubmitYourApplicationRoute from './is-submit-your-application-route';
import canAccessSubmitYourApplicationRoutes from '../../../helpers/can-access-submit-your-application-routes';
import { Next, Request, Response } from '../../../../types';

const {
  APPLICATION_SUBMITTED,
  NO_ACCESS_TO_APPLICATION,
  NO_ACCESS_APPLICATION_SUBMITTED,
  INSURANCE_ROOT,
  COMPLETE_OTHER_SECTIONS,
  PROBLEM_WITH_SERVICE
} = INSURANCE_ROUTES;

/**
 * middleware to check if application is submitted
 * if submitted, access is not allowed to application apart from application submitted page
 * @param {Express.Request} Express request
 * @param {Express.Response} Express response
 * @param {Next}
 * @returns {Express.Response.redirect} redirects to no access page or next
 */
export const applicationStatusMiddleware = async (req: Request, res: Response, next: Next) => {
  try {
    const { baseUrl: url } = req;

    const isApplicationSubmittedRoute = (route: string) => route.includes(APPLICATION_SUBMITTED);

    // do not run any checks if the requested route is: APPLICATION_SUBMITTED
    if (isApplicationSubmittedRoute(url)) {
      return next();
    }

    if (res.locals.application) {
      const { application } = res.locals;
      const { referenceNumber } = application;

      /**
       * If the status is submitted,
       * do not allow the user to view/access the application and redirect to NO_ACCESS_APPLICATION_SUBMITTED.
       */
      if (application.status === APPLICATION.STATUS.SUBMITTED) {
        return res.redirect(NO_ACCESS_APPLICATION_SUBMITTED);
      }

      /**
       * If the status is abandoned,
       * do not allow the user to view/access the application and redirect to NO_ACCESS_TO_APPLICATION.
       */
      if (application.status === APPLICATION.STATUS.ABANDONED) {
        return res.redirect(NO_ACCESS_TO_APPLICATION);
      }

      /**
       * If the URL is a route in the "submit your application" group ("check your answers" or "declarations")
       * and required data for these routes is missing,
       * do not allow the user to view/access these routes and redirect to COMPLETE_OTHER_SECTIONS.
       */
      if (isSubmitYourApplicationRoute(url, referenceNumber) && !canAccessSubmitYourApplicationRoutes(application)) {
        return res.redirect(`${INSURANCE_ROOT}/${referenceNumber}${COMPLETE_OTHER_SECTIONS}`);
      }
    }

    return next();
  } catch (err) {
    console.error('Error with application status middleware %O', err);

    return res.redirect(PROBLEM_WITH_SERVICE);
  }
};

export default applicationStatusMiddleware;
