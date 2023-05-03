import { INSURANCE_ROUTES } from '../../../constants/routes/insurance';
import { APPLICATION } from '../../../constants';
import isCheckYourAnswersRoute from './is-check-your-answers-route';
import canAccessCheckYourAnswersRoutes from '../../../helpers/can-access-check-your-answers-routes';
import { Next, Request, Response } from '../../../../types';

const { APPLICATION_SUBMITTED, NO_ACCESS_APPLICATION_SUBMITTED, INSURANCE_ROOT, COMPLETE_OTHER_SECTIONS } = INSURANCE_ROUTES;

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
     * If the URL is a "check your answers" route and required data for these routes is missing,
     * do not allow the user to view/access these routes and redirect to COMPLETE_OTHER_SECTIONS.
     */
    if (isCheckYourAnswersRoute(url, referenceNumber) && !canAccessCheckYourAnswersRoutes(application)) {
      return res.redirect(`${INSURANCE_ROOT}/${referenceNumber}${COMPLETE_OTHER_SECTIONS}`);
    }
  }

  return next();
};

export default applicationStatusMiddleware;
