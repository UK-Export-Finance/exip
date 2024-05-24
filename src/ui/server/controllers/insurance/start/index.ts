import { PAGES } from '../../../content-strings';
import { ROUTES, TEMPLATES } from '../../../constants';
import insuranceCorePageVariables from '../../../helpers/page-variables/core/insurance';
import getUserNameFromSession from '../../../helpers/get-user-name-from-session';
import { Request, Response } from '../../../../types';

export const TEMPLATE = TEMPLATES.INSURANCE.START;

export const get = (req: Request, res: Response) => {
  // new insurance eligibility data in session
  req.session.submittedData = {
    ...req.session.submittedData,
    insuranceEligibility: {},
  };

  return res.render(TEMPLATE, {
    ...insuranceCorePageVariables({
      PAGE_CONTENT_STRINGS: PAGES.INSURANCE.START,
      BACK_LINK: req.headers.referer,
    }),
    userName: getUserNameFromSession(req.session.user),
  });
};

export const post = (req: Request, res: Response) => res.redirect(ROUTES.INSURANCE.ELIGIBILITY.CHECK_IF_ELIGIBLE);
