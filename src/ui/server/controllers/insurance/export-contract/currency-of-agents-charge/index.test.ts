import { FIELD_IDS, PAGE_CONTENT_STRINGS, pageVariables, TEMPLATE, get, post } from '.';
import { TEMPLATES } from '../../../../constants';
import { INSURANCE_ROUTES } from '../../../../constants/routes/insurance';
import INSURANCE_FIELD_IDS from '../../../../constants/field-ids/insurance';
import { PAGES } from '../../../../content-strings';
import { EXPORT_CONTRACT_FIELDS as FIELDS } from '../../../../content-strings/fields/insurance/export-contract';
import api from '../../../../api';
import insuranceCorePageVariables from '../../../../helpers/page-variables/core/insurance';
import getUserNameFromSession from '../../../../helpers/get-user-name-from-session';
import mapRadioAndSelectOptions from '../../../../helpers/mappings/map-currencies/radio-and-select-options';
import constructPayload from '../../../../helpers/construct-payload';
import generateValidationErrors from './validation';
import mapAndSave from '../map-and-save/export-contract-agent-service-charge';
import { Request, ResponseInsurance } from '../../../../../types';
import {
  mockReq,
  mockResInsurance,
  mockApplication,
  mockCurrencies,
  mockCurrenciesResponse,
  mockCurrenciesEmptyResponse,
  mockSpyPromiseRejection,
  referenceNumber,
} from '../../../../test-mocks';

const {
  INSURANCE_ROOT,
  PROBLEM_WITH_SERVICE,
  EXPORT_CONTRACT: {
    AGENT_CHARGES_CURRENCY_SAVE_AND_BACK,
    AGENT_CHARGES_CURRENCY_CHANGE,
    AGENT_CHARGES_CURRENCY_CHECK_AND_CHANGE,
    HOW_MUCH_THE_AGENT_IS_CHARGING,
    HOW_MUCH_THE_AGENT_IS_CHARGING_CHANGE,
    HOW_MUCH_THE_AGENT_IS_CHARGING_CHECK_AND_CHANGE,
    CHECK_YOUR_ANSWERS,
  },
  CHECK_YOUR_ANSWERS: { EXPORT_CONTRACT: CHECK_AND_CHANGE_ROUTE },
} = INSURANCE_ROUTES;

const {
  CURRENCY: { CURRENCY_CODE, ALTERNATIVE_CURRENCY_CODE },
  EXPORT_CONTRACT: {
    AGENT_CHARGES: { FIXED_SUM_CURRENCY_CODE, FIXED_SUM_AMOUNT },
  },
} = INSURANCE_FIELD_IDS;

const {
  exportContract: {
    agent: {
      service: { charge },
    },
  },
} = mockApplication;

const { supportedCurrencies, alternativeCurrencies } = mockCurrenciesResponse;

