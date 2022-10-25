import { PAGES } from '../../../content-strings';
import { ROUTES, TEMPLATES } from '../../../constants';
import corePageVariables from '../../../helpers/core-page-variables';
import { Request, Response } from '../../../../types';

export const get = (req: Request, res: Response) =>
  res.render(TEMPLATES.QUOTE.NEED_TO_START_AGAIN, corePageVariables({ PAGE_CONTENT_STRINGS: PAGES.QUOTE.NEED_TO_START_AGAIN, BACK_LINK: req.headers.referer }));

export const post = (req: Request, res: Response) => res.redirect(ROUTES.QUOTE.BUYER_COUNTRY);
