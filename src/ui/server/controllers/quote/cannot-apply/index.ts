import { PAGES } from '../../../content-strings';
import { TEMPLATES } from '../../../constants';
import corePageVariables from '../../../helpers/core-page-variables';
import { Request, Response } from '../../../../types';

const get = (req: Request, res: Response) => {
  const EXIT_REASON = req.flash('exitReason');
  const previousRoute = req.flash('previousRoute');

  return res.render(TEMPLATES.CANNOT_APPLY, {
    ...corePageVariables({ PAGE_CONTENT_STRINGS: PAGES.CANNOT_APPLY, BACK_LINK: previousRoute }),
    EXIT_REASON,
  });
};

export default get;
