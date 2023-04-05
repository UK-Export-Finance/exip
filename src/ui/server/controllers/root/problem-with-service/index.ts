import { PAGES, PRODUCT } from '../../../content-strings';
import { TEMPLATES } from '../../../constants';
import corePageVariables from '../../../helpers/page-variables/core';
import { Request, Response } from '../../../../types';

const get = (req: Request, res: Response) =>
  res.render(TEMPLATES.PROBLEM_WITH_SERVICE, {
    user: req.session.user,
    ...corePageVariables({
      PAGE_CONTENT_STRINGS: PAGES.PROBLEM_WITH_SERVICE_PAGE,
      BACK_LINK: req.headers.referer,
      PRODUCT: { DESCRIPTION: PRODUCT.DESCRIPTION.GENERIC },
    }),
  });

export default get;
