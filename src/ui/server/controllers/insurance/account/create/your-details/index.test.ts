import { FIELD_IDS, PAGE_VARIABLES, TEMPLATE, PAGE_CONTENT_STRINGS, get, post } from '.';
import { PAGES } from '../../../../../content-strings';
import { TEMPLATES } from '../../../../../constants';
import { INSURANCE_ROUTES } from '../../../../../constants/routes/insurance';
import ACCOUNT_FIELD_IDS from '../../../../../constants/field-ids/insurance/account';
import { ACCOUNT_FIELDS as FIELDS } from '../../../../../content-strings/fields/insurance/account';
import insuranceCorePageVariables from '../../../../../helpers/page-variables/core/insurance';
import constructPayload from '../../../../../helpers/construct-payload';
import getUserNameFromSession from '../../../../../helpers/get-user-name-from-session';
import generateValidationErrors from './validation';
import generateAccountAlreadyExistsValidation from './validation/account-already-exists/invalid-password';
import accountAlreadyExistsAlreadyVerifiedValidation from './validation/account-already-exists/already-verified';
import saveData from './save-data';
import application from '../../../../../helpers/create-an-application';
import { Request, Response } from '../../../../../../types';
import { mockReq, mockRes, mockAccount, mockSession, mockCreateApplicationResponse } from '../../../../../test-mocks';

const { FIRST_NAME, LAST_NAME, EMAIL, PASSWORD } = ACCOUNT_FIELD_IDS;

const {
  ACCOUNT: {
    CREATE: { CONFIRM_EMAIL },
    SIGN_IN,
    SUSPENDED: { EMAIL_SENT },
  },
  DASHBOARD,
  PROBLEM_WITH_SERVICE,
} = INSURANCE_ROUTES;

