import { TEMPLATE, PAGE_CONTENT_STRINGS, get, post } from '.';
import { PAGES } from '../../../../../content-strings';
import { ROUTES, TEMPLATES } from '../../../../../constants';
import insuranceCorePageVariables from '../../../../../helpers/page-variables/core/insurance';
import { Request, Response } from '../../../../../../types';
import { mockReq, mockRes, mockAccount } from '../../../../../test-mocks';

const {
  INSURANCE: {
    ACCOUNT: {
      SIGN_IN: { ROOT: SIGN_IN_ROOT, ENTER_CODE },
    },
  },
} = ROUTES;

describe('controllers/insurance/account/sign-in/request-new-code', () => {
  let req: Request;
  let res: Response;

  beforeEach(() => {
    req = mockReq();

    req.session.accountId = mockAccount.id;

    res = mockRes();
  });

  describe('TEMPLATE', () => {
    it('should have the correct template defined', () => {
      expect(TEMPLATE).toEqual(TEMPLATES.INSURANCE.ACCOUNT.SIGN_IN.REQUEST_NEW_CODE);
    });
  });

  describe('PAGE_CONTENT_STRINGS', () => {
    it('should have the correct strings', () => {
      expect(PAGE_CONTENT_STRINGS).toEqual(PAGES.INSURANCE.ACCOUNT.SIGN_IN.REQUEST_NEW_CODE);
    });
  });

  describe('get', () => {
    it('should render template', () => {
      get(req, res);

      expect(res.render).toHaveBeenCalledWith(
        TEMPLATE,
        insuranceCorePageVariables({
          PAGE_CONTENT_STRINGS,
          BACK_LINK: req.headers.referer,
        }),
      );
    });

    describe('when there is no req.session.accountId', () => {
      beforeEach(() => {
        delete req.session.accountId;
      });

      it(`should redirect to ${SIGN_IN_ROOT}`, () => {
        get(req, res);

        expect(res.redirect).toHaveBeenCalledWith(SIGN_IN_ROOT);
      });
    });
  });

  describe('post', () => {
    describe('when there is no req.session.accountId', () => {
      beforeEach(() => {
        delete req.session.accountId;
      });

      it(`should redirect to ${SIGN_IN_ROOT}`, async () => {
        await post(req, res);

        expect(res.redirect).toHaveBeenCalledWith(SIGN_IN_ROOT);
      });
    });

    it(`should redirect to ${ENTER_CODE}`, async () => {
      await post(req, res);

      expect(res.redirect).toHaveBeenCalledWith(ENTER_CODE);
    });
  });
});
