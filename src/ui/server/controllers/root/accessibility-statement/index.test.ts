import { get } from '.';
import { BUTTONS, COOKIES_CONSENT, FOOTER, LINKS, PRODUCT, PAGES } from '../../../content-strings';
import { TEMPLATES } from '../../../constants';
import { mockReq, mockRes } from '../../../test-mocks';
import { Request, Response } from '../../../../types';

describe('controllers/root/cookies', () => {
  let req: Request;
  let res: Response;

  const mockFlash = jest.fn();

  beforeEach(() => {
    req = mockReq();
    req.flash = mockFlash;

    res = mockRes();
  });

  describe('get', () => {
    it('should render template', () => {
      get(req, res);

      expect(res.render).toHaveBeenCalledWith(TEMPLATES.ACCESSIBILITY_STATEMENT, {
        CONTENT_STRINGS: {
          COOKIES_CONSENT,
          BUTTONS,
          FOOTER,
          LINKS,
          PRODUCT,
          ...PAGES.ACCESSIBILITY_STATEMENT_PAGE,
        },
        BACK_LINK: req.headers.referer,
      });
    });
  });
});
