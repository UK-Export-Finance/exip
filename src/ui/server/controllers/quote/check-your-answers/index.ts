import { PAGES } from '../../../content-strings';
import { ROUTES, TEMPLATES } from '../../../constants';
import { mapAnswersToContent } from '../../../helpers/data-content-mappings/map-answers-to-content';
import { answersSummaryList } from '../../../helpers/summary-lists/answers-summary-list';
import corePageVariables from '../../../helpers/page-variables/core/quote';
import getUserNameFromSession from '../../../helpers/get-user-name-from-session';
import { Request, Response } from '../../../../types';

export const TEMPLATE = TEMPLATES.QUOTE.CHECK_YOUR_ANSWERS;

export const get = (req: Request, res: Response) => {
  const answers = mapAnswersToContent(req.session.submittedData.quoteEligibility);

  const summaryList = answersSummaryList(answers);

  return res.render(TEMPLATE, {
    ...corePageVariables({ PAGE_CONTENT_STRINGS: PAGES.QUOTE.CHECK_YOUR_ANSWERS, BACK_LINK: req.headers.referer, ORIGINAL_URL: req.originalUrl }),
    userName: getUserNameFromSession(req.session.user),
    SUMMARY_LIST: summaryList,
  });
};

export const post = (req: Request, res: Response) => res.redirect(ROUTES.QUOTE.YOUR_QUOTE);
