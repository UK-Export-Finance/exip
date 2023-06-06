import { PAGE_VARIABLES, TEMPLATE, PAGE_CONTENT_STRINGS, get, post } from '.';
import { PAGES } from '../../../../content-strings';
import { FIELD_IDS, ROUTES, TEMPLATES } from '../../../../constants';
import { ACCOUNT_FIELDS as FIELDS } from '../../../../content-strings/fields/insurance/account';
import insuranceCorePageVariables from '../../../../helpers/page-variables/core/insurance';
import { sanitiseValue } from '../../../../helpers/sanitise-data';
import generateValidationErrors from './validation';
import api from '../../../../api';
import accountDoesNotExistValidation from './validation/account-does-not-exist';
import { Request, Response } from '../../../../../types';
import { mockReq, mockRes, mockAccount } from '../../../../test-mocks';

const {
  ACCOUNT: { EMAIL: FIELD_ID },
} = FIELD_IDS.INSURANCE;

const {
  INSURANCE: {
    ACCOUNT: {
      PASSWORD_RESET: { LINK_SENT },
      SUSPENDED: { ROOT: SUSPENDED_ROOT },
    },
    PROBLEM_WITH_SERVICE,
  },
} = ROUTES;

describe('controllers/insurance/account/password-reset', () => {
  let req: Request;
  let res: Response;

  beforeEach(() => {
    req = mockReq();

    res = mockRes();
  });

  describe('PAGE_VARIABLES', () => {
    it('should have correct properties', () => {
      const expected = {
        FIELD: {
          ID: FIELD_ID,
          ...FIELDS.PASSWORD_RESET[FIELD_ID],
        },
      };

      expect(PAGE_VARIABLES).toEqual(expected);
    });
  });

  describe('TEMPLATE', () => {
    it('should have the correct template defined', () => {
      expect(TEMPLATE).toEqual(TEMPLATES.INSURANCE.ACCOUNT.PASSWORD_RESET.ROOT);
    });
  });

  describe('PAGE_CONTENT_STRINGS', () => {
    it('should have the correct strings', () => {
      expect(PAGE_CONTENT_STRINGS).toEqual(PAGES.INSURANCE.ACCOUNT.PASSWORD_RESET.ROOT);
    });
  });

  describe('get', () => {
    it('should render template', () => {
      get(req, res);

      expect(res.render).toHaveBeenCalledWith(TEMPLATE, {
        ...insuranceCorePageVariables({
          PAGE_CONTENT_STRINGS,
          BACK_LINK: req.headers.referer,
        }),
        ...PAGE_VARIABLES,
      });
    });
  });

  describe('post', () => {
    const sendEmailPasswordResetLinkResponse = { success: true, accountId: mockAccount.id };

    let sendEmailPasswordResetLinkSpy = jest.fn(() => Promise.resolve(sendEmailPasswordResetLinkResponse));

    const validBody = {
      [FIELD_ID]: mockAccount.email,
    };

    beforeEach(() => {
      api.keystone.account.sendEmailPasswordResetLink = sendEmailPasswordResetLinkSpy;
    });

    describe('when there are validation errors', () => {
      it('should render template with validation errors and submitted values', async () => {
        await post(req, res);

        expect(res.render).toHaveBeenCalledWith(TEMPLATE, {
          ...insuranceCorePageVariables({
            PAGE_CONTENT_STRINGS,
            BACK_LINK: req.headers.referer,
          }),
          ...PAGE_VARIABLES,
          submittedValues: req.body,
          validationErrors: generateValidationErrors(req.body),
        });
      });
    });

    describe('when there are no validation errors', () => {
      const sanitisedEmail = sanitiseValue(FIELD_ID, validBody[FIELD_ID]);

      beforeEach(() => {
        req.body = validBody;
      });

      it('should call api.keystone.account.sendEmailPasswordResetLink with req.headers.origin and sanitised email', async () => {
        await post(req, res);

        expect(sendEmailPasswordResetLinkSpy).toHaveBeenCalledTimes(1);

        expect(sendEmailPasswordResetLinkSpy).toHaveBeenCalledWith(req.headers.origin, sanitisedEmail);
      });

      it('should add the submitted email to req.session.emailAddressForPasswordReset', async () => {
        await post(req, res);

        expect(req.session.emailAddressForPasswordReset).toEqual(sanitisedEmail);
      });

      it(`should redirect to ${LINK_SENT}`, async () => {
        await post(req, res);

        expect(res.redirect).toHaveBeenCalledWith(LINK_SENT);
      });

      describe('when the api.keystone.account.sendEmailPasswordResetLink returns success=false', () => {
        beforeEach(() => {
          sendEmailPasswordResetLinkSpy = jest.fn(() => Promise.resolve({ success: false, accountId: mockAccount.id }));

          api.keystone.account.sendEmailPasswordResetLink = sendEmailPasswordResetLinkSpy;
        });

        it('should render template with validation errors and submitted values', async () => {
          await post(req, res);

          expect(res.render).toHaveBeenCalledWith(TEMPLATE, {
            ...insuranceCorePageVariables({
              PAGE_CONTENT_STRINGS,
              BACK_LINK: req.headers.referer,
            }),
            ...PAGE_VARIABLES,
            submittedValues: req.body,
            validationErrors: accountDoesNotExistValidation(),
          });
        });
      });

      describe('when the api.keystone.account.sendEmailPasswordResetLink returns isBlocked=true', () => {
        beforeEach(() => {
          sendEmailPasswordResetLinkSpy = jest.fn(() => Promise.resolve({ success: false, isBlocked: true, accountId: mockAccount.id }));

          api.keystone.account.sendEmailPasswordResetLink = sendEmailPasswordResetLinkSpy;
        });

        it(`should redirect to ${SUSPENDED_ROOT} with ID query param`, async () => {
          await post(req, res);

          expect(res.redirect).toHaveBeenCalledWith(`${SUSPENDED_ROOT}?id=${sendEmailPasswordResetLinkResponse.accountId}`);
        });
      });

      describe('api error handling', () => {
        describe('when the send email password reset link API call fails', () => {
          beforeEach(() => {
            req.body = validBody;

            sendEmailPasswordResetLinkSpy = jest.fn(() => Promise.reject());
            api.keystone.account.sendEmailPasswordResetLink = sendEmailPasswordResetLinkSpy;
          });

          it(`should redirect to ${PROBLEM_WITH_SERVICE}`, async () => {
            await post(req, res);

            expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
          });
        });
      });
    });
  });
});
