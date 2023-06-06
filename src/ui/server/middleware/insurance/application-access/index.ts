import { INSURANCE_ROUTES } from '../../../constants/routes/insurance';
import { Next, Request, Response } from '../../../../types';

const { PAGE_NOT_FOUND, ELIGIBILITY, ACCOUNT, DASHBOARD, NO_ACCESS_TO_APPLICATION, NO_ACCESS_APPLICATION_SUBMITTED } = INSURANCE_ROUTES;

export const IRRELEVANT_ROUTES = [
  PAGE_NOT_FOUND,
  ...Object.values(ELIGIBILITY),
  ...Object.values(ACCOUNT.CREATE),
  ...Object.values(ACCOUNT.SIGN_IN),
  ...Object.values(ACCOUNT.PASSWORD_RESET),
  ...Object.values(ACCOUNT.SUSPENDED),
  DASHBOARD,
  NO_ACCESS_TO_APPLICATION,
  NO_ACCESS_APPLICATION_SUBMITTED,
];

export const applicationAccessMiddleware = async (req: Request, res: Response, next: Next) => {
  const { baseUrl: url } = req;

  const isIrrelevantRoute = (route: string) => IRRELEVANT_ROUTES.includes(route);

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
