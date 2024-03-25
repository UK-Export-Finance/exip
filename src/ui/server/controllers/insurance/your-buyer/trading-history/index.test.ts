import { get, post, pageVariables, TEMPLATE, FIELD_IDS, PAGE_CONTENT_STRINGS, HTML_FLAGS } from '.';
import { PAGES } from '../../../../content-strings';
import { ATTRIBUTES, FIELD_VALUES, TEMPLATES } from '../../../../constants';
import { YOUR_BUYER_FIELDS as FIELDS } from '../../../../content-strings/fields/insurance';
import { INSURANCE_ROUTES } from '../../../../constants/routes/insurance';
import BUYER_FIELD_IDS from '../../../../constants/field-ids/insurance/your-buyer';
import INSURANCE_FIELD_IDS from '../../../../constants/field-ids/insurance';
import insuranceCorePageVariables from '../../../../helpers/page-variables/core/insurance';
import getUserNameFromSession from '../../../../helpers/get-user-name-from-session';
import tradingHistoryValidation from './validation';
import constructPayload from '../../../../helpers/construct-payload';
import mapApplicationToFormFields from '../../../../helpers/mappings/map-application-to-form-fields';
import mapAndSave from '../map-and-save/buyer-trading-history';
import { Request, Response } from '../../../../../types';
import { mockReq, mockRes, mockApplication, mockCurrencies, mockCurrenciesResponse } from '../../../../test-mocks';
import getCurrencyByCode from '../../../../helpers/get-currency-by-code';
import api from '../../../../api';

const {
  INSURANCE_ROOT,
  YOUR_BUYER: {
    TRADING_HISTORY_CHANGE,
    TRADING_HISTORY_CHECK_AND_CHANGE,
    TRADING_HISTORY_SAVE_AND_BACK: SAVE_AND_BACK,
    CHECK_YOUR_ANSWERS,
    ALTERNATIVE_CURRENCY,
    ALTERNATIVE_CURRENCY_CHANGE,
    ALTERNATIVE_CURRENCY_CHECK_AND_CHANGE,
    BUYER_FINANCIAL_INFORMATION,
    CREDIT_INSURANCE_COVER,
  },
  CHECK_YOUR_ANSWERS: { YOUR_BUYER: CHECK_AND_CHANGE_ROUTE },
  PROBLEM_WITH_SERVICE,
} = INSURANCE_ROUTES;

const { OUTSTANDING_PAYMENTS, FAILED_PAYMENTS, TOTAL_OUTSTANDING_PAYMENTS, TOTAL_AMOUNT_OVERDUE } = BUYER_FIELD_IDS;

const {
  CURRENCY: { CURRENCY_CODE },
} = INSURANCE_FIELD_IDS;

const {
  PARTIALS: {
    INSURANCE: { BUYER },
  },
} = TEMPLATES;

const {
  CLASSES: { LEGEND, FONT_WEIGHT },
} = ATTRIBUTES;

const currencyValue = mockApplication.buyer.buyerTradingHistory[CURRENCY_CODE];

