import { FIELD_IDS, PAGE_VARIABLES, TEMPLATE, PAGE_CONTENT_STRINGS, get, post } from '.';
import { PAGES } from '../../../../content-strings';
import { ROUTES, TEMPLATES } from '../../../../constants';
import ACCOUNT_FIELD_IDS from '../../../../constants/field-ids/insurance/account';
import { ACCOUNT_FIELDS as FIELDS } from '../../../../content-strings/fields/insurance/account';
import insuranceCorePageVariables from '../../../../helpers/page-variables/core/insurance';
import constructPayload from '../../../../helpers/construct-payload';
import getUserNameFromSession from '../../../../helpers/get-user-name-from-session';
import generateValidationErrors from './validation';
import emailAndPasswordIncorrectValidationErrors from '../../../../shared-validation/email-and-password-incorrect';
import { sanitiseData } from '../../../../helpers/sanitise-data';
import api from '../../../../api';
import { Request, Response } from '../../../../../types';
import { mockReq, mockRes, mockAccount } from '../../../../test-mocks';

const { EMAIL, PASSWORD } = ACCOUNT_FIELD_IDS;

const {
  INSURANCE: {
    ACCOUNT: {
      SIGN_IN: { ENTER_CODE },
      CREATE: { CONFIRM_EMAIL_RESENT },
      SUSPENDED: { ROOT: SUSPENDED_ROOT },
    },
    DASHBOARD,
    PROBLEM_WITH_SERVICE,
  },
} = ROUTES;

