import { add, getMonth, getYear } from 'date-fns';
import { pageVariables, TEMPLATE, get, post } from '.';
import { FIELD_IDS, ROUTES, TEMPLATES } from '../../../../constants';
import { PAGES } from '../../../../content-strings';
import { FIELDS } from '../../../../content-strings/fields/insurance';
import { Request, Response } from '../../../../../types';
import insuranceCorePageVariables from '../../../../helpers/page-variables/core/insurance';
import api from '../../../../api';
import { mapCurrencies } from '../../../../helpers/mappings/map-currencies';
import mapApplicationToFormFields from '../../../../helpers/mappings/map-application-to-form-fields';
import generateValidationErrors from './validation';
import mapAndSave from '../map-and-save';
import { mockReq, mockRes, mockApplication, mockCurrencies } from '../../../../test-mocks';

const {
  INSURANCE: {
    INSURANCE_ROOT,
    POLICY_AND_EXPORTS: { SINGLE_CONTRACT_POLICY_SAVE_AND_BACK, ABOUT_GOODS_OR_SERVICES },
  },
} = ROUTES;

const {
  POLICY_AND_EXPORTS: { CONTRACT_POLICY },
} = FIELD_IDS.INSURANCE;

const {
  REQUESTED_START_DATE,
  SINGLE: { CONTRACT_COMPLETION_DATE, TOTAL_CONTRACT_VALUE },
  CREDIT_PERIOD_WITH_BUYER,
  POLICY_CURRENCY_CODE,
} = CONTRACT_POLICY;

