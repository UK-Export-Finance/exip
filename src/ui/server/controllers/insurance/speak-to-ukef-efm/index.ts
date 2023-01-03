import { PAGES } from '../../../content-strings';
import { TEMPLATES } from '../../../constants';
import { Request, Response } from '../../../../types';
import corePageVariables from '../../../helpers/page-variables/core/insurance';

export const TEMPLATE = TEMPLATES.INSURANCE.SPEAK_TO_UKEF_EFM;

export const get = (req: Request, res: Response) => {
  const EXIT_REASON = req.flash('exitReason');

  return res.render(TEMPLATE, {
    ...corePageVariables({
      PAGE_CONTENT_STRINGS: PAGES.INSURANCE.SPEAK_TO_UKEF_EFM,
      BACK_LINK: req.headers.referer,
    }),
    EXIT_REASON,
  });
};
