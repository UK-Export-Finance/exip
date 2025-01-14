import { PAGES } from '../../../content-strings';
import { TEMPLATES } from '../../../constants';
import corePageVariables from '../../../helpers/page-variables/core/quote';
import getUserNameFromSession from '../../../helpers/get-user-name-from-session';
import { Request, Response } from '../../../../types';

export const TEMPLATE = TEMPLATES.TALK_TO_AN_EXPORT_FINANCE_MANAGER_EXIT;

/**
 * get
 * Render the "Quote - Talk to an export finance manager" exit page
 * @param {Express.Request} Express request
 * @param {Express.Response} Express response
 * @returns {Express.Response.render} "Talk to an export finance manager" exit page
 */
export const get = (req: Request, res: Response) => {
  res.render(TEMPLATE, {
    ...corePageVariables({ PAGE_CONTENT_STRINGS: PAGES.TALK_TO_AN_EXPORT_FINANCE_MANAGER_EXIT, BACK_LINK: req.headers.referer, ORIGINAL_URL: req.originalUrl }),
    userName: getUserNameFromSession(req.session.user),
  });
};
