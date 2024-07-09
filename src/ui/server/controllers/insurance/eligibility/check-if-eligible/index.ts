import { PAGES } from '../../../../content-strings';
import { ROUTES, TEMPLATES } from '../../../../constants';
import { Request, Response } from '../../../../../types';
import corePageVariables from '../../../../helpers/page-variables/core/insurance';
import getUserNameFromSession from '../../../../helpers/get-user-name-from-session';

export const TEMPLATE = TEMPLATES.INSURANCE.ELIGIBILITY.CHECK_IF_ELIGIBLE;

export const get = (req: Request, res: Response) => {
  /**
   * Create a new session,
   * with empty eligibility answers.
   */
  req.session.submittedData = {
    ...req.session.submittedData,
    insuranceEligibility: {},
  };

  return res.render(TEMPLATE, {
    ...corePageVariables({
      PAGE_CONTENT_STRINGS: PAGES.INSURANCE.ELIGIBILITY.CHECK_IF_ELIGIBLE,
      BACK_LINK: req.headers.referer,
    }),
    userName: getUserNameFromSession(req.session.user),
  });
};

export const post = (req: Request, res: Response) => res.redirect(ROUTES.INSURANCE.ELIGIBILITY.EXPORTER_LOCATION);
