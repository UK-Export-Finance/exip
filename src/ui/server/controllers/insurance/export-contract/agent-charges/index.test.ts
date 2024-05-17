import { pageVariables, FIELD_IDS, PAGE_CONTENT_STRINGS, TEMPLATE, get, post } from '.';
import { TEMPLATES } from '../../../../constants';
import { PARTIALS as PARTIAL_TEMPLATES } from '../../../../constants/templates/partials';
import { INSURANCE_ROUTES } from '../../../../constants/routes/insurance';
import EXPORT_CONTRACT_FIELD_IDS from '../../../../constants/field-ids/insurance/export-contract';
import { PAGES } from '../../../../content-strings';
import { EXPORT_CONTRACT_FIELDS as FIELDS } from '../../../../content-strings/fields/insurance/export-contract';
import api from '../../../../api';
import insuranceCorePageVariables from '../../../../helpers/page-variables/core/insurance';
import getUserNameFromSession from '../../../../helpers/get-user-name-from-session';
import mapApplicationToFormFields from '../../../../helpers/mappings/map-application-to-form-fields';
import getCurrencyByCode from '../../../../helpers/get-currency-by-code';
import mapCountries from '../../../../helpers/mappings/map-countries';
import constructPayload from '../../../../helpers/construct-payload';
import generateValidationErrors from './validation';
import { sanitiseData } from '../../../../helpers/sanitise-data';
import mapAndSave from '../map-and-save/export-contract-agent-service-charge';
import { Request, Response } from '../../../../../types';
import {
  mockReq,
  mockRes,
  mockApplication,
  mockCountries,
  mockCurrencies,
  mockCurrenciesResponse,
  mockExportContractAgentServiceCharge,
  referenceNumber,
} from '../../../../test-mocks';

const { supportedCurrencies } = mockCurrenciesResponse;

const {
  INSURANCE_ROOT,
  PROBLEM_WITH_SERVICE,
  EXPORT_CONTRACT: {
    AGENT_CHARGES_CHANGE,
    AGENT_CHARGES_SAVE_AND_BACK,
    AGENT_CHARGES_ALTERNATIVE_CURRENCY,
    AGENT_CHARGES_ALTERNATIVE_CURRENCY_CHANGE,
    AGENT_CHARGES_ALTERNATIVE_CURRENCY_CHECK_AND_CHANGE,
    AGENT_CHARGES_CHECK_AND_CHANGE,
    CHECK_YOUR_ANSWERS,
  },
  CHECK_YOUR_ANSWERS: { EXPORT_CONTRACT: CHECK_AND_CHANGE_ROUTE },
} = INSURANCE_ROUTES;

const {
  AGENT_CHARGES: { METHOD, PAYABLE_COUNTRY_CODE, FIXED_SUM, FIXED_SUM_AMOUNT, FIXED_SUM_CURRENCY_CODE, PERCENTAGE, PERCENTAGE_CHARGE },
} = EXPORT_CONTRACT_FIELD_IDS;

const {
  INSURANCE: {
    EXPORT_CONTRACT: {
      AGENT_CHARGES: { CONDITIONAL_FIXED_SUM_HTML, CONDITIONAL_PERCENTAGE_HTML },
    },
  },
} = PARTIAL_TEMPLATES;

const {
  exportContract: { agent },
} = mockApplication;

const currencyCode = agent.service.charge[FIXED_SUM_CURRENCY_CODE];

