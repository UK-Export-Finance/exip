import { PAGES } from '../../../content-strings';
import { TEMPLATES } from '../../../constants';
import insuranceCorePageVariables from '../../../helpers/page-variables/core/insurance';
import getUserNameFromSession from '../../../helpers/get-user-name-from-session';
import { Request, Response } from '../../../../types';

export const TEMPLATE = TEMPLATES.INSURANCE.PAGE_NOT_FOUND;

export const get = (req: Request, res: Response) =>
  res.render(TEMPLATE, {
    ...insuranceCorePageVariables({
      PAGE_CONTENT_STRINGS: PAGES.PAGE_NOT_FOUND_PAGE,
    }),
    userName: getUserNameFromSession(req.session.user),
  });
