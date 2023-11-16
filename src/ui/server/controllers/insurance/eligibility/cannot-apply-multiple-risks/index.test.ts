import { get, TEMPLATE } from '.';
import { PAGES } from '../../../../content-strings';
import { TEMPLATES } from '../../../../constants';
import corePageVariables from '../../../../helpers/page-variables/core/insurance';
import getUserNameFromSession from '../../../../helpers/get-user-name-from-session';
import { mockReq, mockRes } from '../../../../test-mocks';
import { Request, Response } from '../../../../../types';

describe('controllers/insurance/eligibility/cannot-apply-multiple-risks', () => {
  let req: Request;
  let res: Response;

  beforeEach(() => {
    req = mockReq();
    res = mockRes();
  });

  describe('TEMPLATE', () => {
    it('should have the correct template defined', () => {
      expect(TEMPLATE).toEqual(TEMPLATES.INSURANCE.ELIGIBILITY.CANNOT_APPLY_MULTIPLE_RISKS);
    });
  });

  describe('get', () => {
    it('should render template', () => {
      get(req, res);

      const expectedVariables = {
        ...corePageVariables({
          PAGE_CONTENT_STRINGS: PAGES.INSURANCE.ELIGIBILITY.CANNOT_APPLY_MULTIPLE_RISKS,
          BACK_LINK: req.headers.referer,
        }),
        userName: getUserNameFromSession(req.session.user),
      };

      expect(res.render).toHaveBeenCalledWith(TEMPLATE, expectedVariables);
    });
  });
});
