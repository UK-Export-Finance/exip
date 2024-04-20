import { FIELD_IDS, PAGE_CONTENT_STRINGS, PAGE_VARIABLES, TEMPLATE, get, post } from '.';
import { TEMPLATES } from '../../../../../constants';
import { INSURANCE_ROUTES } from '../../../../../constants/routes/insurance';
import INSURANCE_FIELD_IDS from '../../../../../constants/field-ids/insurance';
import { PAGES } from '../../../../../content-strings';
import { EXPORT_CONTRACT_FIELDS as FIELDS } from '../../../../../content-strings/fields/insurance/export-contract';
import api from '../../../../../api';
import insuranceCorePageVariables from '../../../../../helpers/page-variables/core/insurance';
import getUserNameFromSession from '../../../../../helpers/get-user-name-from-session';
import mapRadioAndSelectOptions from '../../../../../helpers/mappings/map-currencies/radio-and-select-options';
import constructPayload from '../../../../../helpers/construct-payload';
import generateValidationErrors from './validation';
import { Request, Response } from '../../../../../../types';
import {
  mockReq,
  mockRes,
  mockApplication,
  mockCurrencies,
  mockCurrenciesResponse,
  mockCurrenciesEmptyResponse,
  referenceNumber,
} from '../../../../../test-mocks';

const {
  INSURANCE_ROOT,
  PROBLEM_WITH_SERVICE,
  EXPORT_CONTRACT: { AGENT_CHARGES },
} = INSURANCE_ROUTES;

const {
  CURRENCY: { CURRENCY_CODE, ALTERNATIVE_CURRENCY_CODE },
  EXPORT_CONTRACT: {
    AGENT_CHARGES: { FIXED_SUM_CURRENCY_CODE },
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

describe('controllers/insurance/export-contract/agent-charges/alternative-currency', () => {
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

  describe('FIELD_IDS', () => {
    it('should have the correct FIELD_IDS', () => {
      const expected = [CURRENCY_CODE, ALTERNATIVE_CURRENCY_CODE];

      expect(FIELD_IDS).toEqual(expected);
    });
  });

  describe('PAGE_CONTENT_STRINGS', () => {
    it('should have the correct strings', () => {
      expect(PAGE_CONTENT_STRINGS).toEqual(PAGES.INSURANCE.EXPORT_CONTRACT.AGENT_CHARGES_ALTERNATIVE_CURRENCY);
    });
  });

  describe('TEMPLATE', () => {
    it('should have the correct template defined', () => {
      expect(TEMPLATE).toEqual(TEMPLATES.SHARED_PAGES.ALTERNATIVE_CURRENCY);
    });
  });

  describe('PAGE_VARIABLES', () => {
    it('should have correct properties', () => {
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
      };

      expect(PAGE_VARIABLES).toEqual(expected);
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
        ...PAGE_VARIABLES,
        userName: getUserNameFromSession(req.session.user),
        ...mapRadioAndSelectOptions(alternativeCurrencies, supportedCurrencies, charge[FIXED_SUM_CURRENCY_CODE]),
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
          ...PAGE_VARIABLES,
          userName: getUserNameFromSession(req.session.user),
          ...mapRadioAndSelectOptions(alternativeCurrencies, supportedCurrencies, payload[CURRENCY_CODE]),
          validationErrors,
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

    describe('when there are no validation errors', () => {
      beforeEach(() => {
        req.body = validBody;
      });

      it('should NOT call api.keystone.APIM.getCurrencies', async () => {
        await post(req, res);

        expect(getCurrenciesSpy).toHaveBeenCalledTimes(0);
      });

      it(`should redirect to ${AGENT_CHARGES}`, async () => {
        await post(req, res);

        const expected = `${INSURANCE_ROOT}/${referenceNumber}${AGENT_CHARGES}`;

        expect(res.redirect).toHaveBeenCalledWith(expected);
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
  });
});
