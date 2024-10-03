import { PAGE_CONTENT_STRINGS, pageVariables, TEMPLATE, FIELD_ID, get, post } from '.';
import { TEMPLATES } from '../../../../constants';
import { INSURANCE_ROUTES } from '../../../../constants/routes/insurance';
import { EXPORT_CONTRACT as EXPORT_CONTRACT_FIELD_IDS } from '../../../../constants/field-ids/insurance/export-contract';
import { PAGES } from '../../../../content-strings';
import { EXPORT_CONTRACT_FIELDS as FIELDS } from '../../../../content-strings/fields/insurance/export-contract';
import api from '../../../../api';
import getCurrencyByCode from '../../../../helpers/get-currency-by-code';
import singleInputPageVariables from '../../../../helpers/page-variables/single-input/insurance';
import getUserNameFromSession from '../../../../helpers/get-user-name-from-session';
import mapApplicationToFormFields from '../../../../helpers/mappings/map-application-to-form-fields';
import constructPayload from '../../../../helpers/construct-payload';
import generateValidationErrors from './validation';
import { sanitiseData } from '../../../../helpers/sanitise-data';
import mapAndSave from '../map-and-save/export-contract-agent-service-charge';
import { Request, Response } from '../../../../../types';
import { mockReq, mockRes, mockCurrencies, mockCurrenciesResponse, mockCurrenciesEmptyResponse, mockSpyPromiseRejection } from '../../../../test-mocks';
import { mockApplicationMultiplePolicy as mockApplication } from '../../../../test-mocks/mock-application';

const {
  INSURANCE_ROOT,
  EXPORT_CONTRACT: { CHECK_YOUR_ANSWERS, HOW_MUCH_THE_AGENT_IS_CHARGING_SAVE_AND_BACK, HOW_MUCH_THE_AGENT_IS_CHARGING_CHECK_AND_CHANGE },
  CHECK_YOUR_ANSWERS: { EXPORT_CONTRACT: CHECK_AND_CHANGE_ROUTE },
  PROBLEM_WITH_SERVICE,
} = INSURANCE_ROUTES;

const {
  AGENT_CHARGES: { FIXED_SUM_AMOUNT },
} = EXPORT_CONTRACT_FIELD_IDS;

const {
  exportContract: {
    agent: {
      service: {
        charge: { fixedSumCurrencyCode },
      },
    },
  },
  referenceNumber,
} = mockApplication;

const { allCurrencies } = mockCurrenciesResponse;

