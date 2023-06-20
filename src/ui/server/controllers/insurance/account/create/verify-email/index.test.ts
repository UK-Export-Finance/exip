import { get } from '.';
import { ROUTES } from '../../../../../constants';
import api from '../../../../../api';
import { Request, Response } from '../../../../../../types';
import { mockAccount, mockReq, mockRes } from '../../../../../test-mocks';

const {
  INSURANCE: {
    ACCOUNT: {
      CREATE: { VERIFY_EMAIL_LINK_INVALID, VERIFY_EMAIL_LINK_EXPIRED },
      SIGN_IN,
    },
    PROBLEM_WITH_SERVICE,
  },
} = ROUTES;

describe('controllers/insurance/account/create/verify-email', () => {
  let req: Request;
  let res: Response;

  let verifyEmailAddressSpy;

  const mockVerifyEmailAddressResponse = {
    success: true,
  };

  const mockToken = 'mockToken';

  beforeEach(() => {
    req = mockReq();
    res = mockRes();
  });

  describe('get', () => {
    describe('when req.query.token exists', () => {
      describe('when api.keystone.account.verifyEmailAddress returns success=true', () => {
        beforeEach(() => {
          req.query.token = mockToken;
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
          req.query.token = mockToken;
          verifyEmailAddressSpy = jest.fn(() => Promise.resolve({ success: true, expired: true, accountId: mockAccount.id }));

          api.keystone.account.verifyEmailAddress = verifyEmailAddressSpy;
        });

        it(`should redirect to ${VERIFY_EMAIL_LINK_EXPIRED} with ID param`, async () => {
          await get(req, res);

          const expected = `${VERIFY_EMAIL_LINK_EXPIRED}?id=${mockAccount.id}`;
          expect(res.redirect).toHaveBeenCalledWith(expected);
        });
      });

      describe('when api.keystone.account.verifyEmailAddress returns invalid=true', () => {
        beforeEach(() => {
          req.query.token = mockToken;
          verifyEmailAddressSpy = jest.fn(() => Promise.resolve({ success: false, invalid: true }));

          api.keystone.account.verifyEmailAddress = verifyEmailAddressSpy;
        });

        it(`should redirect to ${VERIFY_EMAIL_LINK_INVALID}`, async () => {
          await get(req, res);

          const expected = `${VERIFY_EMAIL_LINK_INVALID}`;

          expect(res.redirect).toHaveBeenCalledWith(expected);
        });
      });

      describe('when api.keystone.account.verifyEmailAddress returns only success=false', () => {
        beforeEach(() => {
          req.query.token = mockToken;

          verifyEmailAddressSpy = jest.fn(() => Promise.resolve({ success: false }));

          api.keystone.account.verifyEmailAddress = verifyEmailAddressSpy;
        });

        it(`should redirect to ${VERIFY_EMAIL_LINK_INVALID}`, async () => {
          await get(req, res);

          expect(res.redirect).toHaveBeenCalledWith(VERIFY_EMAIL_LINK_INVALID);
        });
      });
    });

    describe('when there is no req.query.token', () => {
      beforeEach(() => {
        req.query = {};
        verifyEmailAddressSpy = jest.fn(() => Promise.resolve({}));

        api.keystone.account.verifyEmailAddress = verifyEmailAddressSpy;
      });

      it(`should redirect to ${VERIFY_EMAIL_LINK_INVALID}`, async () => {
        await get(req, res);

        expect(res.redirect).toHaveBeenCalledWith(VERIFY_EMAIL_LINK_INVALID);
      });
    });

    describe('api error handling', () => {
      describe('when there is an error', () => {
        beforeEach(() => {
          req.query.token = mockToken;
          verifyEmailAddressSpy = jest.fn(() => Promise.reject());

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
