import { TEMPLATE, PAGE_CONTENT_STRINGS, get, post } from '.';
import { PAGES } from '../../../../../content-strings';
import { TEMPLATES } from '../../../../../constants';
import { INSURANCE_ROUTES } from '../../../../../constants/routes/insurance';
import insuranceCorePageVariables from '../../../../../helpers/page-variables/core/insurance';
import { sanitiseValue } from '../../../../../helpers/sanitise-data';
import api from '../../../../../api';
import { Request, Response } from '../../../../../../types';
import { mockReq, mockRes, mockAccount, mockSpyPromiseRejection } from '../../../../../test-mocks';

const {
  ACCOUNT: {
    SUSPENDED: { EMAIL_SENT },
  },
  PROBLEM_WITH_SERVICE,
} = INSURANCE_ROUTES;

describe('controllers/insurance/account/suspended/expired-link', () => {
  let req: Request;
  let res: Response;

  beforeEach(() => {
    req = mockReq();

    req.session.emailAddressForAccountReactivation = mockAccount.email;

    res = mockRes();
  });

  describe('TEMPLATE', () => {
    it('should have the correct template defined', () => {
      expect(TEMPLATE).toEqual(TEMPLATES.INSURANCE.ACCOUNT.SUSPENDED.VERIFY_EMAIL_EXPIRED_LINK);
    });
  });

  describe('PAGE_CONTENT_STRINGS', () => {
    it('should have the correct strings', () => {
      expect(PAGE_CONTENT_STRINGS).toEqual(PAGES.INSURANCE.ACCOUNT.SUSPENDED.VERIFY_EMAIL_EXPIRED_LINK);
    });
  });

  it('should render template', () => {
    get(req, res);

    expect(res.render).toHaveBeenCalledWith(TEMPLATE, {
      ...insuranceCorePageVariables({
        PAGE_CONTENT_STRINGS,
        BACK_LINK: req.headers.referer,
      }),
    });
  });

  describe('post', () => {
    const sendEmailReactivateAccountLinkResponse = { success: true, email: mockAccount.email };

    let sendEmailReactivateAccountLinkResponseSpy = jest.fn(() => Promise.resolve(sendEmailReactivateAccountLinkResponse));

    const sanitisedId = String(sanitiseValue({ value: mockAccount.id }));

    beforeEach(() => {
      api.keystone.account.sendEmailReactivateAccountLink = sendEmailReactivateAccountLinkResponseSpy;

      req.query.id = mockAccount.id;
    });

    it('should call api.keystone.account.sendEmailReactivateAccountLink with req.headers.origin and sanitised ID', async () => {
      await post(req, res);

      expect(sendEmailReactivateAccountLinkResponseSpy).toHaveBeenCalledTimes(1);

      expect(sendEmailReactivateAccountLinkResponseSpy).toHaveBeenCalledWith(req.headers.origin, sanitisedId);
    });

    it('should add the submitted email to req.session.emailAddressForAccountReactivation', async () => {
      await post(req, res);

      expect(req.session.emailAddressForAccountReactivation).toEqual(sendEmailReactivateAccountLinkResponse.email);
    });

    it(`should redirect to ${EMAIL_SENT} with ID param`, async () => {
      await post(req, res);

      expect(res.redirect).toHaveBeenCalledWith(EMAIL_SENT);
    });

    describe('when api.keystone.account.sendEmailReactivateAccountLink returns success=false', () => {
      beforeEach(() => {
        sendEmailReactivateAccountLinkResponseSpy = jest.fn(() => Promise.resolve({ success: false, email: mockAccount.email }));

        api.keystone.account.sendEmailReactivateAccountLink = sendEmailReactivateAccountLinkResponseSpy;
      });

      it(`should redirect to ${PROBLEM_WITH_SERVICE}`, async () => {
        await post(req, res);

        expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
      });
    });

    describe('api error handling', () => {
      describe('when the send email reactivate account link API call fails', () => {
        beforeEach(() => {
          sendEmailReactivateAccountLinkResponseSpy = mockSpyPromiseRejection;
          api.keystone.account.sendEmailReactivateAccountLink = sendEmailReactivateAccountLinkResponseSpy;
        });

        it(`should redirect to ${PROBLEM_WITH_SERVICE}`, async () => {
          await post(req, res);

          expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
        });
      });
    });
  });
});
