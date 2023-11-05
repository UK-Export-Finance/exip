import { get } from '.';
import { ROUTES } from '../../../../../constants';
import { sanitiseValue } from '../../../../../helpers/sanitise-data';
import api from '../../../../../api';
import { Request, Response } from '../../../../../../types';
import { mockAccount, mockReq, mockRes } from '../../../../../test-mocks';

const {
  INSURANCE: {
    ACCOUNT: {
      CREATE: { VERIFY_EMAIL_INVALID_LINK, VERIFY_EMAIL_EXPIRED_LINK },
      SIGN_IN,
    },
    PROBLEM_WITH_SERVICE,
  },
} = ROUTES;

describe('controllers/insurance/account/create/verify-email', () => {
  let req: Request;
  let res: Response;

  const mockToken = 'mockToken';

  const mockVerifyEmailAddressResponse = {
    success: true,
  };

  let verifyEmailAddressSpy = jest.fn(() => Promise.resolve(mockVerifyEmailAddressResponse));

  beforeEach(() => {
    req = mockReq();
    res = mockRes();
  });

  describe('get', () => {
    describe('when req.query.token exists', () => {
      beforeEach(() => {
        req.query.token = mockToken;
        req.query.id = mockAccount.id;
      });

      it('should call api.keystone.account.verifyEmailAddress with token and ID', async () => {
        api.keystone.account.verifyEmailAddress = verifyEmailAddressSpy;

        await get(req, res);

        const sanitisedToken = String(sanitiseValue({ value: mockToken }));
        const sanitisedId = String(sanitiseValue({ value: mockAccount.id }));

        expect(verifyEmailAddressSpy).toHaveBeenCalledTimes(1);

        expect(verifyEmailAddressSpy).toHaveBeenCalledWith(sanitisedToken, sanitisedId);
      });

      describe('when api.keystone.account.verifyEmailAddress returns success=true', () => {
        beforeEach(() => {
          verifyEmailAddressSpy = jest.fn(() => Promise.resolve(mockVerifyEmailAddressResponse));

          api.keystone.account.verifyEmailAddress = verifyEmailAddressSpy;
        });

        it('should add successBanner to req.flash', async () => {
          await get(req, res);

          expect(req.flash).toHaveBeenCalledWith('successBanner', 'newAccountVerified');
        });

        it(`should redirect to ${SIGN_IN.ROOT}`, async () => {
          await get(req, res);

          expect(res.redirect).toHaveBeenCalledWith(SIGN_IN.ROOT);
        });
      });

      describe('when api.keystone.account.verifyEmailAddress returns expired=true and an accountId', () => {
        beforeEach(() => {
          verifyEmailAddressSpy = jest.fn(() => Promise.resolve({ success: true, expired: true, accountId: mockAccount.id }));

          api.keystone.account.verifyEmailAddress = verifyEmailAddressSpy;
        });

        it(`should redirect to ${VERIFY_EMAIL_EXPIRED_LINK} with ID param`, async () => {
          await get(req, res);

          const expected = `${VERIFY_EMAIL_EXPIRED_LINK}?id=${mockAccount.id}`;
          expect(res.redirect).toHaveBeenCalledWith(expected);
        });
      });

      describe('when api.keystone.account.verifyEmailAddress returns invalid=true', () => {
        beforeEach(() => {
          verifyEmailAddressSpy = jest.fn(() => Promise.resolve({ success: false, invalid: true }));

          api.keystone.account.verifyEmailAddress = verifyEmailAddressSpy;
        });

        it(`should redirect to ${VERIFY_EMAIL_INVALID_LINK}`, async () => {
          await get(req, res);

          const expected = `${VERIFY_EMAIL_INVALID_LINK}`;

          expect(res.redirect).toHaveBeenCalledWith(expected);
        });
      });

      describe('when api.keystone.account.verifyEmailAddress returns only success=false', () => {
        beforeEach(() => {
          req.query.token = mockToken;

          verifyEmailAddressSpy = jest.fn(() => Promise.resolve({ success: false }));

          api.keystone.account.verifyEmailAddress = verifyEmailAddressSpy;
        });

        it(`should redirect to ${VERIFY_EMAIL_INVALID_LINK}`, async () => {
          await get(req, res);

          expect(res.redirect).toHaveBeenCalledWith(VERIFY_EMAIL_INVALID_LINK);
        });
      });
    });

    describe('when there is no req.query.token', () => {
      beforeEach(() => {
        req.query = {
          id: mockAccount.id,
        };

        api.keystone.account.verifyEmailAddress = verifyEmailAddressSpy;
      });

      it(`should redirect to ${VERIFY_EMAIL_INVALID_LINK}`, async () => {
        await get(req, res);

        expect(res.redirect).toHaveBeenCalledWith(VERIFY_EMAIL_INVALID_LINK);
      });
    });

    describe('when there is no req.query.id', () => {
      beforeEach(() => {
        req.query = {
          token: mockToken,
        };

        api.keystone.account.verifyEmailAddress = verifyEmailAddressSpy;
      });

      it(`should redirect to ${VERIFY_EMAIL_INVALID_LINK}`, async () => {
        await get(req, res);

        expect(res.redirect).toHaveBeenCalledWith(VERIFY_EMAIL_INVALID_LINK);
      });
    });

    describe('api error handling', () => {
      describe('when there is an error', () => {
        beforeEach(() => {
          req.query.token = mockToken;
          req.query.id = mockAccount.id;

          verifyEmailAddressSpy = jest.fn(() => Promise.reject(new Error('mock')));

          api.keystone.account.verifyEmailAddress = verifyEmailAddressSpy;
        });

        it(`should redirect to ${PROBLEM_WITH_SERVICE}`, async () => {
          await get(req, res);

          expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
        });
      });
    });
  });
});
