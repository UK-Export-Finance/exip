import { PAGES } from '../../../content-strings';
import { TEMPLATES } from '../../../constants';
import corePageVariables from '../../../helpers/page-variables/core/quote';
import { Request, Response } from '../../../../types';

export const TEMPLATE = TEMPLATES.CANNOT_APPLY;

export const get = (req: Request, res: Response) => {
  const EXIT_REASON = req.flash('exitReason');
  const previousRoute = req.flash('previousRoute');

  return res.render(TEMPLATE, {
    ...corePageVariables({ PAGE_CONTENT_STRINGS: PAGES.CANNOT_APPLY, BACK_LINK: previousRoute }),
    user: req.session.user,
    EXIT_REASON,
  });
};
