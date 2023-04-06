import { PAGES, PRODUCT } from '../../../content-strings';
import { ROUTES, TEMPLATES } from '../../../constants';
import { Request, Response } from '../../../../types';
import corePageVariables from '../../../helpers/page-variables/core';

const startRoute = ROUTES.QUOTE.START;

export const TEMPLATE = TEMPLATES.CONTACT_US;

export const get = (req: Request, res: Response) => {
  return res.render(TEMPLATE, {
    ...corePageVariables({
      PAGE_CONTENT_STRINGS: PAGES.CONTACT_US_PAGE,
      BACK_LINK: req.headers.referer,
      PRODUCT: { DESCRIPTION: PRODUCT.DESCRIPTION.GENERIC },
      START_ROUTE: startRoute,
    }),
  });
};
