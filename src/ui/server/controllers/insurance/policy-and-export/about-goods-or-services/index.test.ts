import { pageVariables, TEMPLATE, get, post } from '.';
import { FIELD_IDS, ROUTES, TEMPLATES } from '../../../../constants';
import { PAGES } from '../../../../content-strings';
import { FIELDS } from '../../../../content-strings/fields/insurance';
import { Request, Response } from '../../../../../types';
import insuranceCorePageVariables from '../../../../helpers/page-variables/core/insurance';
import generateValidationErrors from './validation';
import mapAndSave from '../map-and-save';
import { mockReq, mockRes, mockApplication } from '../../../../test-mocks';

const {
  INSURANCE: {
    INSURANCE_ROOT,
    ALL_SECTIONS,
    POLICY_AND_EXPORTS: { ABOUT_GOODS_OR_SERVICES_SAVE_AND_BACK },
  },
} = ROUTES;

const {
  POLICY_AND_EXPORTS: { ABOUT_GOODS_OR_SERVICES },
} = FIELD_IDS.INSURANCE;

const { DESCRIPTION, FINAL_DESTINATION } = ABOUT_GOODS_OR_SERVICES;

describe('controllers/insurance/policy-and-export/about-goods-or-services', () => {
  let req: Request;
  let res: Response;
  let refNumber: number;

  jest.mock('../map-and-save');

  mapAndSave.policyAndExport = jest.fn(() => Promise.resolve(true));

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
        FIELDS: {
          DESCRIPTION: {
            ID: DESCRIPTION,
            ...FIELDS.ABOUT_GOODS_OR_SERVICES[DESCRIPTION],
          },
          FINAL_DESTINATION: {
            ID: FINAL_DESTINATION,
            ...FIELDS.ABOUT_GOODS_OR_SERVICES[FINAL_DESTINATION],
          },
        },
        SAVE_AND_BACK_URL: `${INSURANCE_ROOT}/${req.params.referenceNumber}${ABOUT_GOODS_OR_SERVICES_SAVE_AND_BACK}`,
      };

      expect(result).toEqual(expected);
    });
  });

  describe('TEMPLATE', () => {
    it('should have the correct template defined', () => {
      expect(TEMPLATE).toEqual(TEMPLATES.INSURANCE.POLICY_AND_EXPORTS.ABOUT_GOODS_OR_SERVICES);
    });
  });

  describe('get', () => {
    it('should render template', () => {
      get(req, res);

      const expectedVariables = {
        ...insuranceCorePageVariables({
          PAGE_CONTENT_STRINGS: PAGES.INSURANCE.POLICY_AND_EXPORTS.ABOUT_GOODS_OR_SERVICES,
          BACK_LINK: req.headers.referer,
        }),
        ...pageVariables(refNumber),
        application: mockApplication,
      };

      expect(res.render).toHaveBeenCalledWith(TEMPLATE, expectedVariables);
    });

    describe('when there is no application', () => {
      beforeEach(() => {
        res.locals = { csrfToken: '1234' };
      });

      it(`should redirect to ${ROUTES.PROBLEM_WITH_SERVICE}`, () => {
        get(req, res);

        expect(res.redirect).toHaveBeenCalledWith(ROUTES.PROBLEM_WITH_SERVICE);
      });
    });
  });

  describe('post', () => {
    const validBody = {
      [DESCRIPTION]: 'Mock description',
    };

    describe('when there are no validation errors', () => {
      beforeEach(() => {
        req.body = validBody;
      });

      it('should call mapAndSave.policyAndExport with req.body and application', async () => {
        await post(req, res);

        expect(mapAndSave.policyAndExport).toHaveBeenCalledTimes(1);

        expect(mapAndSave.policyAndExport).toHaveBeenCalledWith(req.body, res.locals.application);
      });

      it(`should redirect to ${ALL_SECTIONS}`, async () => {
        await post(req, res);

        const expected = `${INSURANCE_ROOT}/${req.params.referenceNumber}${ALL_SECTIONS}`;

        expect(res.redirect).toHaveBeenCalledWith(expected);
      });
    });

    describe('when there are validation errors', () => {
      it('should render template with validation errors', async () => {
        await post(req, res);

        const expectedVariables = {
          ...insuranceCorePageVariables({
            PAGE_CONTENT_STRINGS: PAGES.INSURANCE.POLICY_AND_EXPORTS.ABOUT_GOODS_OR_SERVICES,
            BACK_LINK: req.headers.referer,
          }),
          ...pageVariables(refNumber),
          application: mockApplication,
          submittedValues: req.body,
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
      describe('mapAndSave.policyAndExport call', () => {
        beforeEach(() => {
          req.body = validBody;
        });

        describe('when no application is returned', () => {
          beforeEach(() => {
            const mapAndSaveSpy = jest.fn(() => Promise.resolve(false));

            mapAndSave.policyAndExport = mapAndSaveSpy;
          });

          it(`should redirect to ${ROUTES.PROBLEM_WITH_SERVICE}`, async () => {
            await post(req, res);

            expect(res.redirect).toHaveBeenCalledWith(ROUTES.PROBLEM_WITH_SERVICE);
          });
        });

        describe('when there is an error', () => {
          beforeEach(() => {
            const mapAndSaveSpy = jest.fn(() => Promise.reject(new Error('Mock error')));

            mapAndSave.policyAndExport = mapAndSaveSpy;
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
