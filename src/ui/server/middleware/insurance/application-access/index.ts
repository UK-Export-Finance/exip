import { INSURANCE_ROUTES } from '../../../constants/routes/insurance';
import { Next, Request, Response } from '../../../../types';

const { PAGE_NOT_FOUND, ELIGIBILITY, ACCOUNT, DASHBOARD, NO_ACCESS_TO_APPLICATION } = INSURANCE_ROUTES;

export const IRRELEVANT_ROUTES = [
  PAGE_NOT_FOUND,
  ...Object.values(ELIGIBILITY),
  ...Object.values(ACCOUNT.CREATE),
  ...Object.values(ACCOUNT.SIGN_IN),
  ...Object.values(ACCOUNT.RESET_PASSWORD),
  DASHBOARD,
  NO_ACCESS_TO_APPLICATION,
];

export const applicationAccessMiddleware = async (req: Request, res: Response, next: Next) => {
  const { baseUrl: url } = req;

  const isIrrelevantRoute = (route: string) => IRRELEVANT_ROUTES.includes(route);

  // do not run any checks if the requested route is not an application route.
  if (isIrrelevantRoute(url)) {
    return next();
  }

  /**
   * If the session exporter/account ID matches the application's exporter/account id,
   * allow the user to view/access the application.
   * Otherwise, redirect to the "no access" page.
   */
  if (req.session.user && res.locals.application) {
    const { id: userId } = req.session.user;

    const { exporter } = res.locals.application;

    if (exporter && exporter.id === userId) {
      return next();
    }

    return res.redirect(NO_ACCESS_TO_APPLICATION);
  }

  return res.redirect(NO_ACCESS_TO_APPLICATION);
};

export default applicationAccessMiddleware;
