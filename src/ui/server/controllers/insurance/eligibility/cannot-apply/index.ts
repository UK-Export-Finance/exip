import { PAGES } from '../../../../content-strings';
import { TEMPLATES } from '../../../../constants';
import { Request, Response } from '../../../../../types';
import corePageVariables from '../../../../helpers/page-variables/core/insurance';

export const TEMPLATE = TEMPLATES.CANNOT_APPLY;

export const get = (req: Request, res: Response) => {
  const EXIT_REASON = req.flash('exitReason');

  return res.render(TEMPLATE, {
    ...corePageVariables({
      PAGE_CONTENT_STRINGS: PAGES.CANNOT_APPLY,
      BACK_LINK: req.headers.referer,
    }),
    user: req.session.user,
    EXIT_REASON,
  });
};
