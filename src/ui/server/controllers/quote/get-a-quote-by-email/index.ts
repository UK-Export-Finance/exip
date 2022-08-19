import { FOOTER, LINKS, PAGES, PRODUCT } from '../../../content-strings';
import { TEMPLATES } from '../../../constants';
import { Request, Response } from '../../../../types';

const get = (req: Request, res: Response) =>
  res.render(TEMPLATES.QUOTE.GET_A_QUOTE_BY_EMAIL, {
    CONTENT_STRINGS: {
      PRODUCT,
      FOOTER,
      LINKS,
      ...PAGES.GET_A_QUOTE_BY_EMAIL_PAGE,
    },
    BACK_LINK: req.headers.referer,
  });

export default get;