describe('controllers/insurance/policy-and-export/single-contract-policy', () => {
  let req: Request;
  let res: Response;
  let refNumber: number;

  jest.mock('../save-data');

  mapAndSave.policyAndExport = jest.fn(() => Promise.resolve(true));
  let getCurrenciesSpy = jest.fn(() => Promise.resolve(mockCurrencies));

  const mockApplicationWithoutCurrencyCode = {
    ...mockApplication,
    policyAndExport: {
      ...mockApplication.policyAndExport,
      [POLICY_CURRENCY_CODE]: null,
    },
  };

  beforeEach(() => {
    req = mockReq();
    res = mockRes();

    res.locals.application = mockApplicationWithoutCurrencyCode;

    req.params.referenceNumber = String(mockApplication.referenceNumber);
    refNumber = Number(mockApplication.referenceNumber);
    api.external.getCurrencies = getCurrenciesSpy;
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  describe('pageVariables', () => {
    it('should have correct properties', () => {
      const result = pageVariables(refNumber);

      const expected = {
        FIELDS: {
          REQUESTED_START_DATE: {
            ID: REQUESTED_START_DATE,
            ...FIELDS.CONTRACT_POLICY[REQUESTED_START_DATE],
          },
          CONTRACT_COMPLETION_DATE: {
            ID: CONTRACT_COMPLETION_DATE,
            ...FIELDS.CONTRACT_POLICY.SINGLE[CONTRACT_COMPLETION_DATE],
          },
          TOTAL_CONTRACT_VALUE: {
            ID: TOTAL_CONTRACT_VALUE,
            ...FIELDS.CONTRACT_POLICY.SINGLE[TOTAL_CONTRACT_VALUE],
          },
          CREDIT_PERIOD_WITH_BUYER: {
            ID: CREDIT_PERIOD_WITH_BUYER,
            ...FIELDS.CONTRACT_POLICY[CREDIT_PERIOD_WITH_BUYER],
          },
          POLICY_CURRENCY_CODE: {
            ID: POLICY_CURRENCY_CODE,
            ...FIELDS.CONTRACT_POLICY[POLICY_CURRENCY_CODE],
          },
        },
        SAVE_AND_BACK_URL: `${INSURANCE_ROOT}/${req.params.referenceNumber}${SINGLE_CONTRACT_POLICY_SAVE_AND_BACK}`,
      };

      expect(result).toEqual(expected);
    });
  });

  describe('TEMPLATE', () => {
    it('should have the correct template defined', () => {
      expect(TEMPLATE).toEqual(TEMPLATES.INSURANCE.POLICY_AND_EXPORTS.SINGLE_CONTRACT_POLICY);
    });
  });

  describe('get', () => {
    it('should call api.external.getCurrencies', async () => {
      await get(req, res);

      expect(getCurrenciesSpy).toHaveBeenCalledTimes(1);
    });

    it('should render template', async () => {
      await get(req, res);

      const expectedCurrencies = mapCurrencies(mockCurrencies);

      const expectedVariables = {
        ...insuranceCorePageVariables({
          PAGE_CONTENT_STRINGS: PAGES.INSURANCE.POLICY_AND_EXPORTS.SINGLE_CONTRACT_POLICY,
          BACK_LINK: req.headers.referer,
        }),
        ...pageVariables(refNumber),
        application: mapApplicationToFormFields(mockApplicationWithoutCurrencyCode),
        currencies: expectedCurrencies,
      };

      expect(res.render).toHaveBeenCalledWith(TEMPLATE, expectedVariables);
    });

    describe('when a policy currency code has been previously submitted', () => {
      const mockApplicationWithCurrencyCode = {
        ...mockApplication,
        policyAndExport: {
          ...mockApplication.policyAndExport,
          [POLICY_CURRENCY_CODE]: mockCurrencies[0].isoCode,
        },
      };

      beforeEach(() => {
        res.locals.application = mockApplicationWithCurrencyCode;
      });

      it('should render template with currencies mapped to submitted currency', async () => {
        await get(req, res);

        const expectedCurrencies = mapCurrencies(mockCurrencies, mockApplicationWithCurrencyCode.policyAndExport[POLICY_CURRENCY_CODE]);

        const expectedVariables = {
          ...insuranceCorePageVariables({
            PAGE_CONTENT_STRINGS: PAGES.INSURANCE.POLICY_AND_EXPORTS.SINGLE_CONTRACT_POLICY,
            BACK_LINK: req.headers.referer,
          }),
          ...pageVariables(refNumber),
          application: mapApplicationToFormFields(mockApplicationWithCurrencyCode),
          currencies: expectedCurrencies,
        };

        expect(res.render).toHaveBeenCalledWith(TEMPLATE, expectedVariables);
      });
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

    describe('api error handling', () => {
      describe('when there are no currencies returned from the API', () => {
        beforeEach(() => {
          // @ts-ignore
          getCurrenciesSpy = jest.fn(() => Promise.resolve());
          api.external.getCurrencies = getCurrenciesSpy;
        });

        it(`should redirect to ${ROUTES.PROBLEM_WITH_SERVICE}`, async () => {
          await get(req, res);

          expect(res.redirect).toHaveBeenCalledWith(ROUTES.PROBLEM_WITH_SERVICE);
        });
      });

      describe('when there currencies response is an empty array', () => {
        beforeEach(() => {
          getCurrenciesSpy = jest.fn(() => Promise.resolve([]));
          api.external.getCurrencies = getCurrenciesSpy;
        });

        it(`should redirect to ${ROUTES.PROBLEM_WITH_SERVICE}`, async () => {
          await get(req, res);

          expect(res.redirect).toHaveBeenCalledWith(ROUTES.PROBLEM_WITH_SERVICE);
        });
      });

      describe('when there is an error with the getCurrencies API call', () => {
        beforeEach(() => {
          getCurrenciesSpy = jest.fn(() => Promise.reject());
          api.external.getCurrencies = getCurrenciesSpy;
        });

        it(`should redirect to ${ROUTES.PROBLEM_WITH_SERVICE}`, async () => {
          await get(req, res);

          expect(res.redirect).toHaveBeenCalledWith(ROUTES.PROBLEM_WITH_SERVICE);
        });
      });
    });
  });

  describe('post', () => {
    beforeEach(() => {
      getCurrenciesSpy = jest.fn(() => Promise.resolve(mockCurrencies));
      api.external.getCurrencies = getCurrenciesSpy;
    });

    const date = new Date();

    const validBody = {
      [`${REQUESTED_START_DATE}-day`]: '1',
      [`${REQUESTED_START_DATE}-month`]: getMonth(add(date, { months: 1 })),
      [`${REQUESTED_START_DATE}-year`]: getYear(add(date, { years: 1 })),
      [`${CONTRACT_COMPLETION_DATE}-day`]: '1',
      [`${CONTRACT_COMPLETION_DATE}-month`]: getMonth(add(date, { months: 2 })),
      [`${CONTRACT_COMPLETION_DATE}-year`]: getYear(add(date, { years: 1, months: 6 })),
      [TOTAL_CONTRACT_VALUE]: '150000',
      [CREDIT_PERIOD_WITH_BUYER]: 'Mock text',
      [POLICY_CURRENCY_CODE]: mockCurrencies[0].isoCode,
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

      it(`should redirect to ${ABOUT_GOODS_OR_SERVICES}`, async () => {
        await post(req, res);

        const expected = `${INSURANCE_ROOT}/${req.params.referenceNumber}${ABOUT_GOODS_OR_SERVICES}`;

        expect(res.redirect).toHaveBeenCalledWith(expected);
      });
    });

    describe('when there are validation errors', () => {
      it('should call api.external.getCurrencies', async () => {
        await get(req, res);

        expect(getCurrenciesSpy).toHaveBeenCalledTimes(1);
      });

      it('should render template with validation errors', async () => {
        await post(req, res);

        const expectedCurrencies = mapCurrencies(mockCurrencies);

        const expectedVariables = {
          ...insuranceCorePageVariables({
            PAGE_CONTENT_STRINGS: PAGES.INSURANCE.POLICY_AND_EXPORTS.SINGLE_CONTRACT_POLICY,
            BACK_LINK: req.headers.referer,
          }),
          ...pageVariables(refNumber),
          application: mapApplicationToFormFields(mockApplicationWithoutCurrencyCode),
          submittedValues: req.body,
          currencies: expectedCurrencies,
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
      describe('get currencies call', () => {
        describe('when there are no currencies returned', () => {
          beforeEach(() => {
            // @ts-ignore
            getCurrenciesSpy = jest.fn(() => Promise.resolve());
            api.external.getCurrencies = getCurrenciesSpy;
          });

          it(`should redirect to ${ROUTES.PROBLEM_WITH_SERVICE}`, async () => {
            await post(req, res);

            expect(res.redirect).toHaveBeenCalledWith(ROUTES.PROBLEM_WITH_SERVICE);
          });
        });

        describe('when the currencies response is an empty array', () => {
          beforeEach(() => {
            getCurrenciesSpy = jest.fn(() => Promise.resolve([]));
            api.external.getCurrencies = getCurrenciesSpy;
          });

          it(`should redirect to ${ROUTES.PROBLEM_WITH_SERVICE}`, async () => {
            await post(req, res);

            expect(res.redirect).toHaveBeenCalledWith(ROUTES.PROBLEM_WITH_SERVICE);
          });
        });

        describe('when there is an error with the API call', () => {
          beforeEach(() => {
            getCurrenciesSpy = jest.fn(() => Promise.reject());
            api.external.getCurrencies = getCurrenciesSpy;
          });

          it(`should redirect to ${ROUTES.PROBLEM_WITH_SERVICE}`, async () => {
            await post(req, res);

            expect(res.redirect).toHaveBeenCalledWith(ROUTES.PROBLEM_WITH_SERVICE);
          });
        });
      });

      describe('mapAndSave.policyAndExport call', () => {
        beforeEach(() => {
          req.body = validBody;
        });

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
