import { PAGES } from '../../../../content-strings';
import { ROUTES, TEMPLATES } from '../../../../constants';
import corePageVariables from '../../../../helpers/page-variables/core/insurance';
import getUserNameFromSession from '../../../../helpers/get-user-name-from-session';
import { Request, Response } from '../../../../../types';

export const get = (req: Request, res: Response) =>
  res.render(TEMPLATES.SHARED_PAGES.NEED_TO_START_AGAIN, {
    ...corePageVariables({ PAGE_CONTENT_STRINGS: PAGES.NEED_TO_START_AGAIN_PAGE, BACK_LINK: req.headers.referer }),
    userName: getUserNameFromSession(req.session.user),
  });

export const post = (req: Request, res: Response) => res.redirect(ROUTES.INSURANCE.ELIGIBILITY.EXPORTER_LOCATION);
