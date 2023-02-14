import { TEMPLATE, PAGE_CONTENT_STRINGS, get } from '.';
import { PAGES } from '../../../../../content-strings';
import { ROUTES, TEMPLATES } from '../../../../../constants';
import insuranceCorePageVariables from '../../../../../helpers/page-variables/core/insurance';
import { Request, Response } from '../../../../../../types';
import api from '../../../../../api';
import { mockReq, mockRes, mockAccount } from '../../../../../test-mocks';

describe('controllers/insurance/account/create/confirm-email', () => {
  let req: Request;
  let res: Response;

  const mockGetByEmailResponse = {
    id: mockAccount.id,
    email: mockAccount.email,
  };

  let getByEmailSpy = jest.fn(() => Promise.resolve(mockGetByEmailResponse));

  beforeEach(() => {
    req = mockReq();
    req.session.emailAddressToConfirm = mockAccount.email;

    res = mockRes();

    api.keystone.account.getByEmail = getByEmailSpy;
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
    it('should delete emailAddressToConfirm from req.session', async () => {
      get(req, res);

      expect(req.session.emailAddressToConfirm).toBeUndefined();
    });

    it('should call api.keystone.account.getByEmail with email from session', async () => {
      await get(req, res);

      expect(getByEmailSpy).toHaveBeenCalledTimes(1);

      expect(getByEmailSpy).toHaveBeenCalledWith(mockAccount.email);
    });

    it('should render template', async () => {
      await get(req, res);

      expect(res.render).toHaveBeenCalledWith(TEMPLATE, {
        ...insuranceCorePageVariables({
          PAGE_CONTENT_STRINGS,
          BACK_LINK: req.headers.referer,
        }),
        exporterEmail: mockGetByEmailResponse.email,
        exporterId: mockGetByEmailResponse.id,
      });
    });

    describe('api error handling', () => {
      describe('when there is an error', () => {
        beforeEach(() => {
          getByEmailSpy = jest.fn(() => Promise.reject());
          api.keystone.account.getByEmail = getByEmailSpy;
        });

        it(`should redirect to ${ROUTES.PROBLEM_WITH_SERVICE}`, async () => {
          await get(req, res);

          expect(res.redirect).toHaveBeenCalledWith(ROUTES.PROBLEM_WITH_SERVICE);
        });
      });
    });
  });
});