describe('controllers/insurance/export-contract/currency-of-agents-charge', () => {
  let req: Request;
  let res: ResponseInsurance;

  jest.mock('../map-and-save/export-contract-agent-service-charge');

  let getCurrenciesSpy = jest.fn(() => Promise.resolve(mockCurrenciesResponse));
  mapAndSave.exportContractAgentServiceCharge = jest.fn(() => Promise.resolve(true));

  beforeEach(() => {
    req = mockReq();
    res = mockResInsurance();

    api.keystone.APIM.getCurrencies = getCurrenciesSpy;
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  describe('FIELD_IDS', () => {
    it('should have the correct FIELD_IDS', () => {
      const expected = [CURRENCY_CODE, ALTERNATIVE_CURRENCY_CODE];

      expect(FIELD_IDS).toEqual(expected);
    });
  });

  describe('PAGE_CONTENT_STRINGS', () => {
    it('should have the correct strings', () => {
      expect(PAGE_CONTENT_STRINGS).toEqual(PAGES.INSURANCE.EXPORT_CONTRACT.AGENT_CHARGES_CURRENCY);
    });
  });

  describe('TEMPLATE', () => {
    it('should have the correct template defined', () => {
      expect(TEMPLATE).toEqual(TEMPLATES.SHARED_PAGES.CURRENCY);
    });
  });

  describe('pageVariables', () => {
    it('should have correct properties', () => {
      const result = pageVariables(referenceNumber);

      const expected = {
        FIELDS: {
          CURRENCY_CODE: {
            ID: CURRENCY_CODE,
            ...FIELDS.AGENT_CHARGES[CURRENCY_CODE],
          },
          ALTERNATIVE_CURRENCY_CODE: {
            ID: ALTERNATIVE_CURRENCY_CODE,
          },
        },
        SAVE_AND_BACK_URL: `${INSURANCE_ROOT}/${referenceNumber}${AGENT_CHARGES_CURRENCY_SAVE_AND_BACK}`,
      };

      expect(result).toEqual(expected);
    });
  });

  describe('get', () => {
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
        ...pageVariables(referenceNumber),
        userName: getUserNameFromSession(req.session.user),
        ...mapRadioAndSelectOptions(alternativeCurrencies, supportedCurrencies, charge[FIXED_SUM_CURRENCY_CODE]),
      };

      expect(res.render).toHaveBeenCalledWith(TEMPLATE, expectedVariables);
    });

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

  describe('post', () => {
    const validBody = {
      [CURRENCY_CODE]: mockCurrencies[0].isoCode,
    };

    beforeEach(() => {
      getCurrenciesSpy = jest.fn(() => Promise.resolve(mockCurrenciesResponse));

      api.keystone.APIM.getCurrencies = getCurrenciesSpy;
    });

    describe('when there are validation errors', () => {
      it('should call api.keystone.currencies.getAll', async () => {
        await post(req, res);

        expect(getCurrenciesSpy).toHaveBeenCalledTimes(1);
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
          ...pageVariables(referenceNumber),
          userName: getUserNameFromSession(req.session.user),
          ...mapRadioAndSelectOptions(alternativeCurrencies, supportedCurrencies, payload[CURRENCY_CODE]),
          validationErrors,
        });
      });

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
          getCurrenciesSpy = jest.fn(() => Promise.resolve({ ...mockCurrenciesResponse, supportedCurrencies: [] }));
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

      describe("when the url's last substring is 'change'", () => {
        beforeEach(() => {
          req.originalUrl = AGENT_CHARGES_CURRENCY_CHANGE;
        });

        describe(`when the application/agent data does NOT have a ${FIXED_SUM_AMOUNT} value`, () => {
          it(`should redirect to ${HOW_MUCH_THE_AGENT_IS_CHARGING_CHANGE}`, async () => {
            res.locals.application = mockApplication;
            res.locals.application.exportContract.agent.service.charge.fixedSumAmount = '';

            await post(req, res);

            const expected = `${INSURANCE_ROOT}/${referenceNumber}${HOW_MUCH_THE_AGENT_IS_CHARGING_CHANGE}`;

            expect(res.redirect).toHaveBeenCalledWith(expected);
          });
        });

        describe(`when the application/agent data has a ${FIXED_SUM_AMOUNT} value`, () => {
          it(`should redirect to ${CHECK_YOUR_ANSWERS}`, async () => {
            res.locals.application = mockApplication;
            res.locals.application.exportContract.agent.service.charge.fixedSumAmount = '123';

            await post(req, res);

            const expected = `${INSURANCE_ROOT}/${referenceNumber}${CHECK_YOUR_ANSWERS}`;

            expect(res.redirect).toHaveBeenCalledWith(expected);
          });
        });
      });

      describe("when the url's last substring is 'check-and-change'", () => {
        beforeEach(() => {
          req.originalUrl = AGENT_CHARGES_CURRENCY_CHECK_AND_CHANGE;
        });

        describe(`when the application/agent data does NOT have a ${FIXED_SUM_AMOUNT} value`, () => {
          it(`should redirect to ${HOW_MUCH_THE_AGENT_IS_CHARGING_CHECK_AND_CHANGE}`, async () => {
            res.locals.application = mockApplication;
            res.locals.application.exportContract.agent.service.charge.fixedSumAmount = '';

            await post(req, res);

            const expected = `${INSURANCE_ROOT}/${referenceNumber}${HOW_MUCH_THE_AGENT_IS_CHARGING_CHECK_AND_CHANGE}`;

            expect(res.redirect).toHaveBeenCalledWith(expected);
          });
        });

        describe(`when the application/agent data has a ${FIXED_SUM_AMOUNT} value`, () => {
          it(`should redirect to ${CHECK_AND_CHANGE_ROUTE}`, async () => {
            res.locals.application = mockApplication;
            res.locals.application.exportContract.agent.service.charge.fixedSumAmount = '123';

            await post(req, res);

            const expected = `${INSURANCE_ROOT}/${referenceNumber}${CHECK_AND_CHANGE_ROUTE}`;

            expect(res.redirect).toHaveBeenCalledWith(expected);
          });
        });
      });

      it(`should redirect to ${HOW_MUCH_THE_AGENT_IS_CHARGING}`, async () => {
        await post(req, res);

        const expected = `${INSURANCE_ROOT}/${referenceNumber}${HOW_MUCH_THE_AGENT_IS_CHARGING}`;

        expect(res.redirect).toHaveBeenCalledWith(expected);
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
        const mapAndSaveSpy = mockSpyPromiseRejection;

        mapAndSave.exportContractAgentServiceCharge = mapAndSaveSpy;
      });

      it(`should redirect to ${PROBLEM_WITH_SERVICE}`, async () => {
        await post(req, res);

        expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
      });
    });
  });
});
