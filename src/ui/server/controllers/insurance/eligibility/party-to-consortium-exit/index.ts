import { PAGES } from '../../../../content-strings';
import { TEMPLATES } from '../../../../constants';
import corePageVariables from '../../../../helpers/page-variables/core/insurance';
import getUserNameFromSession from '../../../../helpers/get-user-name-from-session';
import { Request, Response } from '../../../../../types';

export const TEMPLATE = TEMPLATES.INSURANCE.ELIGIBILITY.PDF_EXIT;

/**
 * get
 * Render the "Party to consortium" exit page
 * @param {Express.Request} Express request
 * @param {Express.Response} Express response
 * @returns {Express.Response.render} Party to consortium exit page
 */
export const get = (req: Request, res: Response) =>
  res.render(TEMPLATE, {
    ...corePageVariables({
      PAGE_CONTENT_STRINGS: PAGES.INSURANCE.ELIGIBILITY.PARTY_TO_CONSORTIUM_EXIT,
      BACK_LINK: req.headers.referer,
    }),
    userName: getUserNameFromSession(req.session.user),
  });
