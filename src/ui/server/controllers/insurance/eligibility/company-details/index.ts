import { TEMPLATES } from '../../../../constants';
import { PAGES } from '../../../../content-strings';
import { INSURANCE_ROUTES } from '../../../../constants/routes/insurance';
import insuranceCorePageVariables from '../../../../helpers/page-variables/core/insurance';
import getUserNameFromSession from '../../../../helpers/get-user-name-from-session';
import { Request, Response } from '../../../../../types';

const {
  ELIGIBILITY: { BUYER_COUNTRY },
} = INSURANCE_ROUTES;

export const TEMPLATE = TEMPLATES.INSURANCE.ELIGIBILITY.COMPANY_DETAILS;

export const PAGE_CONTENT_STRINGS = PAGES.INSURANCE.ELIGIBILITY.COMPANY_DETAILS;

export const get = (req: Request, res: Response) =>
  res.render(TEMPLATE, {
    ...insuranceCorePageVariables({
      PAGE_CONTENT_STRINGS,
      BACK_LINK: req.headers.referer,
    }),
    userName: getUserNameFromSession(req.session.user),
  });

export const post = (req: Request, res: Response) => res.redirect(BUYER_COUNTRY);
