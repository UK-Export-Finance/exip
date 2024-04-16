import { pageVariables, FIELD_IDS, PAGE_CONTENT_STRINGS, TEMPLATE, get } from '.';
import { TEMPLATES } from '../../../../constants';
import { INSURANCE_ROUTES } from '../../../../constants/routes/insurance';
import EXPORT_CONTRACT_FIELD_IDS from '../../../../constants/field-ids/insurance/export-contract';
import { PAGES } from '../../../../content-strings';
import { EXPORT_CONTRACT_FIELDS as FIELDS } from '../../../../content-strings/fields/insurance/export-contract';
import api from '../../../../api';
import insuranceCorePageVariables from '../../../../helpers/page-variables/core/insurance';
import getUserNameFromSession from '../../../../helpers/get-user-name-from-session';
import mapApplicationToFormFields from '../../../../helpers/mappings/map-application-to-form-fields';
import mapCountries from '../../../../helpers/mappings/map-countries';
import { Request, Response } from '../../../../../types';
import { mockReq, mockRes, mockApplication, mockCountries } from '../../../../test-mocks';

const { INSURANCE_ROOT, PROBLEM_WITH_SERVICE } = INSURANCE_ROUTES;

const {
  AGENT_CHARGES: { METHOD, PAYABLE_COUNTRY_CODE, FIXED_SUM, FIXED_SUM_CURRENCY_CODE, PERCENTAGE },
} = EXPORT_CONTRACT_FIELD_IDS;

const { referenceNumber } = mockApplication;

describe('controllers/insurance/export-contract/agent-service', () => {
  let req: Request;
  let res: Response;

  let getCountriesSpy = jest.fn(() => Promise.resolve(mockCountries));

  beforeEach(() => {
    req = mockReq();
    res = mockRes();

    api.keystone.countries.getAll = getCountriesSpy;
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  describe('FIELD_IDS', () => {
    it('should have the correct FIELD_IDS', () => {
      const expected = [METHOD, PAYABLE_COUNTRY_CODE, FIXED_SUM, FIXED_SUM_CURRENCY_CODE, PERCENTAGE];

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
      const result = pageVariables(referenceNumber);

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
          FIXED_SUM_CURRENCY_CODE: {
            ID: FIXED_SUM_CURRENCY_CODE,
            ...FIELDS.AGENT_CHARGES[FIXED_SUM_CURRENCY_CODE],
          },
          PERCENTAGE: {
            ID: PERCENTAGE,
            ...FIELDS.AGENT_CHARGES[PERCENTAGE],
          },
        },
        SAVE_AND_BACK_URL: `${INSURANCE_ROOT}/${referenceNumber}#`,
      };

      expect(result).toEqual(expected);
    });
  });

  describe('get', () => {
    it('should call api.keystone.countries.getAll', async () => {
      await get(req, res);

      expect(getCountriesSpy).toHaveBeenCalledTimes(1);
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
        application: mapApplicationToFormFields(mockApplication),
        countries: mapCountries(mockCountries),
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
  });
});
