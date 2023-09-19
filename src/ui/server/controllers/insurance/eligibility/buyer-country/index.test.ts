import { FIELD_ID, PAGE_VARIABLES, TEMPLATE, get, post } from '.';
import { PAGES } from '../../../../content-strings';
import { FIELD_IDS, ROUTES, TEMPLATES } from '../../../../constants';
import singleInputPageVariables from '../../../../helpers/page-variables/single-input/insurance';
import getUserNameFromSession from '../../../../helpers/get-user-name-from-session';
import constructPayload from '../../../../helpers/construct-payload';
import { validation as generateValidationErrors } from '../../../../shared-validation/buyer-country';
import api from '../../../../api';
import mapCountries from '../../../../helpers/mappings/map-countries';
import getCountryByName from '../../../../helpers/get-country-by-name';
import mapSubmittedEligibilityCountry from '../../../../helpers/mappings/map-submitted-eligibility-country';
import { updateSubmittedData } from '../../../../helpers/update-submitted-data/insurance';
import { Country, Request, Response } from '../../../../../types';
import { mockReq, mockRes, mockSession, mockCountries } from '../../../../test-mocks';

const { PROBLEM_WITH_SERVICE } = ROUTES.INSURANCE;

describe('controllers/insurance/eligibility/buyer-country', () => {
  let req: Request;
  let res: Response;

  let mockCountriesResponse = mockCountries;

  const { 1: countryApplyOnline, 3: countryApplyOffline, 4: countryCannotApply } = mockCountriesResponse;
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
      delete req.session.submittedData.quoteEligibility[FIELD_IDS.ELIGIBILITY.BUYER_COUNTRY];
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
        countries: mapCountries(mockCountriesResponse),
        submittedValues: req.session.submittedData.insuranceEligibility,
      };

      expect(res.render).toHaveBeenCalledWith(TEMPLATE, expectedVariables);
    });

    describe('when a there is no submittedData in req.session', () => {
      it('should add empty submittedData.insuranceEligibility to the session', async () => {
        // @ts-ignore
        req.session = {};

        await get(req, res);

        const expected = {
          ...req.session,
          submittedData: {
            insuranceEligibility: {},
          },
        };

        expect(req.session).toEqual(expected);
      });
    });

    describe('when a there is no insuranceEligibility in req.session.submittedData', () => {
      it('should add empty submittedData.insuranceEligibility to the session and retain existing req.session.submittedData', async () => {
        // @ts-ignore
        req.session.submittedData = {
          quoteEligibility: {},
        };

        await get(req, res);

        const expected = {
          ...req.session.submittedData,
          insuranceEligibility: {},
        };

        expect(req.session.submittedData).toEqual(expected);
      });
    });

    describe('when a country has been submitted', () => {
      it('should render template with countries mapped to submitted country', async () => {
        req.session.submittedData = mockSession.submittedData;

        await get(req, res);

        const expectedCountries = mapCountries(
          mockCountriesResponse,
          req.session.submittedData.insuranceEligibility[FIELD_IDS.ELIGIBILITY.BUYER_COUNTRY].isoCode,
        );

        const expectedVariables = {
          ...singleInputPageVariables(PAGE_VARIABLES),
          BACK_LINK: req.headers.referer,
          userName: getUserNameFromSession(req.session.user),
          countries: expectedCountries,
          submittedValues: req.session.submittedData.insuranceEligibility,
        };

        expect(res.render).toHaveBeenCalledWith(TEMPLATE, expectedVariables);
      });
    });

    describe('when the CIS (country information system) API call fails', () => {
      beforeEach(() => {
        getCisCountriesSpy = jest.fn(() => Promise.reject());
        api.keystone.APIM.getCisCountries = getCisCountriesSpy;
      });

      it(`should redirect to ${PROBLEM_WITH_SERVICE}`, async () => {
        await get(req, res);
        expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
      });
    });

    describe('when the CIS (country information system) API does not return a populated array', () => {
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

      it(`should redirect to ${ROUTES.INSURANCE.ELIGIBILITY.CANNOT_APPLY}`, async () => {
        await post(req, res);

        expect(res.redirect).toHaveBeenCalledWith(ROUTES.INSURANCE.ELIGIBILITY.CANNOT_APPLY);
      });
    });

    describe('when the country can apply for an application online', () => {
      const selectedCountryName = countryApplyOnline.name;

      const validBody = {
        [FIELD_IDS.ELIGIBILITY.BUYER_COUNTRY]: selectedCountryName,
      };

      beforeEach(() => {
        req.body = validBody;

        mockCountriesResponse = [countryApplyOnline];

        getCisCountriesSpy = jest.fn(() => Promise.resolve(mockCountriesResponse));

        api.keystone.APIM.getCisCountries = getCisCountriesSpy;
      });

      it('should update the session with populated with country object', async () => {
        await post(req, res);

        const selectedCountry = getCountryByName(mockCountriesResponse, selectedCountryName) as Country;

        const expectedPopulatedData = mapSubmittedEligibilityCountry(selectedCountry, selectedCountry.canApplyOnline);

        const expected = {
          ...req.session.submittedData,
          insuranceEligibility: updateSubmittedData(expectedPopulatedData, req.session.submittedData.insuranceEligibility),
        };

        expect(req.session.submittedData).toEqual(expected);
      });

      it(`should redirect to ${ROUTES.INSURANCE.ELIGIBILITY.EXPORTER_LOCATION}`, async () => {
        await post(req, res);

        expect(res.redirect).toHaveBeenCalledWith(ROUTES.INSURANCE.ELIGIBILITY.EXPORTER_LOCATION);
      });
    });

    describe('when the submitted country can only apply for an application offline', () => {
      const selectedCountryName = countryApplyOffline.name;

      beforeEach(() => {
        req.body[FIELD_IDS.ELIGIBILITY.BUYER_COUNTRY] = selectedCountryName;

        mockCountriesResponse = [countryApplyOffline];

        getCisCountriesSpy = jest.fn(() => Promise.resolve(mockCountriesResponse));

        api.keystone.APIM.getCisCountries = getCisCountriesSpy;
      });

      it('should update the session with populated country object', async () => {
        await post(req, res);

        const selectedCountry = getCountryByName(mockCountriesResponse, countryApplyOffline.name) as Country;

        const expectedPopulatedData = mapSubmittedEligibilityCountry(selectedCountry, selectedCountry.canApplyOnline);

        const expected = {
          ...req.session.submittedData,
          insuranceEligibility: updateSubmittedData(expectedPopulatedData, req.session.submittedData.insuranceEligibility),
        };

        expect(req.session.submittedData).toEqual(expected);
      });

      it(`should redirect to ${ROUTES.INSURANCE.APPLY_OFFLINE}`, async () => {
        await post(req, res);

        expect(res.redirect).toHaveBeenCalledWith(ROUTES.INSURANCE.APPLY_OFFLINE);
      });
    });

    describe('when the submitted country cannot apply for an application', () => {
      const selectedCountryName = countryCannotApply.name;

      beforeEach(() => {
        req.body[FIELD_IDS.ELIGIBILITY.BUYER_COUNTRY] = selectedCountryName;

        mockCountriesResponse = [countryCannotApply];

        getCisCountriesSpy = jest.fn(() => Promise.resolve(mockCountriesResponse));

        api.keystone.APIM.getCisCountries = getCisCountriesSpy;
      });

      it('should update the session with populated with country object', async () => {
        await post(req, res);

        const selectedCountry = getCountryByName(mockCountriesResponse, selectedCountryName) as Country;

        const expectedPopulatedData = mapSubmittedEligibilityCountry(selectedCountry, countryCannotApply.canApplyOnline);

        const expected = {
          ...req.session.submittedData,
          insuranceEligibility: updateSubmittedData(expectedPopulatedData, req.session.submittedData.insuranceEligibility),
        };

        expect(req.session.submittedData).toEqual(expected);
      });

      it('should add exitReason to req.flash', async () => {
        await post(req, res);

        const { CANNOT_APPLY } = PAGES;
        const { REASON } = CANNOT_APPLY;

        const expectedReason = `${REASON.UNSUPPORTED_BUYER_COUNTRY_1} ${selectedCountryName}, ${REASON.UNSUPPORTED_BUYER_COUNTRY_2}`;

        expect(req.flash).toHaveBeenCalledWith('exitReason', expectedReason);
      });

      it(`should redirect to ${ROUTES.INSURANCE.ELIGIBILITY.CANNOT_APPLY}`, async () => {
        await post(req, res);

        expect(res.redirect).toHaveBeenCalledWith(ROUTES.INSURANCE.ELIGIBILITY.CANNOT_APPLY);
      });
    });

    describe('when the CIS (country information system) API call fails', () => {
      beforeEach(() => {
        getCisCountriesSpy = jest.fn(() => Promise.reject());
        api.keystone.APIM.getCisCountries = getCisCountriesSpy;
      });

      it(`should redirect to ${PROBLEM_WITH_SERVICE}`, async () => {
        await post(req, res);
        expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
      });
    });

    describe('when the CIS (country information system) API does not return a populated array', () => {
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
