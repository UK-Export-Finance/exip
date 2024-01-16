import { get, post, PAGE_VARIABLES, TEMPLATE, FIELD_IDS, PAGE_CONTENT_STRINGS } from '.';
import { PAGES } from '../../../../content-strings';
import { TEMPLATES } from '../../../../constants';
import { YOUR_BUYER_FIELDS as FIELDS } from '../../../../content-strings/fields/insurance';
import { INSURANCE_ROUTES } from '../../../../constants/routes/insurance';
import INSURANCE_FIELD_IDS from '../../../../constants/field-ids/insurance';
import insuranceCorePageVariables from '../../../../helpers/page-variables/core/insurance';
import getUserNameFromSession from '../../../../helpers/get-user-name-from-session';
import tradingHistoryValidation from './validation';
import constructPayload from '../../../../helpers/construct-payload';
import mapApplicationToFormFields from '../../../../helpers/mappings/map-application-to-form-fields';
import { Request, Response } from '../../../../../types';
import { mockReq, mockRes, mockApplication, mockCurrencies } from '../../../../test-mocks';
import api from '../../../../api';
import mapCurrenciesAsRadioOptions from '../../../../helpers/mappings/map-currencies/as-radio-options';
import mapCurrencies from '../../../../helpers/mappings/map-currencies';

const {
  INSURANCE_ROOT,
  YOUR_BUYER: { TRADING_HISTORY, TRADING_HISTORY_CHANGE, TRADING_HISTORY_CHECK_AND_CHANGE },
  PROBLEM_WITH_SERVICE,
} = INSURANCE_ROUTES;

const {
  CURRENCY: { CURRENCY_CODE, ALTERNATIVE_CURRENCY_CODE },
} = INSURANCE_FIELD_IDS;

