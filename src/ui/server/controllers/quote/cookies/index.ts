import { FOOTER, PAGES, PRODUCT } from '../../../content-strings';
import { TEMPLATES } from '../../../constants';
import { Request, Response } from '../../../../types';

const get = async (req: Request, res: Response) =>
  res.render(TEMPLATES.COOKIES, {
    CONTENT_STRINGS: {
      PRODUCT,
      FOOTER,
      ...PAGES.COOKIES_PAGE,
    },
  });

export default get;
