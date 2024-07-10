import { PAGES } from '../../../../content-strings';
import { TEMPLATES } from '../../../../constants';
import { Request, Response } from '../../../../../types';
import corePageVariables from '../../../../helpers/page-variables/core/insurance';
import getUserNameFromSession from '../../../../helpers/get-user-name-from-session';

export const TEMPLATE = TEMPLATES.CANNOT_APPLY;

/**
 * get
 * Render the "Cannot apply" exit page
 * @param {Express.Request} Express request
 * @param {Express.Response} Express response
 * @returns {Express.Response.render} "Cannot apply" exit page
 */
export const get = (req: Request, res: Response) => {
  const EXIT_REASON = req.flash('exitReason');

  return res.render(TEMPLATE, {
    ...corePageVariables({
      PAGE_CONTENT_STRINGS: PAGES.CANNOT_APPLY,
      BACK_LINK: req.headers.referer,
    }),
    userName: getUserNameFromSession(req.session.user),
    EXIT_REASON,
  });
};
