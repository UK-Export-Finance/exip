import { PAGE_VARIABLES, TEMPLATE, get } from '.';
import { TEMPLATES } from '../../../../constants';
import { INSURANCE_ROUTES } from '../../../../constants/routes/insurance';
import { PAGES } from '../../../../content-strings';
import corePageVariables from '../../../../helpers/page-variables/core';
import getUserNameFromSession from '../../../../helpers/get-user-name-from-session';
import { Request, Response } from '../../../../../types';
import { mockReq, mockRes } from '../../../../test-mocks';

const {
  ACCOUNT: {
    SIGN_IN: { ROOT: SIGN_IN_ROOT },
  },
} = INSURANCE_ROUTES;

describe('controllers/root/cookies/saved', () => {
  let req: Request;
  let res: Response;

  beforeEach(() => {
    req = mockReq();
    res = mockRes();
  });

  describe('PAGE_VARIABLES', () => {
    it('should have correct properties', () => {
      const expected = {
        PAGE_CONTENT_STRINGS: PAGES.COOKIES_SAVED_PAGE,
      };

      expect(PAGE_VARIABLES).toEqual(expected);
    });
  });

  describe('TEMPLATE', () => {
    it('should have the correct template defined', () => {
      expect(TEMPLATE).toEqual(TEMPLATES.COOKIES_SAVED);
    });
  });

  describe('get', () => {
    it(`should render template with RETURN_TO_SERVICE_URL defaulted to ${SIGN_IN_ROOT}`, () => {
      get(req, res);

      expect(res.render).toHaveBeenCalledWith(TEMPLATE, {
        userName: getUserNameFromSession(req.session.user),
        ...corePageVariables({ ...PAGE_VARIABLES, BACK_LINK: req.headers.referer, ORIGINAL_URL: req.originalUrl }),
        RETURN_TO_SERVICE_URL: SIGN_IN_ROOT,
      });
    });

    describe('when req.session.returnToServiceUrl exists', () => {
      const mockUrl = '/mock-url';

      beforeEach(() => {
        req.session.returnToServiceUrl = mockUrl;

        get(req, res);
      });

      it('should render template with RETURN_TO_SERVICE_URL as req.session.returnToServiceUrl', () => {
        expect(res.render).toHaveBeenCalledWith(TEMPLATE, {
          userName: getUserNameFromSession(req.session.user),
          ...corePageVariables({ ...PAGE_VARIABLES, BACK_LINK: req.headers.referer, ORIGINAL_URL: req.originalUrl }),
          RETURN_TO_SERVICE_URL: mockUrl,
        });
      });

      it('should delete req.session.returnToServiceUrl', () => {
        expect(req.session.returnToServiceUrl).toBeUndefined();
      });
    });
  });
});
