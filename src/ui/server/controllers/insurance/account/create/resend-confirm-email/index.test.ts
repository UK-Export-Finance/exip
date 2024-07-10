import * as dotenv from 'dotenv';
import { get } from '.';
import { ROUTES } from '../../../../../constants';
import { sanitiseValue } from '../../../../../helpers/sanitise-data';
import api from '../../../../../api';
import { Request, Response } from '../../../../../../types';
import { mockReq, mockRes, mockAccount } from '../../../../../test-mocks';

dotenv.config();

const {
  INSURANCE: {
    ACCOUNT: {
      CREATE: { CONFIRM_EMAIL_RESENT },
    },
    PROBLEM_WITH_SERVICE,
  },
} = ROUTES;

describe('controllers/insurance/account/create/resend-confirm-email', () => {
  let req: Request;
  let res: Response;

  jest.mock('../../../../../api');

  const mockQueryId = mockAccount.id;

  const mockApiResponse = {
    success: true,
  };

  let sendEmailConfirmEmailAddressSpy = jest.fn(() => Promise.resolve(mockApiResponse));

  beforeEach(() => {
    req = mockReq();
    req.query.id = mockQueryId;

    res = mockRes();

    api.keystone.account.sendEmailConfirmEmailAddress = sendEmailConfirmEmailAddressSpy;
  });

  describe('get', () => {
    it('should call api.keystone.account.sendEmailConfirmEmailAddress with ID from req.query', async () => {
      await get(req, res);

      const sanitisedId = String(sanitiseValue({ value: mockQueryId }));

      expect(sendEmailConfirmEmailAddressSpy).toHaveBeenCalledTimes(1);

      const expectedUrlOrigin = `https://${req.headers.host}`;

      expect(sendEmailConfirmEmailAddressSpy).toHaveBeenCalledWith(expectedUrlOrigin, sanitisedId);
    });

    it(`should redirect to ${CONFIRM_EMAIL_RESENT} with query param`, async () => {
      await get(req, res);

      const expected = `${CONFIRM_EMAIL_RESENT}?id=${req.query.id}`;

      expect(res.redirect).toHaveBeenCalledWith(expected);
    });

    describe('when req.query.id is empty', () => {
      it(`should redirect to ${PROBLEM_WITH_SERVICE}`, async () => {
        req.query = { id: '' };
        await get(req, res);

        expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
      });
    });

    describe('when api.keystone.account.sendEmailConfirmEmailAddress does not return success=true', () => {
      const emailFailureResponse = { success: false };

      beforeEach(() => {
        sendEmailConfirmEmailAddressSpy = jest.fn(() => Promise.resolve(emailFailureResponse));

        api.keystone.account.sendEmailConfirmEmailAddress = sendEmailConfirmEmailAddressSpy;
      });

      it(`should redirect to ${PROBLEM_WITH_SERVICE}`, async () => {
        await get(req, res);

        expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
      });
    });

    describe('when there is an error calling the API', () => {
      beforeAll(() => {
        sendEmailConfirmEmailAddressSpy = jest.fn(() => Promise.reject(new Error('mock')));
        api.keystone.account.sendEmailConfirmEmailAddress = sendEmailConfirmEmailAddressSpy;
      });

      it(`should redirect to ${PROBLEM_WITH_SERVICE}`, async () => {
        await get(req, res);

        expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
      });
    });
  });
});
