import { pageVariables, TEMPLATE, FIELD_IDS, get, post } from '.';
import { TEMPLATES } from '../../../../constants';
import { INSURANCE_ROUTES } from '../../../../constants/routes/insurance';
import POLICY_FIELD_IDS from '../../../../constants/field-ids/insurance/policy';
import { PAGES } from '../../../../content-strings';
import { POLICY_FIELDS as FIELDS } from '../../../../content-strings/fields/insurance';
import insuranceCorePageVariables from '../../../../helpers/page-variables/core/insurance';
import getUserNameFromSession from '../../../../helpers/get-user-name-from-session';
import mapApplicationToFormFields from '../../../../helpers/mappings/map-application-to-form-fields';
import generateValidationErrors from './validation';
import constructPayload from '../../../../helpers/construct-payload';
import mapAndSave from '../map-and-save/policy';
import { Request, Response } from '../../../../../types';
import { mockReq, mockRes, mockApplication } from '../../../../test-mocks';

const {
  INSURANCE_ROOT,
  PROBLEM_WITH_SERVICE,
  POLICY: {
    TYPE_OF_POLICY_SAVE_AND_BACK,
    SINGLE_CONTRACT_POLICY,
    SINGLE_CONTRACT_POLICY_CHECK_AND_CHANGE,
    MULTIPLE_CONTRACT_POLICY,
    MULTIPLE_CONTRACT_POLICY_CHECK_AND_CHANGE,
  },
} = INSURANCE_ROUTES;

const {
  TYPE_OF_POLICY: { POLICY_TYPE: FIELD_ID },
} = POLICY_FIELD_IDS;

const { referenceNumber } = mockApplication;

const singlePolicyRoute = `${INSURANCE_ROOT}/${referenceNumber}${SINGLE_CONTRACT_POLICY}`;
const multiplePolicyRoute = `${INSURANCE_ROOT}/${referenceNumber}${MULTIPLE_CONTRACT_POLICY}`;
const checkAndChangeRoute = `${INSURANCE_ROOT}/${referenceNumber}${SINGLE_CONTRACT_POLICY_CHECK_AND_CHANGE}`;

