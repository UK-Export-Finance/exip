import get from '.';
import { FOOTER, PAGES, PRODUCT } from '../../content-strings';
import { TEMPLATES } from '../../constants';
import { mockReq, mockRes } from '../../test-mocks';
import { Request, Response } from '../../../types';

describe('controllers/cookies', () => {
  let req: Request;
  let res: Response;

  beforeEach(() => {
    req = mockReq();
    res = mockRes();
  });

  describe('get', () => {
    it('should render template', () => {
      get(req, res);

      expect(res.render).toHaveBeenCalledWith(TEMPLATES.COOKIES, {
        CONTENT_STRINGS: {
          PRODUCT,
          FOOTER,
          ...PAGES.COOKIES_PAGE,
        },
      });
    });
  });
});
