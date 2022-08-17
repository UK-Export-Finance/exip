import { FOOTER, LINKS, PAGES, PRODUCT } from '../../content-strings';
import { ROUTES, TEMPLATES } from '../../constants';
import { Request, Response } from '../../../types';

export const get = (req: Request, res: Response) =>
  res.render(TEMPLATES.NEED_TO_START_AGAIN, {
    CONTENT_STRINGS: {
      LINKS,
      PRODUCT,
      FOOTER,
      ...PAGES.NEED_TO_START_AGAIN,
    },
  });

export const post = (req: Request, res: Response) => res.redirect(ROUTES.BUYER_COUNTRY);