describe('controllers/insurance/account/sign-in', () => {
  let req: Request;
  let res: Response;

  const accountSignInResponse = {
    success: true,
    accountId: mockAccount.id,
  };

  let accountSignInSpy = jest.fn(() => Promise.resolve(accountSignInResponse));

  beforeEach(() => {
    req = mockReq();
    req.flash = () => 'mock';

    res = mockRes();

    api.keystone.account.signIn = accountSignInSpy;
  });

  describe('FIELD_IDS', () => {
    it('should have the correct FIELD_IDS', () => {
      const expected = [EMAIL, PASSWORD];

      expect(FIELD_IDS).toEqual(expected);
    });
  });

  describe('PAGE_VARIABLES', () => {
    it('should have correct properties', () => {
      const expected = {
        FIELDS: {
          EMAIL: {
            ID: EMAIL,
            ...FIELDS[EMAIL],
          },
          PASSWORD: {
            ID: PASSWORD,
            ...FIELDS.SIGN_IN[PASSWORD],
          },
        },
      };

      expect(PAGE_VARIABLES).toEqual(expected);
    });
  });

  describe('TEMPLATE', () => {
    it('should have the correct template defined', () => {
      expect(TEMPLATE).toEqual(TEMPLATES.INSURANCE.ACCOUNT.SIGN_IN.ROOT);
    });
  });

  describe('PAGE_CONTENT_STRINGS', () => {
    it('should have the correct strings', () => {
      expect(PAGE_CONTENT_STRINGS).toEqual(PAGES.INSURANCE.ACCOUNT.SIGN_IN.ROOT);
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
        userName: getUserNameFromSession(req.session.user),
        renderSuccessBanner: false,
        renderImportantBanner: false,
        renderBackLink: true,
      });
    });

    describe("when req.flash('successBanner') includes 'newAccountVerified')", () => {
      beforeEach(() => {
        req.flash = (property: string) => {
          const obj = {
            successBanner: 'newAccountVerified',
            importantBanner: '',
          };

          return obj[property];
        };
      });

      it('should render template with renderSuccessBanner and renderBackLink as true', () => {
        get(req, res);

        expect(res.render).toHaveBeenCalledWith(TEMPLATE, {
          ...insuranceCorePageVariables({
            PAGE_CONTENT_STRINGS,
            BACK_LINK: req.headers.referer,
          }),
          ...PAGE_VARIABLES,
          userName: getUserNameFromSession(req.session.user),
          renderSuccessBanner: true,
          renderImportantBanner: false,
          renderBackLink: true,
        });
      });
    });

    describe("when req.flash('importantFlash') includes 'successfulSignOut')", () => {
      beforeEach(() => {
        req.flash = (property: string) => {
          const obj = {
            successBanner: '',
            importantBanner: 'successfulSignOut',
          };

          return obj[property];
        };
      });

      it('should render template with renderImportantBanner and renderBackLink as false', () => {
        get(req, res);

        expect(res.render).toHaveBeenCalledWith(TEMPLATE, {
          ...insuranceCorePageVariables({
            PAGE_CONTENT_STRINGS,
            BACK_LINK: req.headers.referer,
          }),
          ...PAGE_VARIABLES,
          userName: getUserNameFromSession(req.session.user),
          renderSuccessBanner: false,
          renderImportantBanner: true,
          renderBackLink: false,
        });
      });
    });

    describe('when the user is already signed in', () => {
      it(`should redirect to ${DASHBOARD}`, () => {
        req.session = {
          ...req.session,
          user: mockAccount,
        };

        get(req, res);

        expect(res.redirect).toHaveBeenCalledWith(DASHBOARD);
      });
    });
  });

  describe('post', () => {
    const validBody = {
      [EMAIL]: mockAccount.email,
      [PASSWORD]: mockAccount.password,
    };

    describe('when there are validation errors', () => {
      it('should render template with validation errors and submitted values from constructPayload function', async () => {
        await post(req, res);

        const payload = constructPayload(req.body, FIELD_IDS);

        expect(res.render).toHaveBeenCalledWith(TEMPLATE, {
          ...insuranceCorePageVariables({
            PAGE_CONTENT_STRINGS,
            BACK_LINK: req.headers.referer,
          }),
          ...PAGE_VARIABLES,
          renderBackLink: true,
          userName: getUserNameFromSession(req.session.user),
          submittedValues: payload,
          validationErrors: generateValidationErrors(payload),
        });
      });
    });

    describe('when there are no validation errors', () => {
      beforeEach(() => {
        req.body = validBody;
      });

      it('should call api.keystone.account.signIn', async () => {
        await post(req, res);

        expect(accountSignInSpy).toHaveBeenCalledTimes(1);

        const payload = constructPayload(req.body, FIELD_IDS);

        const sanitisedData = sanitiseData(payload);

        expect(accountSignInSpy).toHaveBeenCalledWith(req.headers.origin, sanitisedData[EMAIL], sanitisedData[PASSWORD]);
      });

      it(`should redirect to ${ENTER_CODE}`, async () => {
        await post(req, res);

        expect(res.redirect).toHaveBeenCalledWith(ENTER_CODE);
      });

      it('should add the accountId from response to the session', async () => {
        await post(req, res);

        expect(req.session.accountId).toEqual(accountSignInResponse.accountId);
      });

      describe('when the api.keystone.account.signIn does not return success=true', () => {
        beforeEach(() => {
          accountSignInSpy = jest.fn(() =>
            Promise.resolve({
              ...accountSignInResponse,
              success: false,
            }),
          );

          api.keystone.account.signIn = accountSignInSpy;
        });

        it('should render template with validation errors and submitted values from constructPayload function', async () => {
          await post(req, res);

          const payload = constructPayload(req.body, FIELD_IDS);

          expect(res.render).toHaveBeenCalledWith(TEMPLATE, {
            ...insuranceCorePageVariables({
              PAGE_CONTENT_STRINGS,
              BACK_LINK: req.headers.referer,
            }),
            ...PAGE_VARIABLES,
            renderBackLink: true,
            userName: getUserNameFromSession(req.session.user),
            submittedValues: payload,
            validationErrors: emailAndPasswordIncorrectValidationErrors(payload),
          });
        });
      });

      describe('when the api.keystone.account.signIn returns resentVerificationEmail=true', () => {
        beforeEach(() => {
          accountSignInSpy = jest.fn(() =>
            Promise.resolve({
              ...accountSignInResponse,
              success: false,
              resentVerificationEmail: true,
            }),
          );

          api.keystone.account.signIn = accountSignInSpy;
        });

        it(`should redirect to ${CONFIRM_EMAIL_RESENT} with ID param`, async () => {
          await post(req, res);

          const expected = `${CONFIRM_EMAIL_RESENT}?id=${accountSignInResponse.accountId}`;

          expect(res.redirect).toHaveBeenCalledWith(expected);
        });
      });

      describe('when the api.keystone.account.signIn returns isBlocked=true', () => {
        beforeEach(() => {
          accountSignInSpy = jest.fn(() =>
            Promise.resolve({
              ...accountSignInResponse,
              success: false,
              isBlocked: true,
            }),
          );

          api.keystone.account.signIn = accountSignInSpy;
        });

        it(`should redirect to ${SUSPENDED_ROOT} with ID query param`, async () => {
          await post(req, res);

          expect(res.redirect).toHaveBeenCalledWith(`${SUSPENDED_ROOT}?id=${accountSignInResponse.accountId}`);
        });
      });

      describe('when password only contains numbers', () => {
        it('should call api.keystone.account.signIn with password as a string', async () => {
          req.body[PASSWORD] = '12345';

          await post(req, res);

          expect(accountSignInSpy).toHaveBeenCalledTimes(1);

          const payload = constructPayload(req.body, FIELD_IDS);

          const sanitisedData = sanitiseData(payload);

          expect(accountSignInSpy).toHaveBeenCalledWith(req.headers.origin, sanitisedData[EMAIL], String(sanitisedData[PASSWORD]));
        });
      });
    });

    describe('api error handling', () => {
      describe('when there is an error', () => {
        beforeEach(() => {
          req.body = validBody;

          accountSignInSpy = jest.fn(() => Promise.reject(new Error('mock')));
          api.keystone.account.signIn = accountSignInSpy;
        });

        it(`should redirect to ${PROBLEM_WITH_SERVICE}`, async () => {
          await post(req, res);

          expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
        });
      });
    });
  });
});