describe('controllers/insurance/account/create/your-details', () => {
  let req: Request;
  let res: Response;

  jest.mock('./save-data');

  const mockSaveDataResponse = {
    success: true,
    id: mockAccount.id,
    email: mockAccount.email,
  };

  saveData.account = jest.fn(() => Promise.resolve(mockSaveDataResponse));

  beforeEach(() => {
    req = mockReq();
    res = mockRes();
  });

  describe('PAGE_VARIABLES', () => {
    it('should have correct properties', () => {
      const expected = {
        FIELDS: {
          FIRST_NAME: {
            ID: FIRST_NAME,
            ...FIELDS.CREATE.YOUR_DETAILS[FIRST_NAME],
          },
          LAST_NAME: {
            ID: LAST_NAME,
            ...FIELDS.CREATE.YOUR_DETAILS[LAST_NAME],
          },
          EMAIL: {
            ID: EMAIL,
            ...FIELDS[EMAIL],
          },
          PASSWORD: {
            ID: PASSWORD,
            ...FIELDS.CREATE.YOUR_DETAILS[PASSWORD],
          },
        },
        SIGN_IN_LINK: SIGN_IN.ROOT,
      };

      expect(PAGE_VARIABLES).toEqual(expected);
    });
  });

  describe('TEMPLATE', () => {
    it('should have the correct template defined', () => {
      expect(TEMPLATE).toEqual(TEMPLATES.INSURANCE.ACCOUNT.CREATE.YOUR_DETAILS);
    });
  });

  describe('PAGE_CONTENT_STRINGS', () => {
    it('should have the correct strings', () => {
      expect(PAGE_CONTENT_STRINGS).toEqual(PAGES.INSURANCE.ACCOUNT.CREATE.YOUR_DETAILS);
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
      [FIRST_NAME]: mockAccount.firstName,
      [LAST_NAME]: mockAccount.lastName,
      [EMAIL]: mockAccount.email,
      [PASSWORD]: mockAccount.password,
    };

    let createApplicationSpy = jest.fn(() => Promise.resolve(mockCreateApplicationResponse));

    describe('when there are validation errors', () => {
      it('should render template with validation errors and submitted values', async () => {
        await post(req, res);

        const payload = constructPayload(req.body, FIELD_IDS);

        expect(res.render).toHaveBeenCalledWith(TEMPLATE, {
          ...insuranceCorePageVariables({
            PAGE_CONTENT_STRINGS,
            BACK_LINK: req.headers.referer,
          }),
          ...PAGE_VARIABLES,
          userName: getUserNameFromSession(req.session.user),
          submittedValues: payload,
          validationErrors: generateValidationErrors(payload),
        });
      });
    });

    describe('when there are no validation errors', () => {
      beforeEach(() => {
        req.body = validBody;
        application.create = createApplicationSpy;
      });

      it('should call saveData.account with req.body and req.headers.origin', async () => {
        await post(req, res);

        expect(saveData.account).toHaveBeenCalledTimes(1);

        expect(saveData.account).toHaveBeenCalledWith(req.headers.origin, req.body);
      });

      it('should add the account ID to req.session.accountIdToConfirm', async () => {
        await post(req, res);

        expect(req.session.accountIdToConfirm).toEqual(mockSaveDataResponse.id);
      });

      it(`should redirect to ${CONFIRM_EMAIL}`, async () => {
        await post(req, res);

        expect(res.redirect).toHaveBeenCalledWith(CONFIRM_EMAIL);
      });

      describe('when there are eligibility answers in the session', () => {
        beforeEach(() => {
          req.session = {
            ...req.session,
            submittedData: {
              ...req.session.submittedData,
              insuranceEligibility: mockSession.submittedData.insuranceEligibility,
            },
          };
        });

        it('should call application.create', async () => {
          await post(req, res);

          expect(createApplicationSpy).toHaveBeenCalledTimes(1);

          expect(createApplicationSpy).toHaveBeenCalledWith(mockSession.submittedData.insuranceEligibility, mockSaveDataResponse.id);
        });

        it('should wipe req.session.submittedData.insuranceEligibility', async () => {
          await post(req, res);

          expect(req.session.submittedData.insuranceEligibility).toEqual({});
        });

        it(`should redirect to ${CONFIRM_EMAIL}`, async () => {
          await post(req, res);

          expect(res.redirect).toHaveBeenCalledWith(CONFIRM_EMAIL);
        });

        describe('when saveData.account returns isBlocked', () => {
          beforeEach(() => {
            const response = {
              ...mockSaveDataResponse,
              isBlocked: true,
            };

            saveData.account = jest.fn(() => Promise.resolve(response));
          });

          it(`should redirect to ${EMAIL_SENT}`, async () => {
            await post(req, res);

            expect(res.redirect).toHaveBeenCalledWith(EMAIL_SENT);
          });
        });

        describe('when an application is not successfully created', () => {
          beforeEach(() => {
            createApplicationSpy = jest.fn(() =>
              Promise.resolve({
                ...mockCreateApplicationResponse,
                success: false,
              }),
            );

            application.create = createApplicationSpy;
          });

          it(`should redirect to ${PROBLEM_WITH_SERVICE}`, async () => {
            await post(req, res);

            expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
          });

          it('should NOT wipe req.session.submittedData.insuranceEligibility', async () => {
            await post(req, res);

            const expected = mockSession.submittedData.insuranceEligibility;

            expect(req.session.submittedData.insuranceEligibility).toEqual(expected);
          });
        });
      });

      describe('when req.session.submittedData.insuranceEligibility is an empty object', () => {
        it('should NOT call application.create', async () => {
          req.session.submittedData.insuranceEligibility = {};

          await post(req, res);

          expect(createApplicationSpy).toHaveBeenCalledTimes(0);
        });
      });
    });

    describe('api error handling', () => {
      describe('saveData.account call', () => {
        beforeEach(() => {
          req.body = validBody;
        });

        describe('when no account is returned', () => {
          beforeEach(() => {
            const saveDataSpy = jest.fn(() => Promise.resolve(false));

            saveData.account = saveDataSpy;
          });

          it(`should redirect to ${PROBLEM_WITH_SERVICE}`, async () => {
            await post(req, res);

            expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
          });
        });

        describe('when isVerified=true is returned', () => {
          beforeEach(() => {
            const saveDataSpy = jest.fn(() => Promise.resolve({ isVerified: true }));

            saveData.account = saveDataSpy;
          });

          it('should render template with validation errors from constructPayload function', async () => {
            await post(req, res);

            const payload = constructPayload(req.body, FIELD_IDS);

            expect(res.render).toHaveBeenCalledWith(TEMPLATE, {
              ...insuranceCorePageVariables({
                PAGE_CONTENT_STRINGS,
                BACK_LINK: req.headers.referer,
              }),
              ...PAGE_VARIABLES,
              userName: getUserNameFromSession(req.session.user),
              submittedValues: payload,
              validationErrors: accountAlreadyExistsAlreadyVerifiedValidation(),
            });
          });
        });

        describe('when isVerified=true is NOT returned', () => {
          beforeEach(() => {
            const saveDataSpy = jest.fn(() => Promise.resolve({ isVerified: false }));

            saveData.account = saveDataSpy;
          });

          it('should render template with validation errors from constructPayload function', async () => {
            await post(req, res);

            const payload = constructPayload(req.body, FIELD_IDS);

            expect(res.render).toHaveBeenCalledWith(TEMPLATE, {
              ...insuranceCorePageVariables({
                PAGE_CONTENT_STRINGS,
                BACK_LINK: req.headers.referer,
              }),
              ...PAGE_VARIABLES,
              userName: getUserNameFromSession(req.session.user),
              submittedValues: payload,
              validationErrors: generateAccountAlreadyExistsValidation(),
            });
          });
        });

        describe('when there is an error', () => {
          beforeEach(() => {
            const saveDataSpy = jest.fn(() => Promise.reject(new Error('mock')));

            saveData.account = saveDataSpy;
          });

          it(`should redirect to ${PROBLEM_WITH_SERVICE}`, async () => {
            await post(req, res);

            expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
          });
        });
      });

      describe('when the application.create call fails', () => {
        beforeEach(() => {
          req.session = {
            ...req.session,
            submittedData: {
              ...req.session.submittedData,
              insuranceEligibility: mockSession.submittedData.insuranceEligibility,
            },
          };

          req.body = validBody;

          createApplicationSpy = jest.fn(() => Promise.reject(new Error('mock')));
          application.create = createApplicationSpy;
        });

        it(`should redirect to ${PROBLEM_WITH_SERVICE}`, async () => {
          await post(req, res);

          expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
        });

        it('should NOT wipe req.session.submittedData.insuranceEligibility', async () => {
          await post(req, res);

          const expected = mockSession.submittedData.insuranceEligibility;

          expect(req.session.submittedData.insuranceEligibility).toEqual(expected);
        });
      });
    });
  });
});
