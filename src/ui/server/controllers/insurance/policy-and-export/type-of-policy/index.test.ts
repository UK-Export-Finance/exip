import { pageVariables, get, post, TEMPLATE } from '.';
import { FIELD_IDS, ROUTES, TEMPLATES } from '../../../../constants';
import { PAGES } from '../../../../content-strings';
import { POLICY_AND_EXPORTS_FIELDS as FIELDS } from '../../../../content-strings/fields/insurance';
import { Request, Response } from '../../../../../types';
import insuranceCorePageVariables from '../../../../helpers/page-variables/core/insurance';
import generateValidationErrors from './validation';
import mapAndSave from '../map-and-save';
import { mockReq, mockRes, mockApplication } from '../../../../test-mocks';

const { INSURANCE } = ROUTES;
const {
  INSURANCE_ROOT,
  POLICY_AND_EXPORTS: { CHECK_YOUR_ANSWERS },
} = INSURANCE;
const { POLICY_AND_EXPORTS } = FIELD_IDS.INSURANCE;

const FIELD_ID = POLICY_AND_EXPORTS.POLICY_TYPE;

describe('controllers/insurance/policy-and-export/type-of-policy', () => {
  let req: Request;
  let res: Response;
  let refNumber: number;

  jest.mock('../save-data');

  const mockSavePolicyAndExportData = jest.fn(() => Promise.resolve(true));
  mapAndSave.policyAndExport = mockSavePolicyAndExportData;

  beforeEach(() => {
    req = mockReq();
    res = mockRes();

    res.locals.application = mockApplication;
    req.params.referenceNumber = String(mockApplication.referenceNumber);
    refNumber = Number(mockApplication.referenceNumber);
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  describe('pageVariables', () => {
    it('should have correct properties', () => {
      const result = pageVariables(refNumber);

      const expected = {
        FIELD: FIELDS[POLICY_AND_EXPORTS.POLICY_TYPE],
        SAVE_AND_BACK_URL: `${INSURANCE_ROOT}/${req.params.referenceNumber}${INSURANCE.POLICY_AND_EXPORTS.TYPE_OF_POLICY_SAVE_AND_BACK}`,
      };

      expect(result).toEqual(expected);
    });
  });

  describe('TEMPLATE', () => {
    it('should have the correct template defined', () => {
      expect(TEMPLATE).toEqual(TEMPLATES.INSURANCE.POLICY_AND_EXPORTS.TYPE_OF_POLICY);
    });
  });

  describe('get', () => {
    it('should render template', async () => {
      await get(req, res);

      const expectedVariables = {
        ...insuranceCorePageVariables({
          PAGE_CONTENT_STRINGS: PAGES.INSURANCE.POLICY_AND_EXPORTS.TYPE_OF_POLICY,
          BACK_LINK: req.headers.referer,
        }),
        ...pageVariables(refNumber),
        application: res.locals.application,
      };

      expect(res.render).toHaveBeenCalledWith(TEMPLATE, expectedVariables);
    });

    describe('when there is no application', () => {
      beforeEach(() => {
        res.locals = { csrfToken: '1234' };
      });

      it(`should redirect to ${ROUTES.PROBLEM_WITH_SERVICE}`, async () => {
        await get(req, res);

        expect(res.redirect).toHaveBeenCalledWith(ROUTES.PROBLEM_WITH_SERVICE);
      });
    });
  });

  describe('post', () => {
    describe('when there are no validation errors', () => {
      beforeEach(() => {
        req.body = {
          [FIELD_ID]: FIELDS[FIELD_ID]?.OPTIONS?.SINGLE.VALUE,
        };
      });

      it('should call mapAndSave.policyAndExport with req.body and application', async () => {
        await post(req, res);

        expect(mapAndSave.policyAndExport).toHaveBeenCalledTimes(1);

        expect(mapAndSave.policyAndExport).toHaveBeenCalledWith(req.body, res.locals.application);
      });

      describe('when the answer is `single`', () => {
        it(`should redirect to ${ROUTES.INSURANCE.POLICY_AND_EXPORTS.SINGLE_CONTRACT_POLICY}`, async () => {
          await post(req, res);

          const expected = `${INSURANCE_ROOT}/${refNumber}${ROUTES.INSURANCE.POLICY_AND_EXPORTS.SINGLE_CONTRACT_POLICY}`;

          expect(res.redirect).toHaveBeenCalledWith(expected);
        });
      });

      describe('when the answer is `multi`', () => {
        it(`should redirect to ${ROUTES.INSURANCE.POLICY_AND_EXPORTS.MULTIPLE_CONTRACT_POLICY}`, async () => {
          req.body[FIELD_ID] = FIELDS[FIELD_ID]?.OPTIONS?.MULTIPLE.VALUE;

          await post(req, res);

          const referenceNumber = Number(req.params.referenceNumber);

          const expected = `${INSURANCE_ROOT}/${referenceNumber}${ROUTES.INSURANCE.POLICY_AND_EXPORTS.MULTIPLE_CONTRACT_POLICY}`;

          expect(res.redirect).toHaveBeenCalledWith(expected);
        });
      });

      describe("when the url's last substring is `change`", () => {
        it(`should redirect to ${CHECK_YOUR_ANSWERS}`, async () => {
          req.originalUrl = ROUTES.INSURANCE.POLICY_AND_EXPORTS.TYPE_OF_POLICY_CHANGE;

          await post(req, res);

          const expected = `${INSURANCE_ROOT}/${refNumber}${CHECK_YOUR_ANSWERS}`;

          expect(res.redirect).toHaveBeenCalledWith(expected);
        });
      });
    });

    describe('when there are validation errors', () => {
      it('should render template with validation errors', async () => {
        await post(req, res);

        const expectedVariables = {
          ...insuranceCorePageVariables({
            PAGE_CONTENT_STRINGS: PAGES.INSURANCE.POLICY_AND_EXPORTS.TYPE_OF_POLICY,
            BACK_LINK: req.headers.referer,
          }),
          ...pageVariables(refNumber),
          validationErrors: generateValidationErrors(req.body),
        };

        expect(res.render).toHaveBeenCalledWith(TEMPLATE, expectedVariables);
      });
    });

    describe('when there is no application', () => {
      beforeEach(() => {
        res.locals = { csrfToken: '1234' };
      });

      it(`should redirect to ${ROUTES.PROBLEM_WITH_SERVICE}`, async () => {
        await post(req, res);

        expect(res.redirect).toHaveBeenCalledWith(ROUTES.PROBLEM_WITH_SERVICE);
      });
    });

    describe('when the submitted answer is not a recognised policy type', () => {
      beforeEach(() => {
        req.body = {
          [FIELD_ID]: 'Unrecognised policy type',
        };
      });

      it(`should redirect to ${ROUTES.PROBLEM_WITH_SERVICE}`, async () => {
        await post(req, res);

        expect(res.redirect).toHaveBeenCalledWith(ROUTES.PROBLEM_WITH_SERVICE);
      });
    });

    describe('api error handling', () => {
      beforeEach(() => {
        req.body = {
          [FIELD_ID]: FIELDS[FIELD_ID]?.OPTIONS?.SINGLE.VALUE,
        };
      });

      describe('mapAndSave.policyAndExport call', () => {
        describe('when no application is returned', () => {
          beforeEach(() => {
            const savePolicyAndExportDataSpy = jest.fn(() => Promise.resolve(false));

            mapAndSave.policyAndExport = savePolicyAndExportDataSpy;
          });

          it(`should redirect to ${ROUTES.PROBLEM_WITH_SERVICE}`, async () => {
            await post(req, res);

            expect(res.redirect).toHaveBeenCalledWith(ROUTES.PROBLEM_WITH_SERVICE);
          });
        });

        describe('when there is an error', () => {
          beforeEach(() => {
            const savePolicyAndExportDataSpy = jest.fn(() => Promise.reject(new Error('Mock error')));

            mapAndSave.policyAndExport = savePolicyAndExportDataSpy;
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
