import { get, post, pageVariables, TEMPLATE, FIELD_IDS, PAGE_CONTENT_STRINGS } from '.';
import { PAGES } from '../../../../content-strings';
import { TEMPLATES } from '../../../../constants';
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
import getCurrencyByCode from '../../../../helpers/get-currency-by-code';
import api from '../../../../api';
import { Request, Response } from '../../../../../types';
import { mockReq, mockRes, mockApplication, mockCurrencies, mockCurrenciesResponse, mockSpyPromiseRejection, referenceNumber } from '../../../../test-mocks';

const {
  INSURANCE_ROOT,
  YOUR_BUYER: {
    OUTSTANDING_OR_OVERDUE_PAYMENTS_SAVE_AND_BACK: SAVE_AND_BACK,
    CHECK_YOUR_ANSWERS,
    FAILED_TO_PAY,
    OUTSTANDING_OR_OVERDUE_PAYMENTS_CHANGE,
    OUTSTANDING_OR_OVERDUE_PAYMENTS_CHECK_AND_CHANGE,
  },
  CHECK_YOUR_ANSWERS: { YOUR_BUYER: CHECK_AND_CHANGE_ROUTE },
  PROBLEM_WITH_SERVICE,
} = INSURANCE_ROUTES;

const { TOTAL_OUTSTANDING_PAYMENTS, TOTAL_AMOUNT_OVERDUE } = BUYER_FIELD_IDS;

const {
  CURRENCY: { CURRENCY_CODE },
} = INSURANCE_FIELD_IDS;

const currencyValue = mockApplication.buyer.buyerTradingHistory[CURRENCY_CODE];

describe('controllers/insurance/your-buyer/trading-history', () => {
  let req: Request;
  let res: Response;

  let getCurrenciesSpy = jest.fn(() => Promise.resolve(mockCurrenciesResponse));

  beforeEach(() => {
    req = mockReq();
    res = mockRes();

    api.keystone.APIM.getCurrencies = getCurrenciesSpy;
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  describe('pageVariables', () => {
    it('should have correct properties', () => {
      const result = pageVariables(referenceNumber, mockCurrencies, currencyValue);

      const currency = getCurrencyByCode(mockCurrencies, String(currencyValue));

      const expected = {
        FIELDS: {
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
        SAVE_AND_BACK_URL: `${INSURANCE_ROOT}/${referenceNumber}${SAVE_AND_BACK}`,
        CURRENCY_PREFIX_SYMBOL: currency.symbol,
      };

      expect(result).toEqual(expected);
    });
  });

  describe('FIELD_IDS', () => {
    it('should have the correct FIELD_IDS', () => {
      const EXPECTED_FIELD_IDS = [TOTAL_OUTSTANDING_PAYMENTS, TOTAL_AMOUNT_OVERDUE];

      expect(FIELD_IDS).toEqual(EXPECTED_FIELD_IDS);
    });
  });

  describe('TEMPLATE', () => {
    it('should have the correct template defined', () => {
      expect(TEMPLATE).toEqual(TEMPLATES.INSURANCE.YOUR_BUYER.OUTSTANDING_OR_OVERDUE_PAYMENTS);
    });
  });

  describe('PAGE_CONTENT_STRINGS', () => {
    it('should have the correct strings', () => {
      expect(PAGE_CONTENT_STRINGS).toEqual(PAGES.INSURANCE.YOUR_BUYER.OUTSTANDING_OR_OVERDUE_PAYMENTS);
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
        }),
        userName: getUserNameFromSession(req.session.user),
        ...pageVariables(referenceNumber, mockCurrencies, currencyValue),
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
    const value = '5000';

    const validBody = {
      [TOTAL_OUTSTANDING_PAYMENTS]: value,
      [TOTAL_AMOUNT_OVERDUE]: value,
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

      it(`should redirect to ${FAILED_TO_PAY}`, async () => {
        await post(req, res);
        const expected = `${INSURANCE_ROOT}/${referenceNumber}${FAILED_TO_PAY}`;

        expect(res.redirect).toHaveBeenCalledWith(expected);
      });

      describe("when the url's last substring is `check`", () => {
        it(`should redirect to ${CHECK_YOUR_ANSWERS}`, async () => {
          req.originalUrl = OUTSTANDING_OR_OVERDUE_PAYMENTS_CHANGE;

          await post(req, res);

          const expected = `${INSURANCE_ROOT}/${referenceNumber}${CHECK_YOUR_ANSWERS}`;

          expect(res.redirect).toHaveBeenCalledWith(expected);
        });
      });

      describe("when the url's last substring is `check-and-change`", () => {
        it(`should redirect to ${CHECK_AND_CHANGE_ROUTE}`, async () => {
          req.originalUrl = OUTSTANDING_OR_OVERDUE_PAYMENTS_CHECK_AND_CHANGE;

          await post(req, res);

          const expected = `${INSURANCE_ROOT}/${referenceNumber}${CHECK_AND_CHANGE_ROUTE}`;

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
          }),
          userName: getUserNameFromSession(req.session.user),
          ...pageVariables(referenceNumber, mockCurrencies, currencyValue),
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
          mapAndSave.buyerTradingHistory = mockSpyPromiseRejection;
        });

        it(`should redirect to ${PROBLEM_WITH_SERVICE}`, async () => {
          await post(req, res);

          expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
        });
      });
    });
  });
});
