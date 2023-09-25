import { FIELD_IDS, PAGE_VARIABLES, TEMPLATE, PAGE_CONTENT_STRINGS, get, post } from '.';
import { PAGES } from '../../../../../content-strings';
import { ROUTES, TEMPLATES } from '../../../../../constants';
import ACCOUNT_FIELD_IDS from '../../../../../constants/field-ids/insurance/account';
import { ACCOUNT_FIELDS as FIELDS } from '../../../../../content-strings/fields/insurance/account';
import insuranceCorePageVariables from '../../../../../helpers/page-variables/core/insurance';
import constructPayload from '../../../../../helpers/construct-payload';
import getUserNameFromSession from '../../../../../helpers/get-user-name-from-session';
import generateValidationErrors from './validation';
import generateAccountAlreadyExistsValidationErrors from './validation/account-already-exists';
import saveData from './save-data';
import { sanitiseData } from '../../../../../helpers/sanitise-data';
import mapEligibilityAnswers from '../../../../../helpers/map-eligibility-answers';
import api from '../../../../../api';
import { Request, Response } from '../../../../../../types';
import { mockReq, mockRes, mockAccount, mockApplication, mockSession } from '../../../../../test-mocks';

const { FIRST_NAME, LAST_NAME, EMAIL, PASSWORD } = ACCOUNT_FIELD_IDS;

const {
  INSURANCE: {
    ACCOUNT: {
      CREATE: { CONFIRM_EMAIL },
      SIGN_IN,
    },
    DASHBOARD,
    PROBLEM_WITH_SERVICE,
  },
} = ROUTES;

const { referenceNumber } = mockApplication;

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

    const mockCreateApplicationResponse = { referenceNumber };

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
        api.keystone.application.create = createApplicationSpy;
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

        it('should wipe req.session.submittedData.insuranceEligibility', async () => {
          await post(req, res);

          expect(req.session.submittedData.insuranceEligibility).toEqual({});
        });

        it('should call api.keystone.application.create', async () => {
          const sanitisedData = sanitiseData(req.session.submittedData.insuranceEligibility);

          const eligibilityAnswers = mapEligibilityAnswers(sanitisedData);

          await post(req, res);

          expect(createApplicationSpy).toHaveBeenCalledTimes(1);

          expect(createApplicationSpy).toHaveBeenCalledWith(eligibilityAnswers, mockSaveDataResponse.id);
        });

        it(`should redirect to ${CONFIRM_EMAIL}`, async () => {
          await post(req, res);

          expect(res.redirect).toHaveBeenCalledWith(CONFIRM_EMAIL);
        });

        describe('when an application is not successfully created', () => {
          beforeEach(() => {
            // @ts-ignore
            createApplicationSpy = jest.fn(() => Promise.resolve());

            api.keystone.application.create = createApplicationSpy;
          });

          it(`should redirect to ${PROBLEM_WITH_SERVICE}`, async () => {
            await post(req, res);

            expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
          });
        });
      });

      describe('when req.session.submittedData.insuranceEligibility is an empty object', () => {
        it('should NOT call api.keystone.application.create', async () => {
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

        describe('when success=false is returned', () => {
          beforeEach(() => {
            const saveDataSpy = jest.fn(() => Promise.resolve({ success: false }));

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
              validationErrors: generateAccountAlreadyExistsValidationErrors(),
            });
          });
        });

        describe('when there is an error', () => {
          beforeEach(() => {
            const saveDataSpy = jest.fn(() => Promise.reject(new Error('Mock error')));

            saveData.account = saveDataSpy;
          });

          it(`should redirect to ${PROBLEM_WITH_SERVICE}`, async () => {
            await post(req, res);

            expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
          });
        });
      });

      describe('api.keystone.application.create', () => {
        describe('when the create application API call fails', () => {
          beforeEach(() => {
            req.body = validBody;

            createApplicationSpy = jest.fn(() => Promise.reject());
            api.keystone.application.create = createApplicationSpy;
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
