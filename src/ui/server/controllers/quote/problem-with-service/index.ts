import { FOOTER, PAGES, PRODUCT } from '../../../content-strings';
import { TEMPLATES } from '../../../constants';
import { Request, Response } from '../../../../types';

const get = (req: Request, res: Response) =>
  res.render(TEMPLATES.PROBLEM_WITH_SERVICE, {
    CONTENT_STRINGS: {
      PRODUCT,
      FOOTER,
      ...PAGES.PROBLEM_WITH_SERVICE_PAGE,
    },
  });

export default get;
