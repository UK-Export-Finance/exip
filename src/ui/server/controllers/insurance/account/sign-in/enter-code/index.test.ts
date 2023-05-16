import { PAGE_VARIABLES, TEMPLATE, PAGE_CONTENT_STRINGS, get, post } from '.';
import { PAGES } from '../../../../../content-strings';
import { FIELD_IDS, ROUTES, TEMPLATES } from '../../../../../constants';
import { ACCOUNT_FIELDS as FIELDS } from '../../../../../content-strings/fields/insurance/account';
import insuranceCorePageVariables from '../../../../../helpers/page-variables/core/insurance';
import getUserNameFromSession from '../../../../../helpers/get-user-name-from-session';
import { sanitiseValue } from '../../../../../helpers/sanitise-data';
import generateValidationErrors from './validation';
import securityCodeValidationErrors from './validation/rules/security-code';
import api from '../../../../../api';
import { Request, Response } from '../../../../../../types';
import { mockReq, mockRes, mockAccount, mockApplication, mockSession } from '../../../../../test-mocks';

const {
  ACCOUNT: { SECURITY_CODE },
} = FIELD_IDS.INSURANCE;

const {
  INSURANCE: {
    ACCOUNT: {
      SIGN_IN: { ROOT: SIGN_IN_ROOT },
    },
    DASHBOARD,
  },
} = ROUTES;

describe('controllers/insurance/account/sign-in/enter-code', () => {
  let req: Request;
  let res: Response;

  const { referenceNumber } = mockApplication;

  beforeEach(() => {
    req = mockReq();
    req.flash = () => 'mock';

    req.session.accountId = mockAccount.id;

    res = mockRes();
  });

  describe('PAGE_VARIABLES', () => {
    it('should have correct properties', () => {
      const expected = {
        FIELD: {
          ID: SECURITY_CODE,
          ...FIELDS[SECURITY_CODE],
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
          };

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

    describe('when there is no req.session.accountId', () => {
      beforeEach(() => {
        delete req.session.accountId;
      });

      it(`should redirect to ${SIGN_IN_ROOT}`, () => {
        get(req, res);

        expect(res.redirect).toHaveBeenCalledWith(SIGN_IN_ROOT);
      });
    });

    describe('when there is no req.session.accountId', () => {
      beforeEach(() => {
        delete req.session.accountId;
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

    const mockCreateApplicationResponse = { referenceNumber };

    let createApplicationSpy = jest.fn(() => Promise.resolve(mockCreateApplicationResponse));

    const validBody = {
      [SECURITY_CODE]: '123456',
    };

    beforeEach(() => {
      api.keystone.account.verifyAccountSignInCode = verifyAccountSignInCodeSpy;
      api.keystone.application.create = createApplicationSpy;
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
      it('should render template with validation errors and submitted values', async () => {
        await post(req, res);

        expect(res.render).toHaveBeenCalledWith(TEMPLATE, {
          ...insuranceCorePageVariables({
            PAGE_CONTENT_STRINGS,
            BACK_LINK: req.headers.referer,
          }),
          ...PAGE_VARIABLES,
          userName: getUserNameFromSession(req.session.user),
          submittedValues: req.body,
          validationErrors: generateValidationErrors(req.body),
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

        const sanitisedSecurityCode = sanitiseValue(SECURITY_CODE, validBody[SECURITY_CODE]);

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

      it(`should redirect to ${DASHBOARD}`, async () => {
        await post(req, res);

        expect(res.redirect).toHaveBeenCalledWith(DASHBOARD);
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

        it('should call api.keystone.application.create', async () => {
          await post(req, res);

          expect(createApplicationSpy).toHaveBeenCalledTimes(1);

          expect(createApplicationSpy).toHaveBeenCalledWith(req.session.submittedData.insuranceEligibility, verifyAccountSignInCodeResponse.accountId);
        });

        it(`should redirect to ${DASHBOARD}`, async () => {
          await post(req, res);

          const expected = `${DASHBOARD}`;

          expect(res.redirect).toHaveBeenCalledWith(expected);
        });

        describe('when an application is not succesfully created', () => {
          beforeEach(() => {
            // @ts-ignore
            createApplicationSpy = jest.fn(() => Promise.resolve());

            api.keystone.application.create = createApplicationSpy;
          });

          it(`should redirect to ${ROUTES.PROBLEM_WITH_SERVICE}`, async () => {
            await post(req, res);

            expect(res.redirect).toHaveBeenCalledWith(ROUTES.PROBLEM_WITH_SERVICE);
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

        it('should render template with validation errors and submitted values', async () => {
          await post(req, res);

          expect(res.render).toHaveBeenCalledWith(TEMPLATE, {
            ...insuranceCorePageVariables({
              PAGE_CONTENT_STRINGS,
              BACK_LINK: req.headers.referer,
            }),
            ...PAGE_VARIABLES,
            userName: getUserNameFromSession(req.session.user),
            submittedValues: req.body,
            validationErrors: securityCodeValidationErrors({}, {}),
          });
        });
      });
    });

    describe('api error handling', () => {
      describe('when the verify account sign in code API call fails', () => {
        beforeEach(() => {
          req.body = validBody;

          verifyAccountSignInCodeSpy = jest.fn(() => Promise.reject());
          api.keystone.account.verifyAccountSignInCode = verifyAccountSignInCodeSpy;
        });

        it(`should redirect to ${ROUTES.PROBLEM_WITH_SERVICE}`, async () => {
          await post(req, res);

          expect(res.redirect).toHaveBeenCalledWith(ROUTES.PROBLEM_WITH_SERVICE);
        });
      });

      describe('when the create application API call fails', () => {
        beforeEach(() => {
          req.body = validBody;

          createApplicationSpy = jest.fn(() => Promise.reject());
          api.keystone.application.create = createApplicationSpy;
        });

        it(`should redirect to ${ROUTES.PROBLEM_WITH_SERVICE}`, async () => {
          await post(req, res);

          expect(res.redirect).toHaveBeenCalledWith(ROUTES.PROBLEM_WITH_SERVICE);
        });
      });
    });
  });
});
