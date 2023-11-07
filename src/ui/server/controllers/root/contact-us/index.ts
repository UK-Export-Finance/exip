import { PAGES } from '../../../content-strings';
import { TEMPLATES } from '../../../constants';
import { Request, Response } from '../../../../types';
import corePageVariables from '../../../helpers/page-variables/core';
import getUserNameFromSession from '../../../helpers/get-user-name-from-session';

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
      ORIGINAL_URL: req.originalUrl,
    }),
    userName: getUserNameFromSession(req.session.user),
  });
};