describe('controllers/insurance/policy/type-of-policy', () => {
  let req: Request;
  let res: Response;
  let refNumber: number;

  jest.mock('../save-data/policy');

  const mockSavePolicyData = jest.fn(() => Promise.resolve(true));
  mapAndSave.policy = mockSavePolicyData;

  beforeEach(() => {
    req = mockReq();
    res = mockRes();

    req.params.referenceNumber = String(referenceNumber);
    refNumber = Number(referenceNumber);
  });
  afterAll(() => {
    jest.resetAllMocks();
  });

  describe('pageVariables', () => {
    it('should have correct properties', () => {
      const result = pageVariables(refNumber);

      const expected = {
        FIELD: FIELDS[FIELD_ID],
        SAVE_AND_BACK_URL: `${INSURANCE_ROOT}/${req.params.referenceNumber}${TYPE_OF_POLICY_SAVE_AND_BACK}`,
      };

      expect(result).toEqual(expected);
    });
  });

  describe('TEMPLATE', () => {
    it('should have the correct template defined', () => {
      expect(TEMPLATE).toEqual(TEMPLATES.INSURANCE.POLICY.TYPE_OF_POLICY);
    });
  });

  describe('FIELD_IDS', () => {
    it('should have the correct FIELD_IDS', () => {
      const expected = [FIELD_ID];

      expect(FIELD_IDS).toEqual(expected);
    });
  });

  describe('get', () => {
    it('should render template', async () => {
      await get(req, res);
      const expectedVariables = {
        ...insuranceCorePageVariables({
          PAGE_CONTENT_STRINGS: PAGES.INSURANCE.POLICY.TYPE_OF_POLICY,
          BACK_LINK: req.headers.referer,
        }),
        ...pageVariables(refNumber),
        userName: getUserNameFromSession(req.session.user),
        application: mapApplicationToFormFields(res.locals.application),
      };

      expect(res.render).toHaveBeenCalledWith(TEMPLATE, expectedVariables);
    });

    describe('when there is no application', () => {
      beforeEach(() => {
        delete res.locals.application;
      });

      it(`should redirect to ${PROBLEM_WITH_SERVICE}`, async () => {
        await get(req, res);
        expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
      });
    });
  });

  describe('post', () => {
    describe('when there are no validation errors', () => {
      beforeEach(() => {
        const FIELD = FIELDS[FIELD_ID];
        req.body = {
          [FIELD_ID]: FIELD?.OPTIONS?.SINGLE?.VALUE,
        };
      });

      it('should call mapAndSave.policy with data from constructPayload function and application', async () => {
        await post(req, res);

        const payload = constructPayload(req.body, FIELD_IDS);

        expect(mapAndSave.policy).toHaveBeenCalledTimes(1);

        expect(mapAndSave.policy).toHaveBeenCalledWith(payload, res.locals.application);
      });

      describe('when the answer is `single`', () => {
        it(`should redirect to ${singlePolicyRoute}`, async () => {
          await post(req, res);

          expect(res.redirect).toHaveBeenCalledWith(singlePolicyRoute);
        });

        describe("when the url's last substring is `change`", () => {
          it(`should redirect to ${singlePolicyRoute}/change`, async () => {
            req.originalUrl += '/change';

            await post(req, res);

            const expected = `${singlePolicyRoute}/change`;

            expect(res.redirect).toHaveBeenCalledWith(expected);
          });
        });

        describe("when the url's last substring is `check-and-change`", () => {
          it(`should redirect to ${SINGLE_CONTRACT_POLICY_CHECK_AND_CHANGE}`, async () => {
            req.originalUrl = checkAndChangeRoute;

            await post(req, res);

            const expected = `${INSURANCE_ROOT}/${refNumber}${SINGLE_CONTRACT_POLICY_CHECK_AND_CHANGE}`;

            expect(res.redirect).toHaveBeenCalledWith(expected);
          });
        });
      });

      describe('when the answer is `multi`', () => {
        beforeEach(() => {
          const FIELD = FIELDS[FIELD_ID];
          req.body = {
            [FIELD_ID]: FIELD?.OPTIONS?.MULTIPLE?.VALUE,
          };
        });

        it('should call mapAndSave.policy with data from constructPayload function and application', async () => {
          await post(req, res);

          const payload = constructPayload(req.body, FIELD_IDS);

          expect(mapAndSave.policy).toHaveBeenCalledTimes(1);

          expect(mapAndSave.policy).toHaveBeenCalledWith(payload, res.locals.application);
        });

        it(`should redirect to ${multiplePolicyRoute}`, async () => {
          await post(req, res);

          expect(res.redirect).toHaveBeenCalledWith(multiplePolicyRoute);
        });

        describe("when the url's last substring is `change`", () => {
          it(`should redirect to ${multiplePolicyRoute}/change`, async () => {
            req.originalUrl += '/change';

            await post(req, res);

            const expected = `${multiplePolicyRoute}/change`;

            expect(res.redirect).toHaveBeenCalledWith(expected);
          });
        });

        describe("when the url's last substring is `check-and-change`", () => {
          it(`should redirect to ${MULTIPLE_CONTRACT_POLICY_CHECK_AND_CHANGE}`, async () => {
            req.originalUrl = checkAndChangeRoute;

            await post(req, res);

            const expected = `${INSURANCE_ROOT}/${refNumber}${MULTIPLE_CONTRACT_POLICY_CHECK_AND_CHANGE}`;

            expect(res.redirect).toHaveBeenCalledWith(expected);
          });
        });
      });
    });

    describe('when there are validation errors', () => {
      it('should render template with validation errors from constructPayload function', async () => {
        await post(req, res);

        const payload = constructPayload(req.body, FIELD_IDS);

        const expectedVariables = {
          ...insuranceCorePageVariables({
            PAGE_CONTENT_STRINGS: PAGES.INSURANCE.POLICY.TYPE_OF_POLICY,
            BACK_LINK: req.headers.referer,
          }),
          ...pageVariables(refNumber),
          userName: getUserNameFromSession(req.session.user),
          validationErrors: generateValidationErrors(payload),
        };

        expect(res.render).toHaveBeenCalledWith(TEMPLATE, expectedVariables);
      });
    });

    describe('when the submitted answer is not a recognised policy type', () => {
      beforeEach(() => {
        req.body = {
          [FIELD_ID]: 'Unrecognised policy type',
        };
      });

      it('should render template with validation errors from constructPayload function', async () => {
        await post(req, res);

        const payload = constructPayload(req.body, FIELD_IDS);

        const expectedVariables = {
          ...insuranceCorePageVariables({
            PAGE_CONTENT_STRINGS: PAGES.INSURANCE.POLICY.TYPE_OF_POLICY,
            BACK_LINK: req.headers.referer,
          }),
          ...pageVariables(refNumber),
          userName: getUserNameFromSession(req.session.user),
          validationErrors: generateValidationErrors(payload),
        };

        expect(res.render).toHaveBeenCalledWith(TEMPLATE, expectedVariables);
      });
    });

    describe('when there is no application', () => {
      beforeEach(() => {
        delete res.locals.application;
      });

      it(`should redirect to ${PROBLEM_WITH_SERVICE}`, async () => {
        await post(req, res);

        expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
      });
    });

    describe('api error handling', () => {
      beforeEach(() => {
        const FIELD = FIELDS[FIELD_ID];

        req.body = {
          [FIELD_ID]: FIELD?.OPTIONS?.SINGLE?.VALUE,
        };
      });

      describe('mapAndSave.policy call', () => {
        describe('when a true boolean is not returned', () => {
          beforeEach(() => {
            const savePolicyDataSpy = jest.fn(() => Promise.resolve(false));

            mapAndSave.policy = savePolicyDataSpy;
          });

          it(`should redirect to ${PROBLEM_WITH_SERVICE}`, async () => {
            await post(req, res);

            expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
          });
        });

        describe('when there is an error', () => {
          beforeEach(() => {
            const savePolicyDataSpy = jest.fn(() => Promise.reject(new Error('mock')));

            mapAndSave.policy = savePolicyDataSpy;
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
