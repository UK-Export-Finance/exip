import get from '.';
import { FOOTER, LINKS, PAGES, PRODUCT } from '../../../content-strings';
import { TEMPLATES } from '../../../constants';
import { mockReq, mockRes } from '../../../test-mocks';
import { Request, Response } from '../../../../types';

describe('controllers/get-a-quote-by-email', () => {
  let req: Request;
  let res: Response;

  beforeEach(() => {
    req = mockReq();
    res = mockRes();
  });

  it('should render template', () => {
    get(req, res);

    expect(res.render).toHaveBeenCalledWith(TEMPLATES.QUOTE.GET_A_QUOTE_BY_EMAIL, {
      CONTENT_STRINGS: {
        PRODUCT,
        FOOTER,
        LINKS,
        ...PAGES.GET_A_QUOTE_BY_EMAIL_PAGE,
      },
      BACK_LINK: req.headers.referer,
    });
  });
});
