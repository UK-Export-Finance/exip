import { pageVariables, TEMPLATE, FIELD_IDS, PAGE_CONTENT_STRINGS, get, post } from '.';
import { PAGES } from '../../../../content-strings';
import { TEMPLATES } from '../../../../constants';
import { YOUR_BUYER_FIELDS as FIELDS } from '../../../../content-strings/fields/insurance';
import { INSURANCE_ROUTES } from '../../../../constants/routes/insurance';
import INSURANCE_FIELD_IDS from '../../../../constants/field-ids/insurance';
import insuranceCorePageVariables from '../../../../helpers/page-variables/core/insurance';
import getUserNameFromSession from '../../../../helpers/get-user-name-from-session';
import generateValidationErrors from './validation';
import mapApplicationToFormFields from '../../../../helpers/mappings/map-application-to-form-fields';
import api from '../../../../api';
import mapRadioAndSelectOptions from '../../../../helpers/mappings/map-currencies/radio-and-select-options';
import constructPayload from '../../../../helpers/construct-payload';
import { Request, ResponseInsurance } from '../../../../../types';
import {
  mockReq,
  mockResInsurance,
  mockApplication,
  mockCurrencies,
  mockCurrenciesResponse,
  mockCurrenciesEmptyResponse,
  mockBuyerTradingHistory,
  mockSpyPromiseRejection,
  referenceNumber,
} from '../../../../test-mocks';
import mapAndSave from '../map-and-save/buyer-trading-history';

const {
  INSURANCE_ROOT,
  YOUR_BUYER: {
    OUTSTANDING_OR_OVERDUE_PAYMENTS,
    OUTSTANDING_OR_OVERDUE_PAYMENTS_CHANGE,
    OUTSTANDING_OR_OVERDUE_PAYMENTS_CHECK_AND_CHANGE,
    OUTSTANDING_OR_OVERDUE_PAYMENTS_SAVE_AND_BACK: SAVE_AND_BACK,
    CURRENCY_OF_LATE_PAYMENTS_CHANGE,
    CURRENCY_OF_LATE_PAYMENTS_CHECK_AND_CHANGE,
  },
  PROBLEM_WITH_SERVICE,
} = INSURANCE_ROUTES;

const {
  CURRENCY: { CURRENCY_CODE, ALTERNATIVE_CURRENCY_CODE },
} = INSURANCE_FIELD_IDS;

const { supportedCurrencies, alternativeCurrencies } = mockCurrenciesResponse;

