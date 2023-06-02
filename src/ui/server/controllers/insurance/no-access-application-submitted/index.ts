import { PAGES } from '../../../content-strings';
import { TEMPLATES } from '../../../constants';
import { Request, Response } from '../../../../types';
import insuranceCorePageVariables from '../../../helpers/page-variables/core/insurance';
import getUserNameFromSession from '../../../helpers/get-user-name-from-session';

export const TEMPLATE = TEMPLATES.INSURANCE.NO_ACCESS_APPLICATION_SUBMITTED;

/**
 * template for no access to application if already submitted
 * @param {Express.Request} Express request
 * @param {Express.Response} Express response
 * @returns {Express.Response.render} renders template
 */
export const get = (req: Request, res: Response) =>
  res.render(TEMPLATE, {
    ...insuranceCorePageVariables({
      PAGE_CONTENT_STRINGS: PAGES.INSURANCE.NO_ACCESS_APPLICATION_SUBMITTED_PAGE,
      BACK_LINK: req.headers.referer,
    }),
    userName: getUserNameFromSession(req.session.user),
  });
