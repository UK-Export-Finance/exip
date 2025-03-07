import { FIELD_ID, PAGE_VARIABLES, TEMPLATE, PAGE_CONTENT_STRINGS, get, post } from '.';
import { PAGES } from '../../../../../content-strings';
import { FIELD_IDS, TEMPLATES } from '../../../../../constants';
import { INSURANCE_ROUTES } from '../../../../../constants/routes/insurance';
import { ACCOUNT_FIELDS as FIELDS } from '../../../../../content-strings/fields/insurance/account';
import insuranceCorePageVariables from '../../../../../helpers/page-variables/core/insurance';
import getUserNameFromSession from '../../../../../helpers/get-user-name-from-session';
import constructPayload from '../../../../../helpers/construct-payload';
import { sanitiseValue } from '../../../../../helpers/sanitise-data';
import generateValidationErrors from './validation';
import accessCodeValidationErrors from './validation/rules/access-code';
import application from '../../../../../helpers/create-an-application';
import api from '../../../../../api';
import { Request, Response, ObjectType } from '../../../../../../types';
import {
  mockReq,
  mockRes,
  mockAccount,
  mockSession,
  mockApplications,
  mockCreateApplicationResponse,
  mockSpyPromiseRejection,
} from '../../../../../test-mocks';

const {
  ACCOUNT: { ACCESS_CODE },
} = FIELD_IDS.INSURANCE;

const {
  ACCOUNT: {
    SIGN_IN: { ROOT: SIGN_IN_ROOT },
  },
  DASHBOARD,
  INSURANCE_ROOT,
  ALL_SECTIONS,
  PROBLEM_WITH_SERVICE,
} = INSURANCE_ROUTES;

