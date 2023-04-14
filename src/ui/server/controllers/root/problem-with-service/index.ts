import { PAGES, PRODUCT, LINKS } from '../../../content-strings';
import { TEMPLATES } from '../../../constants';
import corePageVariables from '../../../helpers/page-variables/core';
import getUserNameFromSession from '../../../helpers/get-user-name-from-session';
import { Request, Response } from '../../../../types';

const get = (req: Request, res: Response) =>
  res.render(TEMPLATES.PROBLEM_WITH_SERVICE, {
    userName: getUserNameFromSession(req.session.user),
    ...corePageVariables({
      PAGE_CONTENT_STRINGS: PAGES.PROBLEM_WITH_SERVICE_PAGE,
      BACK_LINK: req.headers.referer,
      PRODUCT: { DESCRIPTION: PRODUCT.DESCRIPTION.GENERIC },
      FEEDBACK_ROUTE: LINKS.EXTERNAL.FEEDBACK,
    }),
  });

export default get;
