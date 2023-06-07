import { get } from '.';
import { ROUTES } from '../../../../../constants';
import api from '../../../../../api';
import { Request, Response } from '../../../../../../types';
import { mockReq, mockRes } from '../../../../../test-mocks';

const {
  INSURANCE: {
    ACCOUNT: {
      SUSPENDED: { ROOT: SUSPENDED_ROOT, VERIFY_EMAIL_LINK_EXPIRED },
      REACTIVATED_ROOT,
    },
    PROBLEM_WITH_SERVICE,
  },
} = ROUTES;

describe('controllers/insurance/account/suspended/verify-email', () => {
  let req: Request;
  let res: Response;

  const verifyAccountReactivationTokenResponse = { success: true };

  let verifyAccountReactivationTokenSpy = jest.fn(() => Promise.resolve(verifyAccountReactivationTokenResponse));

  beforeEach(() => {
    req = mockReq();

    req.query.token = 'mockToken';

    res = mockRes();

    api.keystone.account.verifyAccountReactivationToken = verifyAccountReactivationTokenSpy;
  });

  it(`should redirect to ${REACTIVATED_ROOT}`, async () => {
    await get(req, res);

    expect(res.redirect).toHaveBeenCalledWith(REACTIVATED_ROOT);
  });

  describe('when there is no req.query.token', () => {
    beforeEach(() => {
      delete req.query.token;
    });

    it(`should redirect to ${SUSPENDED_ROOT}`, async () => {
      await get(req, res);

      expect(res.redirect).toHaveBeenCalledWith(SUSPENDED_ROOT);
    });
  });

  describe('when api.keystone.account.verifyAccountReactivationToken does not return success=true', () => {
    beforeEach(() => {
      verifyAccountReactivationTokenSpy = jest.fn(() => Promise.resolve({ success: false }));

      api.keystone.account.verifyAccountReactivationToken = verifyAccountReactivationTokenSpy;
    });

    it(`should redirect to ${VERIFY_EMAIL_LINK_EXPIRED}`, async () => {
      await get(req, res);

      expect(res.redirect).toHaveBeenCalledWith(VERIFY_EMAIL_LINK_EXPIRED);
    });
  });

  describe('when api.keystone.account.verifyAccountReactivationToken returns expired=true', () => {
    beforeEach(() => {
      verifyAccountReactivationTokenSpy = jest.fn(() => Promise.resolve({ success: true, expired: true }));

      api.keystone.account.verifyAccountReactivationToken = verifyAccountReactivationTokenSpy;
    });

    it(`should redirect to ${VERIFY_EMAIL_LINK_EXPIRED}`, async () => {
      await get(req, res);

      expect(res.redirect).toHaveBeenCalledWith(VERIFY_EMAIL_LINK_EXPIRED);
    });
  });

  describe('api error handling', () => {
    describe('when the verify reactivate account token API call fails', () => {
      beforeEach(() => {
        verifyAccountReactivationTokenSpy = jest.fn(() => Promise.reject());

        api.keystone.account.verifyAccountReactivationToken = verifyAccountReactivationTokenSpy;
      });

      it(`should redirect to ${PROBLEM_WITH_SERVICE}`, async () => {
        await get(req, res);

        expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
      });
    });
  });
});
