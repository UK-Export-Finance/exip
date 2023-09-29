import { TEMPLATE, PAGE_CONTENT_STRINGS, get, post } from '.';
import { PAGES } from '../../../../../content-strings';
import { ROUTES, TEMPLATES } from '../../../../../constants';
import insuranceCorePageVariables from '../../../../../helpers/page-variables/core/insurance';
import getUserNameFromSession from '../../../../../helpers/get-user-name-from-session';
import api from '../../../../../api';
import { Request, Response } from '../../../../../../types';
import { mockReq, mockRes, mockAccount } from '../../../../../test-mocks';

const {
  INSURANCE: {
    ACCOUNT: {
      SIGN_IN: { ROOT: SIGN_IN_ROOT, ENTER_CODE },
    },
    DASHBOARD,
    PROBLEM_WITH_SERVICE,
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

      expect(res.render).toHaveBeenCalledWith(TEMPLATE, {
        ...insuranceCorePageVariables({
          PAGE_CONTENT_STRINGS,
          BACK_LINK: req.headers.referer,
        }),
        userName: getUserNameFromSession(req.session.user),
      });
    });

    describe('when there is req.session.user.id', () => {
      beforeEach(() => {
        req.session.user = mockAccount;
      });

      it(`should redirect to ${DASHBOARD}`, () => {
        get(req, res);

        expect(res.redirect).toHaveBeenCalledWith(DASHBOARD);
      });
    });

    describe('when there is no req.session.accountId', () => {
      beforeEach(() => {
        delete req.session.user;
        delete req.session.accountId;
      });

      it(`should redirect to ${SIGN_IN_ROOT}`, () => {
        get(req, res);

        expect(res.redirect).toHaveBeenCalledWith(SIGN_IN_ROOT);
      });
    });
  });

  describe('post', () => {
    const signInSendNewCodeResponse = {
      success: true,
    };

    let signInSendNewCodeSpy = jest.fn(() => Promise.resolve(signInSendNewCodeResponse));

    api.keystone.account.signInSendNewCode = signInSendNewCodeSpy;

    describe('when there is no req.session.accountId', () => {
      beforeEach(() => {
        delete req.session.accountId;
      });

      it(`should redirect to ${SIGN_IN_ROOT}`, async () => {
        await post(req, res);

        expect(res.redirect).toHaveBeenCalledWith(SIGN_IN_ROOT);
      });
    });

    describe('when there is req.session.accountId', () => {
      it('should call api.keystone.account.verifyAccountSignInCode', async () => {
        await post(req, res);

        expect(signInSendNewCodeSpy).toHaveBeenCalledTimes(1);

        expect(signInSendNewCodeSpy).toHaveBeenCalledWith(req.session.accountId);
      });

      it('should add successBanner to req.flash', async () => {
        await post(req, res);

        expect(req.flash).toHaveBeenCalledWith('successBanner', 'newSecurityCodeSent');
      });

      it(`should redirect to ${ENTER_CODE}`, async () => {
        await post(req, res);

        expect(res.redirect).toHaveBeenCalledWith(ENTER_CODE);
      });
    });

    describe('api error handling', () => {
      describe('when there is an error', () => {
        beforeEach(() => {
          signInSendNewCodeSpy = jest.fn(() => Promise.reject(new Error('mock')));
          api.keystone.account.signInSendNewCode = signInSendNewCodeSpy;
        });

        it(`should redirect to ${PROBLEM_WITH_SERVICE}`, async () => {
          await post(req, res);

          expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
        });
      });
    });
  });
});