describe('controllers/insurance/your-buyer/trading-history', () => {
  let req: Request;
  let res: Response;

  let getCurrenciesSpy = jest.fn(() => Promise.resolve(mockCurrenciesResponse));

  beforeEach(() => {
    req = mockReq();
    res = mockRes();

    req.params.referenceNumber = String(mockApplication.referenceNumber);
    api.keystone.APIM.getCurrencies = getCurrenciesSpy;
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  describe('pageVariables', () => {
    it('should have correct properties', () => {
      const result = pageVariables(mockApplication.referenceNumber, mockCurrencies, currencyValue);

      const currency = getCurrencyByCode(mockCurrencies, String(currencyValue));

      const expected = {
        FIELDS: {
          OUTSTANDING_PAYMENTS: {
            ID: OUTSTANDING_PAYMENTS,
            ...FIELDS[OUTSTANDING_PAYMENTS],
          },
          FAILED_PAYMENTS: {
            ID: FAILED_PAYMENTS,
            ...FIELDS[FAILED_PAYMENTS],
          },
          TOTAL_OUTSTANDING_PAYMENTS: {
            ID: TOTAL_OUTSTANDING_PAYMENTS,
            ...FIELDS[TOTAL_OUTSTANDING_PAYMENTS],
          },
          TOTAL_AMOUNT_OVERDUE: {
            ID: TOTAL_AMOUNT_OVERDUE,
            ...FIELDS[TOTAL_AMOUNT_OVERDUE],
          },
        },
        PAGE_CONTENT_STRINGS,
        SAVE_AND_BACK_URL: `${INSURANCE_ROOT}/${mockApplication.referenceNumber}${SAVE_AND_BACK}`,
        PROVIDE_ALTERNATIVE_CURRENCY_URL: `${INSURANCE_ROOT}/${mockApplication.referenceNumber}${ALTERNATIVE_CURRENCY}`,
        CURRENCY_PREFIX_SYMBOL: currency.symbol,
      };

      expect(result).toEqual(expected);
    });

    describe('when isChange is provided as true', () => {
      it(`should have correct properties with "PROVIDE_ALTERNATIVE_CURRENCY_URL" set to ${ALTERNATIVE_CURRENCY_CHANGE}`, () => {
        const isChange = true;

        const result = pageVariables(mockApplication.referenceNumber, mockCurrencies, currencyValue, isChange);

        const currency = getCurrencyByCode(mockCurrencies, String(currencyValue));

        const expected = {
          FIELDS: {
            OUTSTANDING_PAYMENTS: {
              ID: OUTSTANDING_PAYMENTS,
              ...FIELDS[OUTSTANDING_PAYMENTS],
            },
            FAILED_PAYMENTS: {
              ID: FAILED_PAYMENTS,
              ...FIELDS[FAILED_PAYMENTS],
            },
            TOTAL_OUTSTANDING_PAYMENTS: {
              ID: TOTAL_OUTSTANDING_PAYMENTS,
              ...FIELDS[TOTAL_OUTSTANDING_PAYMENTS],
            },
            TOTAL_AMOUNT_OVERDUE: {
              ID: TOTAL_AMOUNT_OVERDUE,
              ...FIELDS[TOTAL_AMOUNT_OVERDUE],
            },
          },
          PAGE_CONTENT_STRINGS,
          SAVE_AND_BACK_URL: `${INSURANCE_ROOT}/${mockApplication.referenceNumber}${SAVE_AND_BACK}`,
          PROVIDE_ALTERNATIVE_CURRENCY_URL: `${INSURANCE_ROOT}/${mockApplication.referenceNumber}${ALTERNATIVE_CURRENCY_CHANGE}`,
          CURRENCY_PREFIX_SYMBOL: currency.symbol,
        };

        expect(result).toEqual(expected);
      });
    });

    describe('when isCheckAndChange is provided as true', () => {
      it(`should have correct properties with "PROVIDE_ALTERNATIVE_CURRENCY_URL" set to ${ALTERNATIVE_CURRENCY_CHECK_AND_CHANGE}`, () => {
        const isChange = undefined;
        const isCheckAndChange = true;

        const result = pageVariables(mockApplication.referenceNumber, mockCurrencies, currencyValue, isChange, isCheckAndChange);

        const currency = getCurrencyByCode(mockCurrencies, String(currencyValue));

        const expected = {
          FIELDS: {
            OUTSTANDING_PAYMENTS: {
              ID: OUTSTANDING_PAYMENTS,
              ...FIELDS[OUTSTANDING_PAYMENTS],
            },
            FAILED_PAYMENTS: {
              ID: FAILED_PAYMENTS,
              ...FIELDS[FAILED_PAYMENTS],
            },
            TOTAL_OUTSTANDING_PAYMENTS: {
              ID: TOTAL_OUTSTANDING_PAYMENTS,
              ...FIELDS[TOTAL_OUTSTANDING_PAYMENTS],
            },
            TOTAL_AMOUNT_OVERDUE: {
              ID: TOTAL_AMOUNT_OVERDUE,
              ...FIELDS[TOTAL_AMOUNT_OVERDUE],
            },
          },
          PAGE_CONTENT_STRINGS,
          SAVE_AND_BACK_URL: `${INSURANCE_ROOT}/${mockApplication.referenceNumber}${SAVE_AND_BACK}`,
          PROVIDE_ALTERNATIVE_CURRENCY_URL: `${INSURANCE_ROOT}/${mockApplication.referenceNumber}${ALTERNATIVE_CURRENCY_CHECK_AND_CHANGE}`,
          CURRENCY_PREFIX_SYMBOL: currency.symbol,
        };

        expect(result).toEqual(expected);
      });
    });
  });

  describe('FIELD_IDS', () => {
    it('should have the correct FIELD_IDS', () => {
      const EXPECTED_FIELD_IDS = [OUTSTANDING_PAYMENTS, FAILED_PAYMENTS, TOTAL_OUTSTANDING_PAYMENTS, TOTAL_AMOUNT_OVERDUE];

      expect(FIELD_IDS).toEqual(EXPECTED_FIELD_IDS);
    });
  });

  describe('TEMPLATE', () => {
    it('should have the correct template defined', () => {
      expect(TEMPLATE).toEqual(TEMPLATES.INSURANCE.YOUR_BUYER.TRADING_HISTORY);
    });
  });

  describe('PAGE_CONTENT_STRINGS', () => {
    it('should have the correct template defined', () => {
      expect(PAGE_CONTENT_STRINGS).toEqual(PAGES.INSURANCE.YOUR_BUYER.TRADING_HISTORY);
    });
  });

  describe('HTML_FLAGS', () => {
    it('should have the correct flags defined', () => {
      const expected = {
        CONDITIONAL_YES_HTML: BUYER.OUTSTANDING_PAYMENTS.CONDITIONAL_YES_HTML,
        LEGEND_CLASS: `${LEGEND.S} ${FONT_WEIGHT.REGULAR}`,
      };

      expect(HTML_FLAGS).toEqual(expected);
    });
  });

  describe('get', () => {
    it('should call api.keystone.APIM.getCurrencies', async () => {
      await get(req, res);

      expect(getCurrenciesSpy).toHaveBeenCalledTimes(1);
    });

    it('should render template', async () => {
      await get(req, res);

      const expectedVariables = {
        ...insuranceCorePageVariables({
          PAGE_CONTENT_STRINGS,
          BACK_LINK: req.headers.referer,
          HTML_FLAGS,
        }),
        userName: getUserNameFromSession(req.session.user),
        ...pageVariables(mockApplication.referenceNumber, mockCurrencies, currencyValue),
        application: mapApplicationToFormFields(mockApplication),
      };

      expect(res.render).toHaveBeenCalledWith(TEMPLATE, expectedVariables);
    });

    describe('when there is no application', () => {
      beforeEach(() => {
        delete res.locals.application;
      });

      it(`should redirect to ${PROBLEM_WITH_SERVICE}`, () => {
        get(req, res);

        expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
      });
    });
  });

  describe('post', () => {
    const validBody = {
      [OUTSTANDING_PAYMENTS]: FIELD_VALUES.NO,
      [FAILED_PAYMENTS]: FIELD_VALUES.NO,
    };

    beforeEach(() => {
      mapAndSave.buyerTradingHistory = jest.fn(() => Promise.resolve(true));
      getCurrenciesSpy = jest.fn(() => Promise.resolve(mockCurrenciesResponse));
      api.keystone.APIM.getCurrencies = getCurrenciesSpy;
    });

    describe('when there are no validation errors', () => {
      beforeEach(() => {
        req.body = validBody;
      });

      it('should call mapAndSave.buyerTradingHistory once with data from constructPayload function and application', async () => {
        await post(req, res);

        expect(mapAndSave.buyerTradingHistory).toHaveBeenCalledTimes(1);

        const payload = constructPayload(req.body, FIELD_IDS);

        expect(mapAndSave.buyerTradingHistory).toHaveBeenCalledWith(payload, mockApplication);
      });

      describe('when application.totalContractValueOverThreshold is true', () => {
        it(`should redirect to ${CREDIT_INSURANCE_COVER}`, async () => {
          res.locals.application = {
            ...mockApplication,
            totalContractValueOverThreshold: true,
          };

          await post(req, res);

          const expected = `${INSURANCE_ROOT}/${mockApplication.referenceNumber}${CREDIT_INSURANCE_COVER}`;

          expect(res.redirect).toHaveBeenCalledWith(expected);
        });
      });

      describe('when application.totalContractValueOverThreshold is NOT true', () => {
        it('should redirect to the next page', async () => {
          res.locals.application = {
            ...mockApplication,
            totalContractValueOverThreshold: false,
          };

          await post(req, res);
          const expected = `${INSURANCE_ROOT}/${mockApplication.referenceNumber}${BUYER_FINANCIAL_INFORMATION}`;

          expect(res.redirect).toHaveBeenCalledWith(expected);
        });
      });

      describe("when the url's last substring is `check`", () => {
        it(`should redirect to ${CHECK_YOUR_ANSWERS}`, async () => {
          req.originalUrl = TRADING_HISTORY_CHANGE;

          await post(req, res);

          const expected = `${INSURANCE_ROOT}/${mockApplication.referenceNumber}${CHECK_YOUR_ANSWERS}`;

          expect(res.redirect).toHaveBeenCalledWith(expected);
        });
      });

      describe("when the url's last substring is `check-and-change`", () => {
        it(`should redirect to ${CHECK_AND_CHANGE_ROUTE}`, async () => {
          req.originalUrl = TRADING_HISTORY_CHECK_AND_CHANGE;

          await post(req, res);

          const expected = `${INSURANCE_ROOT}/${mockApplication.referenceNumber}${CHECK_AND_CHANGE_ROUTE}`;

          expect(res.redirect).toHaveBeenCalledWith(expected);
        });
      });
    });

    describe('when there are validation errors', () => {
      it('should render template with validation errors', async () => {
        await post(req, res);

        const payload = constructPayload(req.body, FIELD_IDS);

        const validationErrors = tradingHistoryValidation(payload);

        const expectedVariables = {
          ...insuranceCorePageVariables({
            PAGE_CONTENT_STRINGS,
            BACK_LINK: req.headers.referer,
            HTML_FLAGS,
          }),
          userName: getUserNameFromSession(req.session.user),
          ...pageVariables(mockApplication.referenceNumber, mockCurrencies, currencyValue),
          submittedValues: payload,
          validationErrors,
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
      describe('when mapAndSave.buyerTradingHistory returns false', () => {
        beforeEach(() => {
          req.body = validBody;
          res.locals = mockRes().locals;
          mapAndSave.buyerTradingHistory = jest.fn(() => Promise.resolve(false));
        });

        it(`should redirect to ${PROBLEM_WITH_SERVICE}`, async () => {
          await post(req, res);

          expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
        });
      });

      describe('when mapAndSave.buyerTradingHistory fails', () => {
        beforeEach(() => {
          req.body = validBody;
          res.locals = mockRes().locals;
          mapAndSave.buyerTradingHistory = jest.fn(() => Promise.reject(new Error('mock')));
        });

        it(`should redirect to ${PROBLEM_WITH_SERVICE}`, async () => {
          await post(req, res);

          expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
        });
      });
    });
  });
});
