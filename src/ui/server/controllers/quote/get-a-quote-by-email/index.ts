import { PAGES } from '../../../content-strings';
import { TEMPLATES } from '../../../constants';
import corePageVariables from '../../../helpers/core-page-variables';
import { Request, Response } from '../../../../types';

const get = (req: Request, res: Response) => {
  const previousRoute = req.flash('previousRoute');
  const EXIT_REASON = req.flash('exitReason');
  const EXIT_DESCRIPTION = req.flash('exitDescription');

  return res.render(TEMPLATES.QUOTE.GET_A_QUOTE_BY_EMAIL, {
    ...corePageVariables({ PAGE_CONTENT_STRINGS: PAGES.QUOTE.GET_A_QUOTE_BY_EMAIL, BACK_LINK: previousRoute }),
    EXIT_REASON,
    EXIT_DESCRIPTION,
  });
};

export default get;
