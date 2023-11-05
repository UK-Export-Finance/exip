import { INSURANCE_ROUTES } from '../../../constants/routes/insurance';
import { Next, Request, Response } from '../../../../types';

const { PAGE_NOT_FOUND, ELIGIBILITY, ACCOUNT, NO_ACCESS_TO_APPLICATION, NO_ACCESS_APPLICATION_SUBMITTED, COOKIES, COOKIES_SAVED } = INSURANCE_ROUTES;
const { DASHBOARD, DASHBOARD_PAGE } = INSURANCE_ROUTES;

export const IRRELEVANT_ROUTES = [
  PAGE_NOT_FOUND,
  ...Object.values(ELIGIBILITY),
  ...Object.values(ACCOUNT.CREATE),
  ...Object.values(ACCOUNT.SIGN_IN),
  ...Object.values(ACCOUNT.PASSWORD_RESET),
  ...Object.values(ACCOUNT.SUSPENDED),
  ACCOUNT.REACTIVATED_ROOT,
  DASHBOARD,
  DASHBOARD_PAGE,
  NO_ACCESS_TO_APPLICATION,
  NO_ACCESS_APPLICATION_SUBMITTED,
  COOKIES,
  COOKIES_SAVED,
];

export const applicationAccessMiddleware = async (req: Request, res: Response, next: Next) => {
  const { baseUrl: url } = req;

  /**
   * No need to check individual application access if:
   * 1) The route is in IRRELEVANT_ROUTES.
   * 2) The route contains DASHBOARD_PAGE.
   */
  const isIrrelevantRoute = (route: string) => IRRELEVANT_ROUTES.includes(route) || url.includes(DASHBOARD_PAGE);

  if (isIrrelevantRoute(url)) {
    return next();
  }

  /**
   * If the session account ID matches the application's owner/account id,
   * allow the user to view/access the application.
   * Otherwise, redirect to the "no access" page.
   */
  if (req.session.user && res.locals.application) {
    const { application } = res.locals;

    const { id: userId } = req.session.user;

    const { owner } = application;

    if (owner && owner.id === userId) {
      return next();
    }

    return res.redirect(NO_ACCESS_TO_APPLICATION);
  }

  return res.redirect(NO_ACCESS_TO_APPLICATION);
};

export default applicationAccessMiddleware;