describe('controllers/insurance/your-buyer/alternative-currency', () => {
  let req: Request;
  let res: Response;

  let getCurrenciesSpy = jest.fn(() => Promise.resolve(mockCurrencies));

  beforeEach(() => {
    req = mockReq();
    res = mockRes();

    req.params.referenceNumber = String(mockApplication.referenceNumber);
    api.keystone.APIM.getCurrencies = getCurrenciesSpy;
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  describe('PAGE_VARIABLES', () => {
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
        PAGE_CONTENT_STRINGS,
      };

      expect(PAGE_VARIABLES).toEqual(expected);
    });
  });

  describe('FIELD_IDS', () => {
    it('should have the correct FIELD_IDS', () => {
      const EXPECTED_FIELD_IDS = [CURRENCY_CODE];

      expect(FIELD_IDS).toEqual(EXPECTED_FIELD_IDS);
    });
  });

  describe('TEMPLATE', () => {
    it('should have the correct template defined', () => {
      expect(TEMPLATE).toEqual(TEMPLATES.SHARED_PAGES.ALTERNATIVE_CURRENCY);
    });
  });

  describe('PAGE_CONTENT_STRINGS', () => {
    it('should have the correct template defined', () => {
      expect(PAGE_CONTENT_STRINGS).toEqual(PAGES.INSURANCE.YOUR_BUYER.ALTERNATIVE_CURRENCY);
    });
  });

  describe('get', () => {
    it('should call api.keystone.APIM.getCurrencies', async () => {
      await get(req, res);

      expect(getCurrenciesSpy).toHaveBeenCalledTimes(2);
    });

    it('should render template', async () => {
      await get(req, res);

      const expectedCurrencies = mapCurrenciesAsRadioOptions(mockCurrencies, ALTERNATIVE_CURRENCY_CODE);

      const expectedVariables = {
        ...insuranceCorePageVariables({
          PAGE_CONTENT_STRINGS,
          BACK_LINK: req.headers.referer,
        }),
        userName: getUserNameFromSession(req.session.user),
        ...PAGE_VARIABLES,
        application: mapApplicationToFormFields(mockApplication),
        currencies: expectedCurrencies,
        allCurrencies: mapCurrencies(mockCurrencies),
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

    describe('api error handling', () => {
      describe('when the get currencies API call fails', () => {
        beforeEach(() => {
          getCurrenciesSpy = jest.fn(() => Promise.reject(new Error('mock')));
          api.keystone.APIM.getCurrencies = getCurrenciesSpy;
        });

        it(`should redirect to ${PROBLEM_WITH_SERVICE}`, async () => {
          await get(req, res);

          expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
        });
      });

      describe('when the get currencies response does not return a populated array', () => {
        beforeEach(() => {
          getCurrenciesSpy = jest.fn(() => Promise.resolve([]));
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
      getCurrenciesSpy = jest.fn(() => Promise.resolve(mockCurrencies));
      api.keystone.APIM.getCurrencies = getCurrenciesSpy;
      //   mapAndSave.yourBuyer = jest.fn(() => Promise.resolve(true));
    });

    describe('when there are no validation errors', () => {
      beforeEach(() => {
        req.body = validBody;
      });

      it('should redirect to the next page', async () => {
        await post(req, res);
        const expected = `${INSURANCE_ROOT}/${mockApplication.referenceNumber}${TRADING_HISTORY}`;

        expect(res.redirect).toHaveBeenCalledWith(expected);
      });

      describe("when the url's last substring is `check`", () => {
        it(`should redirect to ${TRADING_HISTORY_CHANGE}`, async () => {
          req.originalUrl = TRADING_HISTORY_CHANGE;

          await post(req, res);

          const expected = `${INSURANCE_ROOT}/${mockApplication.referenceNumber}${TRADING_HISTORY_CHANGE}`;

          expect(res.redirect).toHaveBeenCalledWith(expected);
        });
      });

      describe("when the url's last substring is `check-and-change`", () => {
        it(`should redirect to ${TRADING_HISTORY_CHECK_AND_CHANGE}`, async () => {
          req.originalUrl = TRADING_HISTORY_CHECK_AND_CHANGE;

          await post(req, res);

          const expected = `${INSURANCE_ROOT}/${mockApplication.referenceNumber}${TRADING_HISTORY_CHECK_AND_CHANGE}`;

          expect(res.redirect).toHaveBeenCalledWith(expected);
        });
      });
    });

    describe('when there are validation errors', () => {
      it('should call api.keystone.APIM.getCurrencies', async () => {
        await get(req, res);

        expect(getCurrenciesSpy).toHaveBeenCalledTimes(2);
      });

      it('should render template with validation errors', async () => {
        await post(req, res);

        const payload = constructPayload(req.body, FIELD_IDS);

        const validationErrors = tradingHistoryValidation(payload);
        const expectedCurrencies = mapCurrenciesAsRadioOptions(mockCurrencies, ALTERNATIVE_CURRENCY_CODE);

        const expectedVariables = {
          ...insuranceCorePageVariables({
            PAGE_CONTENT_STRINGS,
            BACK_LINK: req.headers.referer,
          }),
          userName: getUserNameFromSession(req.session.user),
          ...PAGE_VARIABLES,
          submittedValues: payload,
          validationErrors,
          currencies: expectedCurrencies,
          allCurrencies: mapCurrencies(mockCurrencies),
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
      describe('get currencies call', () => {
        describe('when the get currencies API call fails', () => {
          beforeEach(() => {
            getCurrenciesSpy = jest.fn(() => Promise.reject(new Error('mock')));
            api.keystone.APIM.getCurrencies = getCurrenciesSpy;
          });

          it(`should redirect to ${PROBLEM_WITH_SERVICE}`, async () => {
            await post(req, res);

            expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
          });
        });

        describe('when the get currencies response does not return a populated array', () => {
          beforeEach(() => {
            getCurrenciesSpy = jest.fn(() => Promise.resolve([]));
            api.keystone.APIM.getCurrencies = getCurrenciesSpy;
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
