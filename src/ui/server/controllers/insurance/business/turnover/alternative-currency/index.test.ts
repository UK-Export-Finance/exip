import { PAGE_VARIABLES, TEMPLATE, FIELD_IDS, PAGE_CONTENT_STRINGS, get, post } from '.';
import { PAGES } from '../../../../../content-strings';
import { TEMPLATES } from '../../../../../constants';
import { INSURANCE_ROUTES } from '../../../../../constants/routes/insurance';
import INSURANCE_FIELD_IDS from '../../../../../constants/field-ids/insurance';
import { FIELDS } from '../../../../../content-strings/fields/insurance';
import api from '../../../../../api';
import mapRadioAndSelectOptions from '../../../../../helpers/mappings/map-currencies/radio-and-select-options';
import constructPayload from '../../../../../helpers/construct-payload';
import insuranceCorePageVariables from '../../../../../helpers/page-variables/core/insurance';
import getUserNameFromSession from '../../../../../helpers/get-user-name-from-session';
import generateValidationErrors from './validation';
import mapAndSave from '../../map-and-save/turnover';
import { Request, Response } from '../../../../../../types';
import { mockReq, mockRes, mockCurrenciesResponse, mockCurrenciesEmptyResponse, mockApplication, GBP } from '../../../../../test-mocks';

const {
  INSURANCE_ROOT,
  EXPORTER_BUSINESS: { TURNOVER_ROOT, TURNOVER_CHANGE, TURNOVER_CHECK_AND_CHANGE },
  PROBLEM_WITH_SERVICE,
} = INSURANCE_ROUTES;

const {
  CURRENCY: { CURRENCY_CODE, ALTERNATIVE_CURRENCY_CODE },
  EXPORTER_BUSINESS: {
    TURNOVER: { TURNOVER_CURRENCY_CODE },
  },
} = INSURANCE_FIELD_IDS;

const { supportedCurrencies, alternativeCurrencies } = mockCurrenciesResponse;

jest.mock('../../map-and-save/turnover');

describe('controllers/insurance/business/turnover/alternative-currency', () => {
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
      };

      expect(PAGE_VARIABLES).toEqual(expected);
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
      expect(TEMPLATE).toEqual(TEMPLATES.SHARED_PAGES.ALTERNATIVE_CURRENCY);
    });
  });

  describe('PAGE_CONTENT_STRINGS', () => {
    it('should have the correct template defined', () => {
      expect(PAGE_CONTENT_STRINGS).toEqual(PAGES.INSURANCE.EXPORTER_BUSINESS.TURNOVER_ALTERNATIVE_CURRENCY);
    });
  });

  describe('get', () => {
    it('should call api.keystone.APIM.getCurrencies', async () => {
      await get(req, res);

      expect(getCurrenciesSpy).toHaveBeenCalledTimes(1);
    });

    it('should render template', async () => {
      await get(req, res);

      expect(res.render).toHaveBeenCalledWith(TEMPLATE, {
        ...insuranceCorePageVariables({
          PAGE_CONTENT_STRINGS,
          BACK_LINK: req.headers.referer,
        }),
        ...PAGE_VARIABLES,
        userName: getUserNameFromSession(req.session.user),
        ...mapRadioAndSelectOptions(alternativeCurrencies, supportedCurrencies, mockApplication.business[TURNOVER_CURRENCY_CODE]),
      });
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
    mapAndSave.turnover = jest.fn(() => Promise.resolve(true));

    const validBody = {
      [CURRENCY_CODE]: GBP,
    };

    beforeEach(() => {
      getCurrenciesSpy = jest.fn(() => Promise.resolve(mockCurrenciesResponse));
      api.keystone.APIM.getCurrencies = getCurrenciesSpy;
    });

    describe('when there are validation errors', () => {
      it('should call api.keystone.APIM.getCurrencies', async () => {
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
          ...mapRadioAndSelectOptions(alternativeCurrencies, supportedCurrencies, ''),
          validationErrors,
        });
      });
    });

    describe('when there are no validation errors', () => {
      beforeEach(() => {
        req.body = validBody;
      });

      it('should call mapAndSave.business once with the data from constructPayload function and application', async () => {
        await post(req, res);

        const payload = constructPayload(req.body, FIELD_IDS);

        expect(mapAndSave.turnover).toHaveBeenCalledTimes(1);

        expect(mapAndSave.turnover).toHaveBeenCalledWith(payload, mockApplication);
      });

      it(`should redirect to ${TURNOVER_ROOT}`, async () => {
        req.body = validBody;

        await post(req, res);

        const expected = `${INSURANCE_ROOT}/${mockApplication.referenceNumber}${TURNOVER_ROOT}`;
        expect(res.redirect).toHaveBeenCalledWith(expected);
      });

      describe("when the url's last substring is `check`", () => {
        it(`should redirect to ${TURNOVER_CHANGE}`, async () => {
          req.originalUrl = TURNOVER_CHANGE;

          await post(req, res);

          const expected = `${INSURANCE_ROOT}/${mockApplication.referenceNumber}${TURNOVER_CHANGE}`;

          expect(res.redirect).toHaveBeenCalledWith(expected);
        });
      });

      describe("when the url's last substring is `check-and-change`", () => {
        it(`should redirect to ${TURNOVER_CHECK_AND_CHANGE}`, async () => {
          req.originalUrl = TURNOVER_CHECK_AND_CHANGE;

          await post(req, res);

          const expected = `${INSURANCE_ROOT}/${mockApplication.referenceNumber}${TURNOVER_CHECK_AND_CHANGE}`;

          expect(res.redirect).toHaveBeenCalledWith(expected);
        });
      });
    });

    describe('when there is no application', () => {
      beforeEach(() => {
        delete res.locals.application;
      });

      it(`should redirect to ${PROBLEM_WITH_SERVICE}`, () => {
        post(req, res);

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
