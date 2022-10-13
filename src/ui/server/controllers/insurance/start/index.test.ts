import { get, post } from '.';
import { PAGES } from '../../../content-strings';
import { ROUTES, TEMPLATES } from '../../../constants';
import corePageVariables from '../../../helpers/core-page-variables';
import { mockReq, mockRes } from '../../../test-mocks';
import { Request, Response } from '../../../../types';

describe('controllers/insurance/start', () => {
  let req: Request;
  let res: Response;

  beforeEach(() => {
    req = mockReq();
    res = mockRes();
  });

  describe('get', () => {
    it('should render template', () => {
      get(req, res);

      const expectedVariables = {
        ...corePageVariables({
          PAGE_CONTENT_STRINGS: PAGES.INSURANCE.START,
          BACK_LINK: req.headers.referer,
        }),
      };

      expect(res.render).toHaveBeenCalledWith(TEMPLATES.INSURANCE.START, expectedVariables);
    });
  });

  describe('post', () => {
    it(`should redirect to ${ROUTES.INSURANCE.ELIGIBILITY.CHECK_IF_ELIGIBLE}`, () => {
      post(req, res);

      expect(res.redirect).toHaveBeenCalledWith(ROUTES.INSURANCE.ELIGIBILITY.CHECK_IF_ELIGIBLE);
    });
  });
});
