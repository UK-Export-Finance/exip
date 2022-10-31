import { PAGES } from '../../../../content-strings';
import { ROUTES, TEMPLATES } from '../../../../constants';
import corePageVariables from '../../../../helpers/core-page-variables';
import { Request, Response } from '../../../../../types';

const PAGE_VARIABLES = {
  PAGE_CONTENT_STRINGS: PAGES.INSURANCE.ELIGIBILITY.ELIGIBLE_TO_APPLY_ONLINE,
};

const get = (req: Request, res: Response) =>
  res.render(TEMPLATES.INSURANCE.ELIGIBILITY.ELIGIBLE_TO_APPLY_ONLINE, corePageVariables({ ...PAGE_VARIABLES, BACK_LINK: req.headers.referer }));

const post = (req: Request, res: Response) => res.redirect(ROUTES.INSURANCE.ELIGIBILITY.ALREADY_HAVE_ACCOUNT);

export { PAGE_VARIABLES, get, post };
