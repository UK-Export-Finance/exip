import { pageVariables, get, post, TEMPLATE } from '.';
import { FIELD_IDS, ROUTES, TEMPLATES } from '../../../../constants';
import { PAGES } from '../../../../content-strings';
import { FIELDS } from '../../../../content-strings/fields/insurance';
import { Request, Response } from '../../../../../types';
import insuranceCorePageVariables from '../../../../helpers/page-variables/core/insurance';
import generateValidationErrors from './validation';
import save from '../save-data';
import { mockReq, mockRes, mockApplication } from '../../../../test-mocks';

const { INSURANCE_ROOT } = ROUTES.INSURANCE;
const { POLICY_AND_EXPORTS } = FIELD_IDS.INSURANCE;
const { INSURANCE } = ROUTES;

describe('controllers/insurance/policy-and-export/type-of-policy', () => {
  let req: Request;
  let res: Response;
  let refNumber: number;

  jest.mock('../save-data');

  const mockSavePolicyAndExportData = jest.fn(() => {
    return Promise.resolve({});
  });

  save.policyAndExport = mockSavePolicyAndExportData;

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
        SAVE_AND_BACK_URL: `${INSURANCE.INSURANCE_ROOT}/${req.params.referenceNumber}${INSURANCE.POLICY_AND_EXPORTS.TYPE_OF_POLICY_SAVE_AND_BACK}`,
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
          [pageVariables(refNumber).FIELD.ID]: FIELDS[POLICY_AND_EXPORTS.POLICY_TYPE].OPTIONS.SINGLE.VALUE,
        };
      });

      it('should call save.policyAndExport with application and req.body', async () => {
        await post(req, res);

        expect(save.policyAndExport).toHaveBeenCalledTimes(1);

        expect(save.policyAndExport).toHaveBeenCalledWith(res.locals.application, req.body);
      });

      it(`should redirect to ${ROUTES.INSURANCE.POLICY_AND_EXPORTS.ABOUT_GOODS_OR_SERVICES}`, async () => {
        await post(req, res);

        const referenceNumber = refNumber;

        const expected = `${INSURANCE_ROOT}/${referenceNumber}${ROUTES.INSURANCE.POLICY_AND_EXPORTS.ABOUT_GOODS_OR_SERVICES}`;

        expect(res.redirect).toHaveBeenCalledWith(expected);
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

    describe('api error handling', () => {
      beforeEach(() => {
        req.body = {
          [pageVariables(refNumber).FIELD.ID]: FIELDS[POLICY_AND_EXPORTS.POLICY_TYPE].OPTIONS.SINGLE.VALUE,
        };
      });

      describe('when no application is returned', () => {
        beforeEach(() => {
          // @ts-ignore
          const savePolicyAndExportDataSpy = jest.fn(() => Promise.resolve());

          save.policyAndExport = savePolicyAndExportDataSpy;
        });

        it(`should redirect to ${ROUTES.PROBLEM_WITH_SERVICE}`, async () => {
          await post(req, res);

          expect(res.redirect).toHaveBeenCalledWith(ROUTES.PROBLEM_WITH_SERVICE);
        });
      });

      describe('when there is an error', () => {
        beforeEach(() => {
          const savePolicyAndExportDataSpy = jest.fn(() => Promise.reject());

          save.policyAndExport = savePolicyAndExportDataSpy;
        });

        it(`should redirect to ${ROUTES.PROBLEM_WITH_SERVICE}`, async () => {
          await post(req, res);

          expect(res.redirect).toHaveBeenCalledWith(ROUTES.PROBLEM_WITH_SERVICE);
        });
      });
    });
  });
});
