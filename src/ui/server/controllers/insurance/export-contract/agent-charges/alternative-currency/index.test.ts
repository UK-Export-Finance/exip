import { FIELD_IDS, PAGE_CONTENT_STRINGS, PAGE_VARIABLES, TEMPLATE, get } from '.';
import { TEMPLATES } from '../../../../../constants';
import { INSURANCE_ROUTES } from '../../../../../constants/routes/insurance';
import INSURANCE_FIELD_IDS from '../../../../../constants/field-ids/insurance';
import { PAGES } from '../../../../../content-strings';
import { EXPORT_CONTRACT_FIELDS as FIELDS } from '../../../../../content-strings/fields/insurance/export-contract';
import api from '../../../../../api';
import insuranceCorePageVariables from '../../../../../helpers/page-variables/core/insurance';
import getUserNameFromSession from '../../../../../helpers/get-user-name-from-session';
import mapRadioAndSelectOptions from '../../../../../helpers/mappings/map-currencies/radio-and-select-options';
import { Request, Response } from '../../../../../../types';
import { mockReq, mockRes, mockCurrenciesResponse, mockCurrenciesEmptyResponse } from '../../../../../test-mocks';

const { PROBLEM_WITH_SERVICE } = INSURANCE_ROUTES;

const {
  CURRENCY: { CURRENCY_CODE, ALTERNATIVE_CURRENCY_CODE },
} = INSURANCE_FIELD_IDS;

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
        ...mapRadioAndSelectOptions(alternativeCurrencies, supportedCurrencies),
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
});
