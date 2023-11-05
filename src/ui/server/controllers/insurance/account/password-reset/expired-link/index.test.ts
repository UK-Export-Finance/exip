import { TEMPLATE, PAGE_CONTENT_STRINGS, get, post } from '.';
import { PAGES } from '../../../../../content-strings';
import { ROUTES, TEMPLATES } from '../../../../../constants';
import insuranceCorePageVariables from '../../../../../helpers/page-variables/core/insurance';
import { sanitiseValue } from '../../../../../helpers/sanitise-data';
import api from '../../../../../api';
import { Request, Response } from '../../../../../../types';
import { mockAccount, mockReq, mockRes } from '../../../../../test-mocks';

const {
  ACCOUNT: {
    PASSWORD_RESET: { ROOT: PASSWORD_RESET_ROOT, LINK_SENT },
  },
  PROBLEM_WITH_SERVICE,
} = ROUTES.INSURANCE;

describe('controllers/insurance/account/password-reset/expired-link', () => {
  let req: Request;
  let res: Response;

  beforeEach(() => {
    req = mockReq();
    res = mockRes();
  });

  describe('TEMPLATE', () => {
    it('should have the correct template defined', () => {
      expect(TEMPLATE).toEqual(TEMPLATES.INSURANCE.ACCOUNT.PASSWORD_RESET.EXPIRED_LINK);
    });
  });

  describe('PAGE_CONTENT_STRINGS', () => {
    it('should have the correct strings', () => {
      expect(PAGE_CONTENT_STRINGS).toEqual(PAGES.INSURANCE.ACCOUNT.PASSWORD_RESET.EXPIRED_LINK);
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
      });
    });
  });

  describe('post', () => {
    const getAccountResponse = { success: true, ...mockAccount };
    const sendEmailPasswordResetLinkResponse = { success: true };

    let getAccountSpy = jest.fn(() => Promise.resolve(getAccountResponse));
    let sendEmailPasswordResetLinkSpy = jest.fn(() => Promise.resolve(sendEmailPasswordResetLinkResponse));

    beforeEach(() => {
      api.keystone.account.get = getAccountSpy;
      api.keystone.account.sendEmailPasswordResetLink = sendEmailPasswordResetLinkSpy;

      req.query.id = mockAccount.id;
    });

    it('should call api.keystone.account.get with req.query.id', async () => {
      await post(req, res);

      const sanitisedId = String(sanitiseValue({ value: mockAccount.id }));

      expect(getAccountSpy).toHaveBeenCalledTimes(1);

      expect(getAccountSpy).toHaveBeenCalledWith(sanitisedId);
    });

    it('should call api.keystone.account.sendEmailPasswordResetLink with req.headers.origin and account email address', async () => {
      await post(req, res);

      expect(sendEmailPasswordResetLinkSpy).toHaveBeenCalledTimes(1);

      expect(sendEmailPasswordResetLinkSpy).toHaveBeenCalledWith(req.headers.origin, getAccountResponse.email);
    });

    it(`should redirect redirect to ${LINK_SENT}`, async () => {
      await post(req, res);

      expect(res.redirect).toHaveBeenCalledWith(LINK_SENT);
    });

    describe('when there is no req.query.id', () => {
      it(`should redirect redirect to ${PASSWORD_RESET_ROOT}`, async () => {
        delete req.query.id;
        await post(req, res);

        expect(res.redirect).toHaveBeenCalledWith(PASSWORD_RESET_ROOT);
      });
    });

    describe('when api.keystone.account.sendEmailPasswordResetLink does not return success=true', () => {
      beforeEach(() => {
        req.query.id = mockAccount.id;

        sendEmailPasswordResetLinkSpy = jest.fn(() => Promise.resolve({ success: false }));

        api.keystone.account.sendEmailPasswordResetLink = sendEmailPasswordResetLinkSpy;
      });

      it(`should redirect to ${PROBLEM_WITH_SERVICE}`, async () => {
        await post(req, res);

        expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
      });
    });

    describe('api error handling', () => {
      describe('when the get account API call fails', () => {
        beforeEach(() => {
          getAccountSpy = jest.fn(() => Promise.reject(new Error('mock')));
          api.keystone.account.get = sendEmailPasswordResetLinkSpy;
        });

        it(`should redirect to ${PROBLEM_WITH_SERVICE}`, async () => {
          await post(req, res);

          expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
        });
      });

      describe('when the password reset link API call fails', () => {
        beforeEach(() => {
          sendEmailPasswordResetLinkSpy = jest.fn(() => Promise.reject(new Error('mock')));
          api.keystone.account.sendEmailPasswordResetLink = sendEmailPasswordResetLinkSpy;
        });

        it(`should redirect to ${PROBLEM_WITH_SERVICE}`, async () => {
          await post(req, res);

          expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
        });
      });
    });
  });
});
