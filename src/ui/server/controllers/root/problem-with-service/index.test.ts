import get from '.';
import { PAGES } from '../../../content-strings';
import { TEMPLATES } from '../../../constants';
import corePageVariables from '../../../helpers/page-variables/core';
import getUserNameFromSession from '../../../helpers/get-user-name-from-session';
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
        userName: getUserNameFromSession(req.session.user),
        ...corePageVariables({
          PAGE_CONTENT_STRINGS: PAGES.PROBLEM_WITH_SERVICE_PAGE,
          BACK_LINK: req.headers.referer,
          ORIGINAL_URL: req.originalUrl,
        }),
      });
    });
  });
});
