import { get } from '.';
import { ROUTES } from '../../../../../constants';
import { sanitiseValue } from '../../../../../helpers/sanitise-data';
import api from '../../../../../api';
import { Request, Response } from '../../../../../../types';
import { mockAccount, mockReq, mockRes } from '../../../../../test-mocks';

const {
  INSURANCE: {
    ACCOUNT: {
      SUSPENDED: { ROOT: SUSPENDED_ROOT, VERIFY_EMAIL_EXPIRED_LINK, VERIFY_EMAIL_INVALID_LINK },
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

  const mockToken = 'mockToken';

  beforeEach(() => {
    req = mockReq();

    req.query.token = mockToken;

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

  it('should call api.keystone.account.verifyAccountReactivationToken with sanitised token', async () => {
    await get(req, res);

    const sanitisedToken = String(sanitiseValue({ value: mockToken }));

    expect(verifyAccountReactivationTokenSpy).toHaveBeenCalledTimes(1);

    expect(verifyAccountReactivationTokenSpy).toHaveBeenCalledWith(sanitisedToken);
  });

  describe('when api.keystone.account.verifyAccountReactivationToken returns expired=true and an accountId', () => {
    beforeEach(() => {
      verifyAccountReactivationTokenSpy = jest.fn(() => Promise.resolve({ success: true, expired: true, accountId: mockAccount.id }));

      api.keystone.account.verifyAccountReactivationToken = verifyAccountReactivationTokenSpy;
    });

    it(`should redirect to ${VERIFY_EMAIL_EXPIRED_LINK} with query param`, async () => {
      await get(req, res);

      const expected = `${VERIFY_EMAIL_EXPIRED_LINK}?id=${mockAccount.id}`;

      expect(res.redirect).toHaveBeenCalledWith(expected);
    });
  });

  describe('when api.keystone.account.verifyAccountReactivationToken returns invalid=true', () => {
    beforeEach(() => {
      verifyAccountReactivationTokenSpy = jest.fn(() => Promise.resolve({ success: false, invalid: true }));

      api.keystone.account.verifyAccountReactivationToken = verifyAccountReactivationTokenSpy;
    });

    it(`should redirect to ${VERIFY_EMAIL_INVALID_LINK}`, async () => {
      await get(req, res);

      expect(res.redirect).toHaveBeenCalledWith(VERIFY_EMAIL_INVALID_LINK);
    });
  });

  describe('when api.keystone.account.verifyAccountReactivationToken returns only success=false', () => {
    beforeEach(() => {
      verifyAccountReactivationTokenSpy = jest.fn(() => Promise.resolve({ success: false }));

      api.keystone.account.verifyAccountReactivationToken = verifyAccountReactivationTokenSpy;
    });

    it(`should redirect to ${VERIFY_EMAIL_INVALID_LINK}`, async () => {
      await get(req, res);

      expect(res.redirect).toHaveBeenCalledWith(VERIFY_EMAIL_INVALID_LINK);
    });
  });

  describe('api error handling', () => {
    describe('when the verify reactivate account token API call fails', () => {
      beforeEach(() => {
        verifyAccountReactivationTokenSpy = jest.fn(() => Promise.reject(new Error('mock')));

        api.keystone.account.verifyAccountReactivationToken = verifyAccountReactivationTokenSpy;
      });

      it(`should redirect to ${PROBLEM_WITH_SERVICE}`, async () => {
        await get(req, res);

        expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
      });
    });
  });
});
