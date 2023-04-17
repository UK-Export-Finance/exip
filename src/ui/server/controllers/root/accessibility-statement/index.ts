import { BUTTONS, COOKIES_CONSENT, FOOTER, LINKS, PRODUCT, PAGES, PHASE_BANNER } from '../../../content-strings';
import { TEMPLATES } from '../../../constants';
import { Request, Response } from '../../../../types';

export const get = (req: Request, res: Response) => {
  return res.render(TEMPLATES.ACCESSIBILITY_STATEMENT, {
    CONTENT_STRINGS: {
      COOKIES_CONSENT,
      BUTTONS,
      FOOTER,
      LINKS,
      PRODUCT,
      PHASE_BANNER,
      ...PAGES.ACCESSIBILITY_STATEMENT_PAGE,
    },
    BACK_LINK: req.headers.referer,
    FEEDBACK_ROUTE: LINKS.EXTERNAL.FEEDBACK,
  });
};
