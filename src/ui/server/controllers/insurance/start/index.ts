import { PAGES } from '../../../content-strings';
import { ROUTES, TEMPLATES } from '../../../constants';
import { Request, Response } from '../../../../types';
import corePageVariables from '../../../helpers/core-page-variables';

const get = (req: Request, res: Response) =>
  res.render(TEMPLATES.INSURANCE.START, {
    ...corePageVariables({
      PAGE_CONTENT_STRINGS: PAGES.INSURANCE.START,
      BACK_LINK: req.headers.referer,
    }),
  });

const post = (req: Request, res: Response) => {
  return res.redirect(ROUTES.INSURANCE.ELIGIBILITY.CHECK_IF_ELIGIBLE);
};

export { get, post };
