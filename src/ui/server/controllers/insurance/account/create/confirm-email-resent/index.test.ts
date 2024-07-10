import { TEMPLATE, PAGE_CONTENT_STRINGS, get } from '.';
import { PAGES } from '../../../../../content-strings';
import { ROUTES, TEMPLATES } from '../../../../../constants';
import insuranceCorePageVariables from '../../../../../helpers/page-variables/core/insurance';
import getUserNameFromSession from '../../../../../helpers/get-user-name-from-session';
import { sanitiseValue } from '../../../../../helpers/sanitise-data';
import { Request, Response } from '../../../../../../types';
import api from '../../../../../api';
import { mockReq, mockRes, mockAccount } from '../../../../../test-mocks';

const { PROBLEM_WITH_SERVICE } = ROUTES.INSURANCE;

describe('controllers/insurance/account/create/confirm-email-resent', () => {
  let req: Request;
  let res: Response;

  const mockQueryId = mockAccount.id;

  const mockGetAccountResponse = {
    success: true,
    email: mockAccount.email,
  };

  let getAccountSpy = jest.fn(() => Promise.resolve(mockGetAccountResponse));

  beforeEach(() => {
    req = mockReq();
    req.query.id = mockQueryId;

    res = mockRes();

    api.keystone.account.get = getAccountSpy;
  });

  describe('TEMPLATE', () => {
    it('should have the correct template defined', () => {
      expect(TEMPLATE).toEqual(TEMPLATES.INSURANCE.ACCOUNT.CREATE.CONFIRM_EMAIL_RESENT);
    });
  });

  describe('PAGE_CONTENT_STRINGS', () => {
    it('should have the correct strings', () => {
      const expected = {
        ...PAGES.INSURANCE.ACCOUNT.CREATE.CONFIRM_EMAIL,
        ...PAGES.INSURANCE.ACCOUNT.CREATE.CONFIRM_EMAIL_RESENT,
      };

      expect(PAGE_CONTENT_STRINGS).toEqual(expected);
    });
  });

  describe('get', () => {
    const sanitisedId = String(sanitiseValue({ value: mockQueryId }));

    it('should call api.keystone.account.get with ID from req.query', async () => {
      await get(req, res);

      expect(getAccountSpy).toHaveBeenCalledTimes(1);

      expect(getAccountSpy).toHaveBeenCalledWith(sanitisedId);
    });

    it('should render template', async () => {
      await get(req, res);

      expect(res.render).toHaveBeenCalledWith(TEMPLATE, {
        ...insuranceCorePageVariables({
          PAGE_CONTENT_STRINGS,
          BACK_LINK: `${req.headers.referer}?id=${req.query.id}`,
        }),
        userName: getUserNameFromSession(req.session.user),
        accountEmail: mockGetAccountResponse.email,
        accountId: sanitisedId,
      });
    });

    describe('when req.query.id is NOT provided', () => {
      it(`should redirect to ${PROBLEM_WITH_SERVICE}`, async () => {
        req.query = {};
        await get(req, res);

        expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
      });
    });

    describe('when req.query.id is empty', () => {
      it(`should redirect to ${PROBLEM_WITH_SERVICE}`, async () => {
        req.query = { id: '' };
        await get(req, res);

        expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
      });
    });

    describe('when api.keystone.account.get does not return anything', () => {
      beforeEach(() => {
        req.query.id = mockAccount.id;

        api.keystone.account.get = jest.fn(() => Promise.resolve());
      });

      it(`should redirect to ${PROBLEM_WITH_SERVICE}`, async () => {
        await get(req, res);

        expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
      });
    });

    describe('when api.keystone.account.get does not return an email', () => {
      beforeEach(() => {
        req.query.id = mockAccount.id;

        getAccountSpy = jest.fn(() =>
          Promise.resolve({
            success: true,
            email: '',
          }),
        );

        api.keystone.account.get = getAccountSpy;
      });

      it(`should redirect to ${PROBLEM_WITH_SERVICE}`, async () => {
        await get(req, res);

        expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
      });
    });

    describe('when there is an error calling the API', () => {
      beforeAll(() => {
        req.query.id = mockAccount.id;

        getAccountSpy = jest.fn(() => Promise.reject(new Error('mock')));
        api.keystone.account.get = getAccountSpy;
      });

      it(`should redirect to ${PROBLEM_WITH_SERVICE}`, async () => {
        await get(req, res);

        expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
      });
    });
  });
});
