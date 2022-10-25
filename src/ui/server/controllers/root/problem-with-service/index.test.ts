import get from '.';
import { PAGES } from '../../../content-strings';
import { TEMPLATES } from '../../../constants';
import corePageVariables from '../../../helpers/core-page-variables';
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

      expect(res.render).toHaveBeenCalledWith(
        TEMPLATES.PROBLEM_WITH_SERVICE,
        corePageVariables({ PAGE_CONTENT_STRINGS: PAGES.PROBLEM_WITH_SERVICE_PAGE, BACK_LINK: req.headers.referer }),
      );
    });
  });
});