describe('controllers/insurance/your-buyer/currency-of-late-payments', () => {
  let req: Request;
  let res: ResponseInsurance;

  let getCurrenciesSpy = jest.fn(() => Promise.resolve(mockCurrenciesResponse));

  beforeEach(() => {
    req = mockReq();
    res = mockResInsurance();

    api.keystone.APIM.getCurrencies = getCurrenciesSpy;
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  describe('pageVariables', () => {
    it('should have correct properties', () => {
      const expected = {
        FIELDS: {
          CURRENCY_CODE: {
            ID: CURRENCY_CODE,
            ...FIELDS[CURRENCY_CODE],
          },
          ALTERNATIVE_CURRENCY_CODE: {
            ID: ALTERNATIVE_CURRENCY_CODE,
          },
        },
        SAVE_AND_BACK_URL: `${INSURANCE_ROOT}/${referenceNumber}${SAVE_AND_BACK}`,
      };

      expect(pageVariables(referenceNumber)).toEqual(expected);
    });
  });

  describe('FIELD_IDS', () => {
    it('should have the correct FIELD_IDS', () => {
      const EXPECTED_FIELD_IDS = [CURRENCY_CODE, ALTERNATIVE_CURRENCY_CODE];

      expect(FIELD_IDS).toEqual(EXPECTED_FIELD_IDS);
    });
  });

  describe('TEMPLATE', () => {
    it('should have the correct template defined', () => {
      expect(TEMPLATE).toEqual(TEMPLATES.SHARED_PAGES.CURRENCY);
    });
  });

  describe('PAGE_CONTENT_STRINGS', () => {
    it('should have the correct strings', () => {
      expect(PAGE_CONTENT_STRINGS).toEqual(PAGES.INSURANCE.YOUR_BUYER.CURRENCY_OF_LATE_PAYMENTS);
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
        ...pageVariables(referenceNumber),
        application: mapApplicationToFormFields(mockApplication),
        ...mapRadioAndSelectOptions(alternativeCurrencies, supportedCurrencies, mockBuyerTradingHistory.currencyCode),
      };

      expect(res.render).toHaveBeenCalledWith(TEMPLATE, expectedVariables);
    });

    describe('api error handling', () => {
      describe('when the get currencies API call fails', () => {
        beforeEach(() => {
          getCurrenciesSpy = mockSpyPromiseRejection;
          api.keystone.APIM.getCurrencies = getCurrenciesSpy;
        });

        it(`should redirect to ${PROBLEM_WITH_SERVICE}`, async () => {
          await get(req, res);

          expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
        });
      });

      describe('when the get currencies response does not return a populated array', () => {
        beforeEach(() => {
          getCurrenciesSpy = jest.fn(() => Promise.resolve(mockCurrenciesEmptyResponse));
          api.keystone.APIM.getCurrencies = getCurrenciesSpy;
        });

        it(`should redirect to ${PROBLEM_WITH_SERVICE}`, async () => {
          await get(req, res);

          expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
        });
      });
    });
  });

  describe('post', () => {
    const validBody = {
      [CURRENCY_CODE]: mockCurrencies[0].isoCode,
    };

    beforeEach(() => {
      getCurrenciesSpy = jest.fn(() => Promise.resolve(mockCurrenciesResponse));
      api.keystone.APIM.getCurrencies = getCurrenciesSpy;
      mapAndSave.buyerTradingHistory = jest.fn(() => Promise.resolve(true));
    });

    describe('when there are no validation errors', () => {
      beforeEach(() => {
        req.body = validBody;
      });

      it('should NOT call api.keystone.APIM.getCurrencies', async () => {
        await post(req, res);

        expect(getCurrenciesSpy).toHaveBeenCalledTimes(0);
      });

      it('should redirect to the next page', async () => {
        await post(req, res);
        const expected = `${INSURANCE_ROOT}/${referenceNumber}${OUTSTANDING_OR_OVERDUE_PAYMENTS}`;

        expect(res.redirect).toHaveBeenCalledWith(expected);
      });

      it('should call mapAndSave.buyerTradingHistory once with data from constructPayload function and application', async () => {
        await post(req, res);

        expect(mapAndSave.buyerTradingHistory).toHaveBeenCalledTimes(1);

        const payload = constructPayload(req.body, FIELD_IDS);

        expect(mapAndSave.buyerTradingHistory).toHaveBeenCalledWith(payload, mockApplication);
      });

      describe("when the url's last substring is `check`", () => {
        it(`should redirect to ${OUTSTANDING_OR_OVERDUE_PAYMENTS_CHANGE}`, async () => {
          req.originalUrl = CURRENCY_OF_LATE_PAYMENTS_CHANGE;

          await post(req, res);

          const expected = `${INSURANCE_ROOT}/${referenceNumber}${OUTSTANDING_OR_OVERDUE_PAYMENTS_CHANGE}`;

          expect(res.redirect).toHaveBeenCalledWith(expected);
        });
      });

      describe("when the url's last substring is `check-and-change`", () => {
        it(`should redirect to ${OUTSTANDING_OR_OVERDUE_PAYMENTS_CHECK_AND_CHANGE}`, async () => {
          req.originalUrl = CURRENCY_OF_LATE_PAYMENTS_CHECK_AND_CHANGE;

          await post(req, res);

          const expected = `${INSURANCE_ROOT}/${referenceNumber}${OUTSTANDING_OR_OVERDUE_PAYMENTS_CHECK_AND_CHANGE}`;

          expect(res.redirect).toHaveBeenCalledWith(expected);
        });
      });
    });

    describe('when there are validation errors', () => {
      it('should call api.keystone.APIM.getCurrencies', async () => {
        await get(req, res);

        expect(getCurrenciesSpy).toHaveBeenCalledTimes(1);
      });

      it('should render template with validation errors', async () => {
        await post(req, res);

        const payload = constructPayload(req.body, FIELD_IDS);

        const validationErrors = generateValidationErrors(payload);

        const expectedVariables = {
          ...insuranceCorePageVariables({
            PAGE_CONTENT_STRINGS,
            BACK_LINK: req.headers.referer,
          }),
          userName: getUserNameFromSession(req.session.user),
          ...pageVariables(referenceNumber),
          validationErrors,
          ...mapRadioAndSelectOptions(alternativeCurrencies, supportedCurrencies, payload[ALTERNATIVE_CURRENCY_CODE]),
        };
        expect(res.render).toHaveBeenCalledWith(TEMPLATE, expectedVariables);
      });
    });

    describe('api error handling', () => {
      describe('get currencies call', () => {
        describe('when the get currencies API call fails', () => {
          beforeEach(() => {
            getCurrenciesSpy = mockSpyPromiseRejection;
            api.keystone.APIM.getCurrencies = getCurrenciesSpy;
          });

          it(`should redirect to ${PROBLEM_WITH_SERVICE}`, async () => {
            await post(req, res);

            expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
          });
        });

        describe('when the get currencies response does not return a populated array', () => {
          beforeEach(() => {
            getCurrenciesSpy = jest.fn(() => Promise.resolve(mockCurrenciesEmptyResponse));
            api.keystone.APIM.getCurrencies = getCurrenciesSpy;
          });

          it(`should redirect to ${PROBLEM_WITH_SERVICE}`, async () => {
            await post(req, res);

            expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
          });
        });
      });

      describe('when mapAndSave.buyerTradingHistory returns false', () => {
        beforeEach(() => {
          req.body = validBody;
          mapAndSave.buyerTradingHistory = jest.fn(() => Promise.resolve(false));
          getCurrenciesSpy = jest.fn(() => Promise.resolve(mockCurrenciesResponse));
        });

        it(`should redirect to ${PROBLEM_WITH_SERVICE}`, async () => {
          await post(req, res);

          expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
        });
      });

      describe('when mapAndSave.buyerTradingHistory fails', () => {
        beforeEach(() => {
          req.body = validBody;
          mapAndSave.buyerTradingHistory = mockSpyPromiseRejection;
          getCurrenciesSpy = jest.fn(() => Promise.resolve(mockCurrenciesResponse));
        });

        it(`should redirect to ${PROBLEM_WITH_SERVICE}`, async () => {
          await post(req, res);

          expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
        });
      });
    });
  });
});