describe('controllers/insurance/export-contract/how-much-the-agent-is-charging', () => {
  let req: Request;
  let res: Response;

  jest.mock('../map-and-save/export-contract-agent-service-charge');

  let getCurrenciesSpy = jest.fn(() => Promise.resolve(mockCurrenciesResponse));
  mapAndSave.exportContractAgentServiceCharge = jest.fn(() => Promise.resolve(true));

  beforeEach(() => {
    req = mockReq();
    res = mockRes();

    api.keystone.APIM.getCurrencies = getCurrenciesSpy;
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  describe('PAGE_CONTENT_STRINGS', () => {
    it('should have the correct strings', () => {
      expect(PAGE_CONTENT_STRINGS).toEqual(PAGES.INSURANCE.EXPORT_CONTRACT.HOW_MUCH_THE_AGENT_IS_CHARGING);
    });
  });

  describe('pageVariables', () => {
    it('should have correct properties', () => {
      const result = pageVariables(referenceNumber, allCurrencies, String(fixedSumCurrencyCode));

      const currency = getCurrencyByCode(allCurrencies, String(fixedSumCurrencyCode));

      const expected = {
        FIELD: {
          ID: FIELD_ID,
          ...FIELDS.AGENT_CHARGES[FIELD_ID],
        },
        DYNAMIC_PAGE_TITLE: `${PAGE_CONTENT_STRINGS.PAGE_TITLE} ${currency.name}?`,
        CURRENCY_PREFIX_SYMBOL: currency.symbol,
        SAVE_AND_BACK_URL: `${INSURANCE_ROOT}/${referenceNumber}${HOW_MUCH_THE_AGENT_IS_CHARGING_SAVE_AND_BACK}`,
      };

      expect(result).toEqual(expected);
    });
  });

  describe('TEMPLATE', () => {
    it('should have the correct template defined', () => {
      expect(TEMPLATE).toEqual(TEMPLATES.INSURANCE.EXPORT_CONTRACT.HOW_MUCH_THE_AGENT_IS_CHARGING);
    });
  });

  describe('FIELD_ID', () => {
    it('should have the correct ID', () => {
      const expected = FIXED_SUM_AMOUNT;

      expect(FIELD_ID).toEqual(expected);
    });
  });

  describe('get', () => {
    it('should call api.keystone.APIM.getCurrencies', async () => {
      await get(req, res);

      expect(getCurrenciesSpy).toHaveBeenCalledTimes(1);
    });

    it('should render template', async () => {
      res.locals.application = mockApplication;

      await get(req, res);

      const generatedPageVariables = pageVariables(referenceNumber, allCurrencies, String(fixedSumCurrencyCode));

      const { DYNAMIC_PAGE_TITLE } = generatedPageVariables;

      const expectedVariables = {
        ...singleInputPageVariables({
          FIELD_ID,
          PAGE_CONTENT_STRINGS: {
            ...PAGE_CONTENT_STRINGS,
            PAGE_TITLE: DYNAMIC_PAGE_TITLE,
          },
          BACK_LINK: req.headers.referer,
        }),
        ...generatedPageVariables,
        userName: getUserNameFromSession(req.session.user),
        application: mapApplicationToFormFields(mockApplication),
      };

      expect(res.render).toHaveBeenCalledWith(TEMPLATE, expectedVariables);
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
    beforeEach(() => {
      getCurrenciesSpy = jest.fn(() => Promise.resolve(mockCurrenciesResponse));
      api.keystone.APIM.getCurrencies = getCurrenciesSpy;
    });

    const validBody = {
      [FIELD_ID]: mockApplication.exportContract.agent.service.charge[FIELD_ID],
    };

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

        const payload = constructPayload(req.body, [FIELD_ID]);

        expect(mapAndSave.exportContractAgentServiceCharge).toHaveBeenCalledTimes(1);

        expect(mapAndSave.exportContractAgentServiceCharge).toHaveBeenCalledWith(payload, res.locals.application);
      });

      describe("when the url's last substring is 'check-and-change'", () => {
        it(`should redirect to ${CHECK_AND_CHANGE_ROUTE}`, async () => {
          req.originalUrl = HOW_MUCH_THE_AGENT_IS_CHARGING_CHECK_AND_CHANGE;

          await post(req, res);

          const expected = `${INSURANCE_ROOT}/${referenceNumber}${CHECK_AND_CHANGE_ROUTE}`;

          expect(res.redirect).toHaveBeenCalledWith(expected);
        });
      });

      it(`should redirect to ${CHECK_YOUR_ANSWERS}`, async () => {
        await post(req, res);

        const expected = `${INSURANCE_ROOT}/${referenceNumber}${CHECK_YOUR_ANSWERS}`;

        expect(res.redirect).toHaveBeenCalledWith(expected);
      });
    });

    describe('when there are validation errors', () => {
      it('should call api.keystone.APIM.getCurrencies', async () => {
        await get(req, res);

        expect(getCurrenciesSpy).toHaveBeenCalledTimes(1);
      });

      it('should render template with validation errors and submitted values from constructPayload function', async () => {
        res.locals.application = mockApplication;

        await post(req, res);

        const payload = constructPayload(req.body, [FIELD_ID]);

        const generatedPageVariables = pageVariables(referenceNumber, mockCurrencies, String(fixedSumCurrencyCode));

        const { DYNAMIC_PAGE_TITLE } = generatedPageVariables;

        const expectedVariables = {
          ...singleInputPageVariables({
            FIELD_ID,
            PAGE_CONTENT_STRINGS: {
              ...PAGE_CONTENT_STRINGS,
              PAGE_TITLE: DYNAMIC_PAGE_TITLE,
            },
            BACK_LINK: req.headers.referer,
          }),
          ...generatedPageVariables,
          userName: getUserNameFromSession(req.session.user),
          application: mapApplicationToFormFields(mockApplication),
          submittedValues: sanitiseData(payload),
          validationErrors: generateValidationErrors(payload),
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
    });
  });
});
