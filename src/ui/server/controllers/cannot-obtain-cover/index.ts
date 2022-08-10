import { FOOTER, LINKS, PAGES, PRODUCT } from '../../content-strings';
import { TEMPLATES } from '../../constants';
import { Request, Response } from '../../../types';

const get = (req: Request, res: Response) => {
  const EXIT_REASON = req.flash('exitReason');
  const previousRoute = req.flash('previousRoute');

  return res.render(TEMPLATES.CANNOT_OBTAIN_COVER, {
    CONTENT_STRINGS: {
      PRODUCT,
      FOOTER,
      LINKS,
      ...PAGES.CANNOT_OBTAIN_COVER_PAGE,
    },
    BACK_LINK: previousRoute,
    EXIT_REASON,
  });
};

export default get;
