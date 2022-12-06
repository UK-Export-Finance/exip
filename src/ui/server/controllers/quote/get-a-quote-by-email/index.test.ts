import get from '.';
import { COOKIES_CONSENT, FOOTER, LINKS, PAGES, PRODUCT } from '../../../content-strings';
import { TEMPLATES } from '../../../constants';
import { mockReq, mockRes } from '../../../test-mocks';
import { Request, Response } from '../../../../types';

describe('controllers/quote/get-a-quote-by-email', () => {
  let req: Request;
  let res: Response;
  const mockExitReason = 'mock';
  const mockPreviousRoute = '/test';

  beforeEach(() => {
    req = mockReq();

    req.flash = (property: string) => {
      const obj = {
        exitReason: mockExitReason,
        previousRoute: mockPreviousRoute,
      };

      return obj[property];
    };

    res = mockRes();
  });

  it('should render template', () => {
    get(req, res);

    expect(res.render).toHaveBeenCalledWith(TEMPLATES.QUOTE.GET_A_QUOTE_BY_EMAIL, {
      CONTENT_STRINGS: {
        COOKIES_CONSENT,
        FOOTER,
        LINKS,
        PRODUCT,
        ...PAGES.GET_A_QUOTE_BY_EMAIL_PAGE,
      },
      BACK_LINK: mockPreviousRoute,
      EXIT_REASON: mockExitReason,
    });
  });
});
