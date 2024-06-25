import { TEMPLATE, PAGE_CONTENT_STRINGS, get, post } from '.';
import { PAGES } from '../../../../../content-strings';
import { ROUTES, TEMPLATES } from '../../../../../constants';
import insuranceCorePageVariables from '../../../../../helpers/page-variables/core/insurance';
import { sanitiseValue } from '../../../../../helpers/sanitise-data';
import getUserNameFromSession from '../../../../../helpers/get-user-name-from-session';
import api from '../../../../../api';
import { Request, Response } from '../../../../../../types';
import { mockAccount, mockReq, mockRes } from '../../../../../test-mocks';

const {
  INSURANCE: {
    ACCOUNT: {
      CREATE: { CONFIRM_EMAIL, CONFIRM_EMAIL_RESENT },
    },
    PROBLEM_WITH_SERVICE,
  },
} = ROUTES;

describe('controllers/insurance/account/create/verify-email-expired-link', () => {
  let req: Request;
  let res: Response;

  const mockQueryId = mockAccount.id;

  beforeEach(() => {
    req = mockReq();

    req.query = {
      id: mockQueryId,
    };

    res = mockRes();
  });

  describe('TEMPLATE', () => {
    it('should have the correct template defined', () => {
      expect(TEMPLATE).toEqual(TEMPLATES.INSURANCE.ACCOUNT.CREATE.VERIFY_EMAIL_EXPIRED_LINK);
    });
  });

  describe('PAGE_CONTENT_STRINGS', () => {
    it('should have the correct strings', () => {
      expect(PAGE_CONTENT_STRINGS).toEqual(PAGES.INSURANCE.ACCOUNT.CREATE.VERIFY_EMAIL_EXPIRED_LINK);
    });
  });

  describe('get', () => {
    it('should render template', () => {
      get(req, res);

      const sanitisedId = String(sanitiseValue({ value: mockQueryId }));

      expect(res.render).toHaveBeenCalledWith(TEMPLATE, {
        ...insuranceCorePageVariables({
          PAGE_CONTENT_STRINGS,
          BACK_LINK: `${CONFIRM_EMAIL}?id=${sanitisedId}`,
        }),
        userName: getUserNameFromSession(req.session.user),
      });
    });

    describe('when req.query.id does NOT exist', () => {
      beforeEach(() => {
        req.query = {};
      });

      it(`should redirect to ${PROBLEM_WITH_SERVICE}`, async () => {
        await get(req, res);

        expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
      });
    });
  });

  describe('post', () => {
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

    it('should call api.keystone.account.sendEmailConfirmEmailAddress with ID from req.query', async () => {
      await post(req, res);

      const sanitisedId = String(sanitiseValue({ value: mockQueryId }));

      expect(sendEmailConfirmEmailAddressSpy).toHaveBeenCalledTimes(1);

      const expectedUrlOrigin = req.headers.origin;

      expect(sendEmailConfirmEmailAddressSpy).toHaveBeenCalledWith(expectedUrlOrigin, sanitisedId);
    });

    it(`should redirect to ${CONFIRM_EMAIL_RESENT} with query param`, async () => {
      await post(req, res);

      const expected = `${CONFIRM_EMAIL_RESENT}?id=${req.query.id}`;

      expect(res.redirect).toHaveBeenCalledWith(expected);
    });

    describe('when req.query.id is empty', () => {
      it(`should redirect to ${PROBLEM_WITH_SERVICE}`, async () => {
        req.query = { id: '' };
        await post(req, res);

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
        await post(req, res);

        expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
      });
    });

    describe('when there is an error calling the API', () => {
      beforeAll(() => {
        sendEmailConfirmEmailAddressSpy = jest.fn(() => Promise.reject(new Error('mock')));
        api.keystone.account.sendEmailConfirmEmailAddress = sendEmailConfirmEmailAddressSpy;
      });

      it(`should redirect to ${PROBLEM_WITH_SERVICE}`, async () => {
        await post(req, res);

        expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
      });
    });
  });
});
