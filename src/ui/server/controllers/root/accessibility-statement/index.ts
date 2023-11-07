import { PAGES } from '../../../content-strings';
import { TEMPLATES } from '../../../constants';
import corePageVariables from '../../../helpers/page-variables/core/quote';
import getUserNameFromSession from '../../../helpers/get-user-name-from-session';
import { Request, Response } from '../../../../types';

/**
 * get
 * Render the Quote Accessibility statement page
 * @param {Express.Request} Express request
 * @param {Express.Response} Express response
 * @returns {Express.Response.render} Quote Accessibility statement page
 */
export const get = (req: Request, res: Response) =>
  res.render(TEMPLATES.ACCESSIBILITY_STATEMENT, {
    ...corePageVariables({
      PAGE_CONTENT_STRINGS: PAGES.ACCESSIBILITY_STATEMENT_PAGE,
      BACK_LINK: req.headers.referer,
      ORIGINAL_URL: req.originalUrl,
    }),
    userName: getUserNameFromSession(req.session.user),
  });
