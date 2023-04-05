import { PAGES } from '../../../content-strings';
import { TEMPLATES } from '../../../constants';
import corePageVariables from '../../../helpers/page-variables/core/quote';
import { Request, Response } from '../../../../types';

export const TEMPLATE = TEMPLATES.QUOTE.GET_A_QUOTE_BY_EMAIL;

export const get = (req: Request, res: Response) => {
  const previousRoute = req.flash('previousRoute');
  const EXIT_REASON = req.flash('exitReason');
  const EXIT_DESCRIPTION = req.flash('exitDescription');

  return res.render(TEMPLATE, {
    ...corePageVariables({ PAGE_CONTENT_STRINGS: PAGES.QUOTE.GET_A_QUOTE_BY_EMAIL, BACK_LINK: previousRoute }),
    user: req.session.user,
    EXIT_REASON,
    EXIT_DESCRIPTION,
  });
};
