import get from '.';
import { COOKIES_CONSENT, FOOTER, PAGES, PRODUCT } from '../../../content-strings';
import { TEMPLATES } from '../../../constants';
import { mockReq, mockRes } from '../../../test-mocks';
import { Request, Response } from '../../../../types';

describe('controllers/problem-with-service', () => {
  let req: Request;
  let res: Response;

  beforeEach(() => {
    req = mockReq();
    res = mockRes();
  });

  describe('get', () => {
    it('should render template', () => {
      get(req, res);

      expect(res.render).toHaveBeenCalledWith(TEMPLATES.PROBLEM_WITH_SERVICE, {
        CONTENT_STRINGS: {
          COOKIES_CONSENT,
          FOOTER,
          PRODUCT,
          ...PAGES.PROBLEM_WITH_SERVICE_PAGE,
        },
      });
    });
  });
});
