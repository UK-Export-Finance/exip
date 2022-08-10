import { BUTTONS, FOOTER, LINKS, PAGES, PRODUCT } from '../../content-strings';
import { ROUTES, TEMPLATES } from '../../constants';
import { mapAnswersToContent } from '../../helpers/data-content-mappings/map-answers-to-content';
import { answersSummaryList } from '../../helpers/summary-lists/answers-summary-list';
import { Request, Response } from '../../../types';

const PAGE_VARIABLES = {
  CONTENT_STRINGS: {
    PRODUCT,
    FOOTER,
    LINKS,
    BUTTONS,
    ...PAGES.CHECK_YOUR_ANSWERS_PAGE,
  },
};

const get = async (req: Request, res: Response) => {
  const answers = mapAnswersToContent(req.session.submittedData);
  
  const summaryList = answersSummaryList(answers);

  return res.render(TEMPLATES.CHECK_YOUR_ANSWERS, {
    ...PAGE_VARIABLES,
    BACK_LINK: req.headers.referer,
    SUMMARY_LIST: summaryList,
  });
};

const post = (req: Request, res: Response) => res.redirect(ROUTES.YOUR_QUOTE);

export { PAGE_VARIABLES, get, post };
