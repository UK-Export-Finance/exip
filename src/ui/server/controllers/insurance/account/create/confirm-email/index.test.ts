import { TEMPLATE, PAGE_CONTENT_STRINGS, get } from '.';
import { PAGES } from '../../../../../content-strings';
import { ROUTES, TEMPLATES } from '../../../../../constants';
import insuranceCorePageVariables from '../../../../../helpers/page-variables/core/insurance';
import { sanitiseValue } from '../../../../../helpers/sanitise-data';
import getUserNameFromSession from '../../../../../helpers/get-user-name-from-session';
import { Request, Response } from '../../../../../../types';
import api from '../../../../../api';
import { mockReq, mockRes, mockAccount } from '../../../../../test-mocks';

const { PROBLEM_WITH_SERVICE } = ROUTES.INSURANCE;

describe('controllers/insurance/account/create/confirm-email', () => {
  let req: Request;
  let res: Response;

  const mockGetAccountResponse = {
    id: mockAccount.id,
    email: mockAccount.email,
  };

  let getAccountSpy = jest.fn(() => Promise.resolve(mockGetAccountResponse));

  beforeEach(() => {
    req = mockReq();
    req.session.accountIdToConfirm = mockAccount.id;

    res = mockRes();

    api.keystone.account.get = getAccountSpy;
  });

  describe('TEMPLATE', () => {
    it('should have the correct template defined', () => {
      expect(TEMPLATE).toEqual(TEMPLATES.INSURANCE.ACCOUNT.CREATE.CONFIRM_EMAIL);
    });
  });

  describe('PAGE_CONTENT_STRINGS', () => {
    it('should have the correct strings', () => {
      expect(PAGE_CONTENT_STRINGS).toEqual(PAGES.INSURANCE.ACCOUNT.CREATE.CONFIRM_EMAIL);
    });
  });

  describe('get', () => {
    it('should delete accountIdToConfirm from req.session', async () => {
      get(req, res);

      expect(req.session.accountIdToConfirm).toBeUndefined();
    });

    it('should call api.keystone.account.get with ID from session', async () => {
      await get(req, res);

      expect(getAccountSpy).toHaveBeenCalledTimes(1);

      expect(getAccountSpy).toHaveBeenCalledWith(mockAccount.id);
    });

    describe('when accountIdToConfirm is not in the session but there is an ID query param', () => {
      it('should call api.keystone.account.get with ID from query param', async () => {
        const mockId = '1234';
        delete req.session.accountIdToConfirm;
        req.query.id = mockId;

        await get(req, res);

        const sanitisedId = String(sanitiseValue({ value: req.query.id }));

        expect(getAccountSpy).toHaveBeenCalledTimes(1);

        expect(getAccountSpy).toHaveBeenCalledWith(sanitisedId);
      });
    });

    it('should render template', async () => {
      await get(req, res);

      expect(res.render).toHaveBeenCalledWith(TEMPLATE, {
        ...insuranceCorePageVariables({
          PAGE_CONTENT_STRINGS,
          BACK_LINK: req.headers.referer,
        }),
        userName: getUserNameFromSession(req.session.user),
        accountEmail: mockGetAccountResponse.email,
        accountId: mockGetAccountResponse.id,
      });
    });

    describe('when there is no accountIdToConfirm in the session and no ID query param', () => {
      it(`should redirect to ${PROBLEM_WITH_SERVICE}`, async () => {
        delete req.session.accountIdToConfirm;
        req.query = {};

        await get(req, res);

        expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
      });
    });

    describe('when there is an error calling the API', () => {
      beforeAll(() => {
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
