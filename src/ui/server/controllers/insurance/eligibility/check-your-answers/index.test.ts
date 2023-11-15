import { PAGE_VARIABLES, TEMPLATE, get, post } from '.';
import { PAGES } from '../../../../content-strings';
import { TEMPLATES } from '../../../../constants';
import { INSURANCE_ROUTES } from '../../../../constants/routes/insurance';
import corePageVariables from '../../../../helpers/page-variables/core/insurance';
import getUserNameFromSession from '../../../../helpers/get-user-name-from-session';
import { Request, Response } from '../../../../../types';
import { mockReq, mockRes } from '../../../../test-mocks';

const { ELIGIBLE_TO_APPLY_ONLINE } = INSURANCE_ROUTES.ELIGIBILITY;

describe('controllers/insurance/eligibility/check-your-answers', () => {
  let req: Request;
  let res: Response;

  beforeEach(() => {
    req = mockReq();
    res = mockRes();
  });

  describe('PAGE_VARIABLES', () => {
    it('should have correct properties', () => {
      const expected = {
        PAGE_CONTENT_STRINGS: PAGES.INSURANCE.ELIGIBILITY.CHECK_YOUR_ANSWERS,
      };

      expect(PAGE_VARIABLES).toEqual(expected);
    });
  });

  describe('TEMPLATE', () => {
    it('should have the correct template defined', () => {
      expect(TEMPLATE).toEqual(TEMPLATES.INSURANCE.ELIGIBILITY.CHECK_YOUR_ANSWERS);
    });
  });

  describe('get', () => {
    it('should render template', () => {
      get(req, res);

      expect(res.render).toHaveBeenCalledWith(TEMPLATE, {
        ...corePageVariables({ ...PAGE_VARIABLES, BACK_LINK: req.headers.referer }),
        userName: getUserNameFromSession(req.session.user),
      });
    });
  });

  describe('post', () => {
    it(`should redirect to ${ELIGIBLE_TO_APPLY_ONLINE}`, () => {
      post(req, res);

      expect(res.redirect).toHaveBeenCalledWith(ELIGIBLE_TO_APPLY_ONLINE);
    });
  });
});
