import { PAGES } from '../../../../content-strings';
import { TEMPLATES } from '../../../../constants';
import { Request, Response } from '../../../../../types';
import corePageVariables from '../../../../helpers/core-page-variables';

const get = (req: Request, res: Response) => {
  const EXIT_REASON = req.flash('exitReason');

  return res.render(TEMPLATES.INSURANCE.ELIGIBILITY.APPLY_OFFLINE, {
    ...corePageVariables({
      PAGE_CONTENT_STRINGS: PAGES.INSURANCE.ELIGIBILITY.APPLY_OFFLINE,
      BACK_LINK: req.headers.referer,
    }),
    EXIT_REASON,
  });
};

export default get;
