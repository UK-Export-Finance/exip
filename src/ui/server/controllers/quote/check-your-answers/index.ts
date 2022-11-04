import { PAGES } from '../../../content-strings';
import { ROUTES, TEMPLATES } from '../../../constants';
import { mapAnswersToContent } from '../../../helpers/data-content-mappings/map-answers-to-content';
import { answersSummaryList } from '../../../helpers/summary-lists/answers-summary-list';
import corePageVariables from '../../../helpers/core-page-variables';
import { Request, Response } from '../../../../types';

const get = async (req: Request, res: Response) => {
  const answers = mapAnswersToContent(req.session.submittedData.quoteEligibility);

  const summaryList = answersSummaryList(answers);

  return res.render(TEMPLATES.QUOTE.CHECK_YOUR_ANSWERS, {
    ...corePageVariables({ PAGE_CONTENT_STRINGS: PAGES.QUOTE.CHECK_YOUR_ANSWERS, BACK_LINK: req.headers.referer }),
    SUMMARY_LIST: summaryList,
  });
};

const post = (req: Request, res: Response) => res.redirect(ROUTES.QUOTE.YOUR_QUOTE);

export { get, post };
