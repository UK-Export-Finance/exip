import { PAGES } from '../../../../content-strings';
import { TEMPLATES } from '../../../../constants';
import { Request, Response } from '../../../../../types';
import corePageVariables from '../../../../helpers/page-variables/core/insurance';
import getUserNameFromSession from '../../../../helpers/get-user-name-from-session';

export const TEMPLATE = TEMPLATES.INSURANCE.ELIGIBILITY.TALK_TO_AN_EXPORT_FINANCE_MANAGER_EXIT;

/**
 * get
 * Render the "Talk to an export finance manager" exit page
 * @param {Express.Request} Express request
 * @param {Express.Response} Express response
 * @returns {Express.Response.render} "Talk to an export finance manager" exit page
 */
export const get = (req: Request, res: Response) =>
  res.render(TEMPLATE, {
    ...corePageVariables({
      PAGE_CONTENT_STRINGS: PAGES.INSURANCE.ELIGIBILITY.TALK_TO_AN_EXPORT_FINANCE_MANAGER_EXIT,
      BACK_LINK: req.headers.referer,
    }),
    userName: getUserNameFromSession(req.session.user),
  });
