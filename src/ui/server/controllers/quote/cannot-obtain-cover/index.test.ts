import get from '.';
import { COOKIES_CONSENT, FOOTER, LINKS, PAGES, PRODUCT } from '../../../content-strings';
import { TEMPLATES } from '../../../constants';
import { mockReq, mockRes } from '../../../test-mocks';
import { Request, Response } from '../../../../types';

describe('controllers/quote/cannot-obtain-cover', () => {
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

  it('should render template with values from req.flash', () => {
    get(req, res);

    expect(res.render).toHaveBeenCalledWith(TEMPLATES.CANNOT_APPLY, {
      CONTENT_STRINGS: {
        COOKIES_CONSENT,
        FOOTER,
        LINKS,
        PRODUCT,
        ...PAGES.CANNOT_APPLY,
      },
      BACK_LINK: mockPreviousRoute,
      EXIT_REASON: mockExitReason,
    });
  });
});
