import { PAGES } from '../../../../content-strings';
import { ROUTES, TEMPLATES } from '../../../../constants';
import { Request, Response } from '../../../../../types';
import corePageVariables from '../../../../helpers/page-variables/core/insurance';

const get = (req: Request, res: Response) =>
  res.render(TEMPLATES.INSURANCE.ELIGIBILITY.CHECK_IF_ELIGIBLE, {
    ...corePageVariables({
      PAGE_CONTENT_STRINGS: PAGES.INSURANCE.ELIGIBILITY.CHECK_IF_ELIGIBLE,
      BACK_LINK: req.headers.referer,
    }),
  });

const post = (req: Request, res: Response) => {
  return res.redirect(ROUTES.INSURANCE.ELIGIBILITY.BUYER_COUNTRY);
};

export { get, post };
