import { PAGES, LINKS } from '../../../content-strings';
import { TEMPLATES } from '../../../constants';
import { Request, Response } from '../../../../types';
import corePageVariables from '../../../helpers/page-variables/core/insurance';

export const TEMPLATE = TEMPLATES.INSURANCE.APPLY_OFFLINE;
const exitReasons = PAGES.INSURANCE.APPLY_OFFLINE.REASON;

export const get = (req: Request, res: Response) => {
  const EXIT_REASON = req.flash('exitReason');

  let DOWNLOAD_FORM_LINK = LINKS.EXTERNAL.NBI_FORM;

  if (EXIT_REASON.includes(exitReasons.NO_COMPANIES_HOUSE_NUMBER)) {
    DOWNLOAD_FORM_LINK = LINKS.EXTERNAL.PROPOSAL_FORM;
  }

  return res.render(TEMPLATE, {
    ...corePageVariables({
      PAGE_CONTENT_STRINGS: PAGES.INSURANCE.APPLY_OFFLINE,
      BACK_LINK: req.headers.referer,
    }),
    user: req.session.user,
    EXIT_REASON,
    DOWNLOAD_FORM_LINK,
  });
};
