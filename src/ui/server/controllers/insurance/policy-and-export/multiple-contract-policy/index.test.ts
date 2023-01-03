import { pageVariables, TEMPLATE, get } from '.';
import { FIELD_IDS, ROUTES, TEMPLATES } from '../../../../constants';
import { PAGES } from '../../../../content-strings';
import { FIELDS } from '../../../../content-strings/fields/insurance';
import { Request, Response } from '../../../../../types';
import insuranceCorePageVariables from '../../../../helpers/page-variables/core/insurance';
import api from '../../../../api';
import { mapCurrencies } from '../../../../helpers/mappings/map-currencies';
import mapApplicationToFormFields from '../../../../helpers/mappings/map-application-to-form-fields';
import { mockReq, mockRes, mockApplication, mockCurrencies } from '../../../../test-mocks';

const {
  INSURANCE: {
    INSURANCE_ROOT,
    POLICY_AND_EXPORTS: { MULTIPLE_CONTRACT_POLICY_SAVE_AND_BACK },
  },
} = ROUTES;

const {
  POLICY_AND_EXPORTS: { CONTRACT_POLICY },
} = FIELD_IDS.INSURANCE;

const {
  REQUESTED_START_DATE,
  MULTIPLE: { TOTAL_MONTHS_OF_INSURANCE, TOTAL_SALES_TO_BUYER, MAXIMUM_BUYER_WILL_OWE },
  CREDIT_PERIOD_WITH_BUYER,
  POLICY_CURRENCY_CODE,
} = CONTRACT_POLICY;

describe('controllers/insurance/policy-and-export/single-contract-policy', () => {
  let req: Request;
  let res: Response;
  let refNumber: number;

  let getCurrenciesSpy = jest.fn(() => Promise.resolve(mockCurrencies));

  beforeEach(() => {
    req = mockReq();
    res = mockRes();

    res.locals.application = mockApplication;
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
          TOTAL_MONTHS_OF_INSURANCE: {
            ID: TOTAL_MONTHS_OF_INSURANCE,
            ...FIELDS.CONTRACT_POLICY.MULTIPLE[TOTAL_MONTHS_OF_INSURANCE],
          },
          TOTAL_SALES_TO_BUYER: {
            ID: TOTAL_SALES_TO_BUYER,
            ...FIELDS.CONTRACT_POLICY.MULTIPLE[TOTAL_SALES_TO_BUYER],
          },
          MAXIMUM_BUYER_WILL_OWE: {
            ID: MAXIMUM_BUYER_WILL_OWE,
            ...FIELDS.CONTRACT_POLICY.MULTIPLE[MAXIMUM_BUYER_WILL_OWE],
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
        SAVE_AND_BACK_URL: `${INSURANCE_ROOT}/${req.params.referenceNumber}${MULTIPLE_CONTRACT_POLICY_SAVE_AND_BACK}`,
      };

      expect(result).toEqual(expected);
    });
  });

  describe('TEMPLATE', () => {
    it('should have the correct template defined', () => {
      expect(TEMPLATE).toEqual(TEMPLATES.INSURANCE.POLICY_AND_EXPORTS.MULTIPLE_CONTRACT_POLICY);
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
          PAGE_CONTENT_STRINGS: PAGES.INSURANCE.POLICY_AND_EXPORTS.MULTIPLE_CONTRACT_POLICY,
          BACK_LINK: req.headers.referer,
        }),
        ...pageVariables(refNumber),
        application: mapApplicationToFormFields(mockApplication),
        currencies: expectedCurrencies,
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
});
