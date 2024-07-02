import { FIELD_ID, PAGE_VARIABLES, TEMPLATE, get, post } from '.';
import { PAGES } from '../../../../content-strings';
import { FIELD_IDS, TEMPLATES } from '../../../../constants';
import { INSURANCE_ROUTES } from '../../../../constants/routes/insurance';
import singleInputPageVariables from '../../../../helpers/page-variables/single-input/insurance';
import getUserNameFromSession from '../../../../helpers/get-user-name-from-session';
import constructPayload from '../../../../helpers/construct-payload';
import { validation as generateValidationErrors } from '../../../../shared-validation/buyer-country';
import api from '../../../../api';
import mapCountries from '../../../../helpers/mappings/map-countries';
import { Request, Response } from '../../../../../types';
import { mockReq, mockRes, mockCountries } from '../../../../test-mocks';

const {
  PROBLEM_WITH_SERVICE,
  ELIGIBILITY: { CANNOT_APPLY: CANNOT_APPLY_ROUTE },
} = INSURANCE_ROUTES;

describe('controllers/insurance/eligibility/buyer-country', () => {
  let req: Request;
  let res: Response;

  const mockCountriesResponse = mockCountries;

  const mockFlash = jest.fn();

  beforeEach(() => {
    req = mockReq();
    req.flash = mockFlash;

    res = mockRes();
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  describe('FIELD_ID', () => {
    it('should have the correct ID', () => {
      const expected = FIELD_IDS.INSURANCE.ELIGIBILITY.BUYER_COUNTRY;

      expect(FIELD_ID).toEqual(expected);
    });
  });

  describe('PAGE_VARIABLES', () => {
    it('should have correct properties', () => {
      const expected = {
        FIELD_ID: FIELD_IDS.ELIGIBILITY.BUYER_COUNTRY,
        PAGE_CONTENT_STRINGS: PAGES.BUYER_COUNTRY,
      };

      expect(PAGE_VARIABLES).toEqual(expected);
    });
  });

  describe('TEMPLATE', () => {
    it('should have the correct template defined', () => {
      expect(TEMPLATE).toEqual(TEMPLATES.SHARED_PAGES.BUYER_COUNTRY);
    });
  });

  describe('get', () => {
    let getCisCountriesSpy = jest.fn(() => Promise.resolve(mockCountriesResponse));

    beforeEach(() => {
      api.keystone.APIM.getCisCountries = getCisCountriesSpy;
    });

    it('should call api.keystone.APIM.getCisCountries', async () => {
      await get(req, res);

      expect(getCisCountriesSpy).toHaveBeenCalledTimes(1);
    });

    it('should render template', async () => {
      await get(req, res);

      const expectedVariables = {
        ...singleInputPageVariables(PAGE_VARIABLES),
        BACK_LINK: req.headers.referer,
        userName: getUserNameFromSession(req.session.user),
        countries: mapCountries(mockCountriesResponse, req.session.submittedData.insuranceEligibility[FIELD_ID]?.isoCode),
        submittedValues: req.session.submittedData.insuranceEligibility,
      };

      expect(res.render).toHaveBeenCalledWith(TEMPLATE, expectedVariables);
    });

    describe('when the get CIS countries API call fails', () => {
      beforeEach(() => {
        getCisCountriesSpy = jest.fn(() => Promise.reject(new Error('mock')));
        api.keystone.APIM.getCisCountries = getCisCountriesSpy;
      });

      it(`should redirect to ${PROBLEM_WITH_SERVICE}`, async () => {
        await get(req, res);
        expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
      });
    });

    describe('when the get CIS countries API call does not return a populated array', () => {
      beforeEach(() => {
        getCisCountriesSpy = jest.fn(() => Promise.resolve([]));
        api.keystone.APIM.getCisCountries = getCisCountriesSpy;
      });

      it(`should redirect to ${PROBLEM_WITH_SERVICE}`, async () => {
        await get(req, res);
        expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
      });
    });
  });

  describe('post', () => {
    let getCisCountriesSpy = jest.fn(() => Promise.resolve(mockCountriesResponse));

    beforeEach(() => {
      api.keystone.APIM.getCisCountries = getCisCountriesSpy;
    });

    describe('when there are validation errors', () => {
      it('should render template with validation errors with data from constructPayload function', async () => {
        await post(req, res);

        const payload = constructPayload(req.body, [FIELD_ID]);

        expect(res.render).toHaveBeenCalledWith(TEMPLATE, {
          ...singleInputPageVariables(PAGE_VARIABLES),
          userName: getUserNameFromSession(req.session.user),
          BACK_LINK: req.headers.referer,
          countries: mapCountries(mockCountriesResponse),
          validationErrors: generateValidationErrors(payload),
        });
      });
    });

    describe('when the submitted country is not found', () => {
      beforeEach(() => {
        req.body[FIELD_IDS.ELIGIBILITY.BUYER_COUNTRY] = 'Country not in the mock response';
      });

      it(`should redirect to ${CANNOT_APPLY_ROUTE}`, async () => {
        await post(req, res);

        expect(res.redirect).toHaveBeenCalledWith(CANNOT_APPLY_ROUTE);
      });
    });

    describe('when the get CIS countries API call fails', () => {
      beforeEach(() => {
        getCisCountriesSpy = jest.fn(() => Promise.reject(new Error('mock')));
        api.keystone.APIM.getCisCountries = getCisCountriesSpy;
      });

      it(`should redirect to ${PROBLEM_WITH_SERVICE}`, async () => {
        await post(req, res);
        expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
      });
    });

    describe('when the get CIS countries API call does not return a populated array', () => {
      beforeEach(() => {
        getCisCountriesSpy = jest.fn(() => Promise.resolve([]));
        api.keystone.APIM.getCisCountries = getCisCountriesSpy;
      });

      it(`should redirect to ${PROBLEM_WITH_SERVICE}`, async () => {
        await post(req, res);
        expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
      });
    });
  });
});