describe('controllers/insurance/account/sign-in/enter-code', () => {
  let req: Request;
  let res: Response;

  beforeEach(() => {
    req = mockReq();
    req.flash = () => 'mock';

    req.session.accountId = mockAccount.id;

    res = mockRes();
  });

  describe('FIELD_ID', () => {
    it('should have the correct ID', () => {
      const expected = ACCESS_CODE;

      expect(FIELD_ID).toEqual(expected);
    });
  });

  describe('PAGE_VARIABLES', () => {
    it('should have correct properties', () => {
      const expected = {
        FIELD: {
          ID: FIELD_ID,
          ...FIELDS[ACCESS_CODE],
        },
      };

      expect(PAGE_VARIABLES).toEqual(expected);
    });
  });

  describe('TEMPLATE', () => {
    it('should have the correct template defined', () => {
      expect(TEMPLATE).toEqual(TEMPLATES.INSURANCE.ACCOUNT.SIGN_IN.ENTER_CODE);
    });
  });

  describe('PAGE_CONTENT_STRINGS', () => {
    it('should have the correct strings', () => {
      expect(PAGE_CONTENT_STRINGS).toEqual(PAGES.INSURANCE.ACCOUNT.SIGN_IN.ENTER_CODE);
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
      });
    });

    describe("when req.flash('successBanner') includes 'newSecurityCodeSent')", () => {
      beforeEach(() => {
        req.flash = (property: string) => {
          const obj = {
            successBanner: 'newSecurityCodeSent',
          } as ObjectType;

          return obj[property];
        };
      });

      it('should render template with renderSuccessBanner', () => {
        get(req, res);

        expect(res.render).toHaveBeenCalledWith(TEMPLATE, {
          ...insuranceCorePageVariables({
            PAGE_CONTENT_STRINGS,
            BACK_LINK: req.headers.referer,
          }),
          ...PAGE_VARIABLES,
          userName: getUserNameFromSession(req.session.user),
          renderSuccessBanner: true,
        });
      });
    });

    describe('when there is req.session.user.id', () => {
      beforeEach(() => {
        req.session.user = mockAccount;
      });

      it(`should redirect to ${DASHBOARD}`, () => {
        get(req, res);

        expect(res.redirect).toHaveBeenCalledWith(DASHBOARD);
      });
    });

    describe('when there is no req.session.accountId', () => {
      beforeEach(() => {
        delete req.session.accountId;
        delete req.session.user;
      });

      it(`should redirect to ${SIGN_IN_ROOT}`, () => {
        get(req, res);

        expect(res.redirect).toHaveBeenCalledWith(SIGN_IN_ROOT);
      });
    });
  });

  describe('post', () => {
    const verifyAccountSignInCodeResponse = {
      success: true,
      ...mockAccount,
      accountId: mockAccount.id,
      token: 'mockToken',
      expires: new Date(),
    };

    let verifyAccountSignInCodeSpy = jest.fn(() => Promise.resolve(verifyAccountSignInCodeResponse));

    let createApplicationSpy = jest.fn(() => Promise.resolve(mockCreateApplicationResponse));

    let getApplicationsSpy = jest.fn(() => Promise.resolve({ applications: mockApplications, totalApplications: 3 }));

    const validBody = {
      [ACCESS_CODE]: '123456',
    };

    beforeEach(() => {
      api.keystone.account.verifyAccountSignInCode = verifyAccountSignInCodeSpy;
      api.keystone.applications.getAll = getApplicationsSpy;
      application.create = createApplicationSpy;
    });

    describe('when there is no req.session.accountId', () => {
      beforeEach(() => {
        delete req.session.accountId;
      });

      it(`should redirect to ${SIGN_IN_ROOT}`, async () => {
        await post(req, res);

        expect(res.redirect).toHaveBeenCalledWith(SIGN_IN_ROOT);
      });
    });

    describe('when there are validation errors', () => {
      it('should render template with validation errors and submitted values from constructPayload function', async () => {
        await post(req, res);

        const payload = constructPayload(req.body, [FIELD_ID]);

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
      });

      it('should call api.keystone.account.verifyAccountSignInCode', async () => {
        await post(req, res);

        expect(verifyAccountSignInCodeSpy).toHaveBeenCalledTimes(1);

        const submittedCode = req.body[FIELD_ID];

        const sanitisedSecurityCode = sanitiseValue({
          key: FIELD_ID,
          value: submittedCode,
        });

        expect(verifyAccountSignInCodeSpy).toHaveBeenCalledWith(req.session.accountId, String(sanitisedSecurityCode));
      });

      it('should update req.session.user', async () => {
        await post(req, res);

        const expected = {
          id: verifyAccountSignInCodeResponse.accountId,
          firstName: verifyAccountSignInCodeResponse.firstName,
          lastName: verifyAccountSignInCodeResponse.lastName,
          email: verifyAccountSignInCodeResponse.email,
          token: verifyAccountSignInCodeResponse.token,
          expires: verifyAccountSignInCodeResponse.expires,
        };

        expect(req.session.user).toEqual(expected);
      });

      it(`should redirect to ${DASHBOARD} when there is more than 1 applications for the user`, async () => {
        await post(req, res);

        expect(res.redirect).toHaveBeenCalledWith(DASHBOARD);
      });

      it(`should redirect to ${DASHBOARD} when there are no applications for the user`, async () => {
        getApplicationsSpy = jest.fn(() => Promise.resolve({ applications: [], totalApplications: 0 }));
        api.keystone.applications.getAll = getApplicationsSpy;
        await post(req, res);

        expect(res.redirect).toHaveBeenCalledWith(DASHBOARD);
      });

      it('should redirect to an application when there is only 1 application for the user', async () => {
        getApplicationsSpy = jest.fn(() => Promise.resolve({ applications: [mockApplications[0]], totalApplications: 1 }));
        api.keystone.applications.getAll = getApplicationsSpy;

        await post(req, res);

        expect(res.redirect).toHaveBeenCalledWith(`${INSURANCE_ROOT}/${mockApplications[0].referenceNumber}${ALL_SECTIONS}`);
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

          api.keystone.applications.getAll = () => Promise.resolve({ applications: mockApplications, totalApplications: 3 });
        });

        it('should call application.create', async () => {
          await post(req, res);

          expect(createApplicationSpy).toHaveBeenCalledTimes(1);

          expect(createApplicationSpy).toHaveBeenCalledWith(mockSession.submittedData.insuranceEligibility, verifyAccountSignInCodeResponse.accountId);
        });

        it('should wipe req.session.submittedData.insuranceEligibility', async () => {
          await post(req, res);

          expect(req.session.submittedData.insuranceEligibility).toEqual({});
        });

        it(`should redirect to ${DASHBOARD}`, async () => {
          await post(req, res);

          const expected = `${DASHBOARD}`;

          expect(res.redirect).toHaveBeenCalledWith(expected);
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

      describe('when the api.keystone.account.verifyAccountSignInCode does not return success=true', () => {
        beforeEach(() => {
          verifyAccountSignInCodeSpy = jest.fn(() =>
            Promise.resolve({
              ...verifyAccountSignInCodeResponse,
              success: false,
            }),
          );

          api.keystone.account.verifyAccountSignInCode = verifyAccountSignInCodeSpy;
        });

        it('should render template with validation errors and submitted values from constructPayload function', async () => {
          await post(req, res);

          const payload = constructPayload(req.body, [FIELD_ID]);

          expect(res.render).toHaveBeenCalledWith(TEMPLATE, {
            ...insuranceCorePageVariables({
              PAGE_CONTENT_STRINGS,
              BACK_LINK: req.headers.referer,
            }),
            ...PAGE_VARIABLES,
            userName: getUserNameFromSession(req.session.user),
            submittedValues: payload,
            validationErrors: accessCodeValidationErrors({}, {}),
          });
        });
      });
    });

    describe('api error handling', () => {
      describe('when the verify account sign in code API call fails', () => {
        beforeEach(() => {
          req.body = validBody;

          verifyAccountSignInCodeSpy = mockSpyPromiseRejection;
          api.keystone.account.verifyAccountSignInCode = verifyAccountSignInCodeSpy;
        });

        it(`should redirect to ${PROBLEM_WITH_SERVICE}`, async () => {
          await post(req, res);

          expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
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

          createApplicationSpy = mockSpyPromiseRejection;
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

      describe('when the get all application API call fails', () => {
        beforeEach(() => {
          req.body = validBody;

          api.keystone.account.verifyAccountSignInCode = verifyAccountSignInCodeSpy;
          api.keystone.applications.getAll = () => Promise.reject(new Error('mock'));
          application.create = createApplicationSpy;
        });

        it(`should redirect to ${PROBLEM_WITH_SERVICE}`, async () => {
          await post(req, res);

          expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
        });
      });
    });
  });
});
