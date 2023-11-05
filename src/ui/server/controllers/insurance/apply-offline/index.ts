import { PAGES, LINKS } from '../../../content-strings';
import { TEMPLATES } from '../../../constants';
import insuranceCorePageVariables from '../../../helpers/page-variables/core/insurance';
import getUserNameFromSession from '../../../helpers/get-user-name-from-session';
import { Request, Response } from '../../../../types';

export const TEMPLATE = TEMPLATES.INSURANCE.APPLY_OFFLINE;
const exitReasons = PAGES.INSURANCE.APPLY_OFFLINE.REASON;

export const get = (req: Request, res: Response) => {
  const EXIT_REASON = req.flash('exitReason');

  let DOWNLOAD_FORM_LINK = LINKS.EXTERNAL.NBI_FORM;

  if (EXIT_REASON.includes(exitReasons.NO_COMPANIES_HOUSE_NUMBER)) {
    DOWNLOAD_FORM_LINK = LINKS.EXTERNAL.PROPOSAL_FORM;
  }

  return res.render(TEMPLATE, {
    ...insuranceCorePageVariables({
      PAGE_CONTENT_STRINGS: PAGES.INSURANCE.APPLY_OFFLINE,
      BACK_LINK: req.headers.referer,
    }),
    userName: getUserNameFromSession(req.session.user),
    EXIT_REASON,
    DOWNLOAD_FORM_LINK,
  });
};
