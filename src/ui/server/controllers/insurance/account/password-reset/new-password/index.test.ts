import { PAGE_VARIABLES, TEMPLATE, PAGE_CONTENT_STRINGS, get, post } from '.';
import { PAGES } from '../../../../../content-strings';
import { FIELD_IDS, ROUTES, TEMPLATES } from '../../../../../constants';
import { ACCOUNT_FIELDS as FIELDS } from '../../../../../content-strings/fields/insurance/account';
import insuranceCorePageVariables from '../../../../../helpers/page-variables/core/insurance';
import generateValidationErrors from './validation';
import api from '../../../../../api';
import { Request, Response } from '../../../../../../types';
import { mockReq, mockRes, mockAccount } from '../../../../../test-mocks';

const {
  ACCOUNT: { PASSWORD: FIELD_ID },
} = FIELD_IDS.INSURANCE;

const {
  INSURANCE: {
    ACCOUNT: {
      PASSWORD_RESET: { ROOT: PASSWORD_RESET_ROOT, SUCCESS },
    },
  },
  PROBLEM_WITH_SERVICE,
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

    describe('when there is no req.query.token', () => {
      it(`should redirect to ${PASSWORD_RESET_ROOT}`, async () => {
        delete req.query.token;

        get(req, res);

        expect(res.redirect).toHaveBeenCalledWith(PASSWORD_RESET_ROOT);
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
        req.body = validBody;
      });

      it(`should redirect to ${SUCCESS}`, async () => {
        await post(req, res);

        expect(res.redirect).toHaveBeenCalledWith(SUCCESS);
      });

      describe('when the api.keystone.account.passwordReset does not return success=true', () => {
        beforeEach(() => {
          passwordResetSpy = jest.fn(() => Promise.resolve({ success: false }));

          api.keystone.account.passwordReset = passwordResetSpy;
        });

        it(`should redirect to ${PROBLEM_WITH_SERVICE}`, async () => {
          await post(req, res);

          expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
        });
      });

      describe('api error handling', () => {
        describe('when the password reset API call fails', () => {
          beforeEach(() => {
            passwordResetSpy = jest.fn(() => Promise.reject());
            api.keystone.account.passwordReset = passwordResetSpy;
          });

          it(`should redirect to ${ROUTES.PROBLEM_WITH_SERVICE}`, async () => {
            await post(req, res);

            expect(res.redirect).toHaveBeenCalledWith(ROUTES.PROBLEM_WITH_SERVICE);
          });
        });
      });
    });
  });
});
