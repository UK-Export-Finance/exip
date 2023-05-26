import { PAGE_VARIABLES, TEMPLATE, PAGE_CONTENT_STRINGS, get, post } from '.';
import { PAGES } from '../../../../../content-strings';
import { FIELD_IDS, ROUTES, TEMPLATES } from '../../../../../constants';
import { ACCOUNT_FIELDS as FIELDS } from '../../../../../content-strings/fields/insurance/account';
import insuranceCorePageVariables from '../../../../../helpers/page-variables/core/insurance';
import generateValidationErrors from './validation';
import api from '../../../../../api';
import cannotUseNewPasswordValidation from './validation/cannot-use-new-password';
import { Request, Response } from '../../../../../../types';
import { mockReq, mockRes, mockAccount } from '../../../../../test-mocks';

const {
  ACCOUNT: { PASSWORD: FIELD_ID },
} = FIELD_IDS.INSURANCE;

const {
  INSURANCE: {
    ACCOUNT: {
      PASSWORD_RESET: { ROOT: PASSWORD_RESET_ROOT, SUCCESS, LINK_EXPIRED },
    },
    PROBLEM_WITH_SERVICE,
  },
} = ROUTES;

describe('controllers/insurance/account/password-reset/new-password', () => {
  let req: Request;
  let res: Response;

  const mockToken = 'mock-token';

  beforeEach(() => {
    req = mockReq();

    req.query.token = mockToken;

    res = mockRes();
  });

  describe('get', () => {
    const verifyPasswordResetTokenResponse = { success: true };

    let verifyAccountPasswordResetTokenSpy = jest.fn(() => Promise.resolve(verifyPasswordResetTokenResponse));

    beforeEach(() => {
      api.keystone.account.verifyPasswordResetToken = verifyAccountPasswordResetTokenSpy;
    });

    describe('PAGE_VARIABLES', () => {
      it('should have correct properties', () => {
        const expected = {
          FIELD: {
            ID: FIELD_ID,
            ...FIELDS.NEW_PASSWORD[FIELD_ID],
          },
        };

        expect(PAGE_VARIABLES).toEqual(expected);
      });
    });

    describe('TEMPLATE', () => {
      it('should have the correct template defined', () => {
        expect(TEMPLATE).toEqual(TEMPLATES.INSURANCE.ACCOUNT.PASSWORD_RESET.NEW_PASSWORD);
      });
    });

    describe('PAGE_CONTENT_STRINGS', () => {
      it('should have the correct strings', () => {
        expect(PAGE_CONTENT_STRINGS).toEqual(PAGES.INSURANCE.ACCOUNT.PASSWORD_RESET.NEW_PASSWORD);
      });
    });

    it('should render template', async () => {
      await get(req, res);

      expect(res.render).toHaveBeenCalledWith(TEMPLATE, {
        ...insuranceCorePageVariables({
          PAGE_CONTENT_STRINGS,
          BACK_LINK: req.headers.referer,
        }),
        ...PAGE_VARIABLES,
      });
    });

    describe('when there is no req.query.token', () => {
      it(`should redirect to ${PASSWORD_RESET_ROOT}`, async () => {
        delete req.query.token;

        get(req, res);

        expect(res.redirect).toHaveBeenCalledWith(PASSWORD_RESET_ROOT);
      });
    });

    describe('when the api.keystone.account.verifyPasswordResetToken returns success=false', () => {
      beforeEach(() => {
        verifyAccountPasswordResetTokenSpy = jest.fn(() => Promise.resolve({ success: false }));

        api.keystone.account.verifyPasswordResetToken = verifyAccountPasswordResetTokenSpy;
      });

      it(`should redirect to ${LINK_EXPIRED}`, async () => {
        await get(req, res);

        expect(res.redirect).toHaveBeenCalledWith(LINK_EXPIRED);
      });
    });

    describe('when the api.keystone.account.verifyPasswordResetToken returns expired=false', () => {
      beforeEach(() => {
        verifyAccountPasswordResetTokenSpy = jest.fn(() => Promise.resolve({ success: true, expired: true }));

        api.keystone.account.verifyPasswordResetToken = verifyAccountPasswordResetTokenSpy;
      });

      it(`should redirect to ${LINK_EXPIRED}`, async () => {
        await get(req, res);

        expect(res.redirect).toHaveBeenCalledWith(LINK_EXPIRED);
      });
    });

    describe('api error handling', () => {
      describe('when the verify account password reset token API call fails', () => {
        beforeEach(() => {
          verifyAccountPasswordResetTokenSpy = jest.fn(() => Promise.reject());
          api.keystone.account.verifyPasswordResetToken = verifyAccountPasswordResetTokenSpy;
        });

        it(`should redirect to ${PROBLEM_WITH_SERVICE}`, async () => {
          await get(req, res);

          expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
        });
      });
    });
  });

  describe('post', () => {
    const passwordResetResponse = { success: true };

    let passwordResetSpy = jest.fn(() => Promise.resolve(passwordResetResponse));

    const validBody = {
      [FIELD_ID]: mockAccount.password,
    };

    beforeEach(() => {
      api.keystone.account.passwordReset = passwordResetSpy;
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

    describe('when there is no req.query.token', () => {
      it(`should redirect to ${PASSWORD_RESET_ROOT}`, async () => {
        delete req.query.token;

        await post(req, res);

        expect(res.redirect).toHaveBeenCalledWith(PASSWORD_RESET_ROOT);
      });
    });

    describe('when there are no validation errors', () => {
      beforeEach(() => {
        req.query.token = mockToken;
        req.body = validBody;
      });

      it('should call api.keystone.account.passwordReset with req.body and req.headers.origin', async () => {
        await post(req, res);

        expect(passwordResetSpy).toHaveBeenCalledTimes(1);

        expect(passwordResetSpy).toHaveBeenCalledWith(req.query.token, req.body[FIELD_ID]);
      });

      it(`should redirect to ${SUCCESS}`, async () => {
        await post(req, res);

        expect(res.redirect).toHaveBeenCalledWith(SUCCESS);
      });

      describe('when api.keystone.account.passwordReset does not return success=true', () => {
        beforeEach(() => {
          passwordResetSpy = jest.fn(() => Promise.resolve({ success: false }));

          api.keystone.account.passwordReset = passwordResetSpy;
        });

        it(`should redirect to ${PROBLEM_WITH_SERVICE}`, async () => {
          await post(req, res);

          expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
        });
      });

      describe('when the api.keystone.account.passwordReset returns hasBeenUsedBefore=false', () => {
        beforeEach(() => {
          passwordResetSpy = jest.fn(() => Promise.resolve({ success: false, hasBeenUsedBefore: true }));

          api.keystone.account.passwordReset = passwordResetSpy;
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
            validationErrors: cannotUseNewPasswordValidation(),
          });
        });
      });

      describe('api error handling', () => {
        describe('when the password reset API call fails', () => {
          beforeEach(() => {
            passwordResetSpy = jest.fn(() => Promise.reject());
            api.keystone.account.passwordReset = passwordResetSpy;
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