describe('controllers/insurance/export-contract/agent-charges', () => {
  let req: Request;
  let res: Response;

  jest.mock('../map-and-save/export-contract-agent-service-charge');

  let getCountriesSpy = jest.fn(() => Promise.resolve(mockCountries));
  let getCurrenciesSpy = jest.fn(() => Promise.resolve(mockCurrenciesResponse));
  mapAndSave.exportContractAgentServiceCharge = jest.fn(() => Promise.resolve(true));

  beforeEach(() => {
    req = mockReq();
    res = mockRes();

    api.keystone.countries.getAll = getCountriesSpy;
    api.keystone.APIM.getCurrencies = getCurrenciesSpy;
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  describe('FIELD_IDS', () => {
    it('should have the correct FIELD_IDS', () => {
      const expected = [METHOD, PAYABLE_COUNTRY_CODE, FIXED_SUM_AMOUNT, PERCENTAGE_CHARGE];

      expect(FIELD_IDS).toEqual(expected);
    });
  });

  describe('PAGE_CONTENT_STRINGS', () => {
    it('should have the correct strings', () => {
      expect(PAGE_CONTENT_STRINGS).toEqual(PAGES.INSURANCE.EXPORT_CONTRACT.AGENT_CHARGES);
    });
  });

  describe('TEMPLATE', () => {
    it('should have the correct template defined', () => {
      expect(TEMPLATE).toEqual(TEMPLATES.INSURANCE.EXPORT_CONTRACT.AGENT_CHARGES);
    });
  });

  describe('pageVariables', () => {
    it('should have correct properties', () => {
      const result = pageVariables(referenceNumber, mockCurrencies, currencyCode);

      const currency = getCurrencyByCode(mockCurrencies, currencyCode);

      const expected = {
        FIELDS: {
          METHOD: {
            ID: METHOD,
            ...FIELDS.AGENT_CHARGES[METHOD],
          },
          PAYABLE_COUNTRY_CODE: {
            ID: PAYABLE_COUNTRY_CODE,
            ...FIELDS.AGENT_CHARGES[PAYABLE_COUNTRY_CODE],
          },
          FIXED_SUM: {
            ID: FIXED_SUM,
            ...FIELDS.AGENT_CHARGES[FIXED_SUM],
          },
          FIXED_SUM_AMOUNT: {
            ID: FIXED_SUM_AMOUNT,
            ...FIELDS.AGENT_CHARGES[FIXED_SUM_AMOUNT],
            LABEL: `${FIELDS.AGENT_CHARGES[FIXED_SUM_AMOUNT].LABEL} ${currency.name}?`,
          },
          PERCENTAGE: {
            ID: PERCENTAGE,
            ...FIELDS.AGENT_CHARGES[PERCENTAGE],
          },
          PERCENTAGE_CHARGE: {
            ID: PERCENTAGE_CHARGE,
            ...FIELDS.AGENT_CHARGES[PERCENTAGE_CHARGE],
          },
        },
        CURRENCY_PREFIX_SYMBOL: currency.symbol,
        PROVIDE_ALTERNATIVE_CURRENCY_URL: `${INSURANCE_ROOT}/${referenceNumber}${AGENT_CHARGES_ALTERNATIVE_CURRENCY}`,
        SAVE_AND_BACK_URL: `${INSURANCE_ROOT}/${referenceNumber}${AGENT_CHARGES_SAVE_AND_BACK}`,
      };

      expect(result).toEqual(expected);
    });

    describe('when isChange is provided as true', () => {
      it(`should return "PROVIDE_ALTERNATIVE_CURRENCY_URL" as ${AGENT_CHARGES_ALTERNATIVE_CURRENCY_CHANGE}`, () => {
        const isChange = true;

        const result = pageVariables(referenceNumber, mockCurrencies, currencyCode, isChange);

        const expected = `${INSURANCE_ROOT}/${referenceNumber}${AGENT_CHARGES_ALTERNATIVE_CURRENCY_CHANGE}`;

        expect(result.PROVIDE_ALTERNATIVE_CURRENCY_URL).toEqual(expected);
      });
    });

    describe('when checkAndChangeRoute is provided as true', () => {
      it(`should return "PROVIDE_ALTERNATIVE_CURRENCY_URL" as ${AGENT_CHARGES_ALTERNATIVE_CURRENCY_CHECK_AND_CHANGE}`, () => {
        const isChange = false;
        const isCheckAndChangeRoute = true;

        const result = pageVariables(referenceNumber, mockCurrencies, currencyCode, isChange, isCheckAndChangeRoute);

        const expected = `${INSURANCE_ROOT}/${referenceNumber}${AGENT_CHARGES_ALTERNATIVE_CURRENCY_CHECK_AND_CHANGE}`;

        expect(result.PROVIDE_ALTERNATIVE_CURRENCY_URL).toEqual(expected);
      });
    });
  });

  describe('get', () => {
    it('should call api.keystone.countries.getAll', async () => {
      await get(req, res);

      expect(getCountriesSpy).toHaveBeenCalledTimes(1);
    });

    it('should call api.keystone.currencies.getAll', async () => {
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
        ...pageVariables(referenceNumber, supportedCurrencies, currencyCode),
        userName: getUserNameFromSession(req.session.user),
        application: mapApplicationToFormFields(mockApplication),
        countries: mapCountries(mockCountries, agent.service.charge[PAYABLE_COUNTRY_CODE]),
        CONDITIONAL_FIXED_SUM_HTML,
        CONDITIONAL_PERCENTAGE_HTML,
      };

      expect(res.render).toHaveBeenCalledWith(TEMPLATE, expectedVariables);
    });

    describe("when the url's last substring is `change`", () => {
      it('should render template with alternative pageVariables', async () => {
        const isChangeRoute = true;

        req.originalUrl = AGENT_CHARGES_CHANGE;

        await get(req, res);

        const expectedVariables = {
          ...insuranceCorePageVariables({
            PAGE_CONTENT_STRINGS,
            BACK_LINK: req.headers.referer,
          }),
          ...pageVariables(referenceNumber, supportedCurrencies, currencyCode, isChangeRoute),
          userName: getUserNameFromSession(req.session.user),
          application: mapApplicationToFormFields(mockApplication),
          countries: mapCountries(mockCountries, agent.service.charge[PAYABLE_COUNTRY_CODE]),
          CONDITIONAL_FIXED_SUM_HTML,
          CONDITIONAL_PERCENTAGE_HTML,
        };

        expect(res.render).toHaveBeenCalledWith(TEMPLATE, expectedVariables);
      });
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

    describe('when the get countries API call fails', () => {
      beforeEach(() => {
        getCountriesSpy = jest.fn(() => Promise.reject(new Error('mock')));
        api.keystone.countries.getAll = getCountriesSpy;
      });

      it(`should redirect to ${PROBLEM_WITH_SERVICE}`, async () => {
        await get(req, res);

        expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
      });
    });

    describe('when the get countries response does not return a populated array', () => {
      beforeEach(() => {
        getCountriesSpy = jest.fn(() => Promise.resolve([]));
        api.keystone.countries.getAll = getCountriesSpy;
      });

      it(`should redirect to ${PROBLEM_WITH_SERVICE}`, async () => {
        await get(req, res);

        expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
      });
    });

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
        getCurrenciesSpy = jest.fn(() => Promise.resolve({ ...mockCurrenciesResponse, supportedCurrencies: [] }));
        api.keystone.APIM.getCurrencies = getCurrenciesSpy;
      });

      it(`should redirect to ${PROBLEM_WITH_SERVICE}`, async () => {
        await get(req, res);

        expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
      });
    });
  });

  describe('post', () => {
    const validBody = {
      [METHOD]: mockExportContractAgentServiceCharge[METHOD],
      [FIXED_SUM_AMOUNT]: mockExportContractAgentServiceCharge[FIXED_SUM_AMOUNT],
      [PAYABLE_COUNTRY_CODE]: mockExportContractAgentServiceCharge[PAYABLE_COUNTRY_CODE],
    };

    beforeEach(() => {
      getCountriesSpy = jest.fn(() => Promise.resolve(mockCountries));
      getCurrenciesSpy = jest.fn(() => Promise.resolve(mockCurrenciesResponse));

      api.keystone.countries.getAll = getCountriesSpy;
      api.keystone.APIM.getCurrencies = getCurrenciesSpy;
    });

    describe('when there are validation errors', () => {
      it('should call api.keystone.countries.getAll', async () => {
        await post(req, res);

        expect(getCountriesSpy).toHaveBeenCalledTimes(1);
      });

      it('should render template with validation errors and submitted values', async () => {
        req.body = {};
        await post(req, res);

        const payload = constructPayload(req.body, FIELD_IDS);

        const validationErrors = generateValidationErrors(payload);

        expect(res.render).toHaveBeenCalledWith(TEMPLATE, {
          ...insuranceCorePageVariables({
            PAGE_CONTENT_STRINGS,
            BACK_LINK: req.headers.referer,
          }),
          ...pageVariables(referenceNumber, supportedCurrencies, currencyCode),
          userName: getUserNameFromSession(req.session.user),
          application: mapApplicationToFormFields(mockApplication),
          countries: mapCountries(mockCountries, payload[PAYABLE_COUNTRY_CODE]),
          CONDITIONAL_FIXED_SUM_HTML,
          CONDITIONAL_PERCENTAGE_HTML,
          submittedValues: sanitiseData(payload),
          validationErrors,
        });
      });

      describe('when the get countries API call fails', () => {
        beforeEach(() => {
          getCountriesSpy = jest.fn(() => Promise.reject(new Error('mock')));
          api.keystone.countries.getAll = getCountriesSpy;
        });

        it(`should redirect to ${PROBLEM_WITH_SERVICE}`, async () => {
          await post(req, res);

          expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
        });
      });

      describe('when the get countries API call does not return a populated array', () => {
        beforeEach(() => {
          getCountriesSpy = jest.fn(() => Promise.resolve([]));
          api.keystone.countries.getAll = getCountriesSpy;
        });

        it(`should redirect to ${PROBLEM_WITH_SERVICE}`, async () => {
          await post(req, res);

          expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
        });
      });

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
          getCurrenciesSpy = jest.fn(() => Promise.resolve({ ...mockCurrenciesResponse, allCurrencies: [] }));
          api.keystone.APIM.getCurrencies = getCurrenciesSpy;
        });

        it(`should redirect to ${PROBLEM_WITH_SERVICE}`, async () => {
          await get(req, res);

          expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
        });
      });
    });

    describe('when there are no validation errors', () => {
      beforeEach(() => {
        req.body = validBody;
      });

      it('should NOT call api.keystone.countries.getAll', async () => {
        await post(req, res);

        expect(getCountriesSpy).toHaveBeenCalledTimes(0);
      });

      it('should NOT call api.keystone.APIM.getCurrencies', async () => {
        await post(req, res);

        expect(getCurrenciesSpy).toHaveBeenCalledTimes(0);
      });

      it('should call mapAndSave.exportContractAgentServiceCharge with data from constructPayload function and application', async () => {
        req.body = validBody;

        await post(req, res);

        const payload = constructPayload(req.body, FIELD_IDS);

        expect(mapAndSave.exportContractAgentServiceCharge).toHaveBeenCalledTimes(1);

        expect(mapAndSave.exportContractAgentServiceCharge).toHaveBeenCalledWith(payload, res.locals.application);
      });

      it(`should redirect to ${CHECK_YOUR_ANSWERS}`, async () => {
        await post(req, res);

        const expected = `${INSURANCE_ROOT}/${referenceNumber}${CHECK_YOUR_ANSWERS}`;

        expect(res.redirect).toHaveBeenCalledWith(expected);
      });

      describe("when the url's last substring is `check-and-change`", () => {
        it(`should redirect to ${CHECK_AND_CHANGE_ROUTE}`, async () => {
          req.body = validBody;

          req.originalUrl = AGENT_CHARGES_CHECK_AND_CHANGE;

          await post(req, res);

          const expected = `${INSURANCE_ROOT}/${referenceNumber}${CHECK_AND_CHANGE_ROUTE}`;

          expect(res.redirect).toHaveBeenCalledWith(expected);
        });
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

    describe('when mapAndSave.exportContractAgentServiceCharge does not return a true boolean', () => {
      beforeEach(() => {
        req.body = validBody;
        const mapAndSaveSpy = jest.fn(() => Promise.resolve(false));

        mapAndSave.exportContractAgentServiceCharge = mapAndSaveSpy;
      });

      it(`should redirect to ${PROBLEM_WITH_SERVICE}`, async () => {
        await post(req, res);

        expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
      });
    });

    describe('when mapAndSave.exportContractAgentServiceCharge returns an error', () => {
      beforeEach(() => {
        req.body = validBody;
        const mapAndSaveSpy = jest.fn(() => Promise.reject(new Error('mock')));

        mapAndSave.exportContractAgentServiceCharge = mapAndSaveSpy;
      });

      it(`should redirect to ${PROBLEM_WITH_SERVICE}`, async () => {
        await post(req, res);

        expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
      });
    });
  });
});
