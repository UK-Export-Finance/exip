import { PAGES, PRODUCT, LINKS } from '../../../content-strings';
import { ROUTES, TEMPLATES } from '../../../constants';
import { Request, Response } from '../../../../types';
import corePageVariables from '../../../helpers/page-variables/core';

const startRoute = ROUTES.QUOTE.START;

export const TEMPLATE = TEMPLATES.CONTACT_US;

/**
 * gets the template for contact us page
 * @param {Express.Request} Express request
 * @param {Express.Response} Express response
 * @returns {Express.Response.render} renders contact us page
 */
export const get = (req: Request, res: Response) => {
  return res.render(TEMPLATE, {
    ...corePageVariables({
      PAGE_CONTENT_STRINGS: PAGES.CONTACT_US_PAGE,
      BACK_LINK: req.headers.referer,
      PRODUCT: { DESCRIPTION: PRODUCT.DESCRIPTION.GENERIC },
      START_ROUTE: startRoute,
      FEEDBACK: LINKS.EXTERNAL.FEEDBACK,
    }),
  });
};
