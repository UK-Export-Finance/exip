import { PAGE_VARIABLES, TEMPLATE, get, post } from '.';
import { PAGES } from '../../../../content-strings';
import { FIELD_IDS, ROUTES, TEMPLATES } from '../../../../constants';
import singleInputPageVariables from '../../../../helpers/page-variables/single-input/insurance';
import getUserNameFromSession from '../../../../helpers/get-user-name-from-session';
import { validation as generateValidationErrors } from '../../../../shared-validation/buyer-country';
import api from '../../../../api';
import { mapCisCountries } from '../../../../helpers/mappings/map-cis-countries';
import getCountryByName from '../../../../helpers/get-country-by-name';
import { updateSubmittedData } from '../../../../helpers/update-submitted-data/insurance';
import { mockReq, mockRes, mockAnswers, mockSession, mockCisCountries } from '../../../../test-mocks';
import { Request, Response } from '../../../../../types';

describe('controllers/insurance/eligibility/buyer-country', () => {
  let req: Request;
  let res: Response;

  const mockCountriesResponse = mockCisCountries;

  const countryUnsupported = mockCountriesResponse[0];
  const countrySupported = mockCountriesResponse[1];
  const countrySupportedViaOfflineOnly = mockCountriesResponse[3];

  const mockFlash = jest.fn();

  beforeEach(() => {
    req = mockReq();
    req.flash = mockFlash;

    res = mockRes();
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  describe('PAGE_VARIABLES', () => {
    it('should have correct properties', () => {
      const expected = {
        FIELD_ID: FIELD_IDS.BUYER_COUNTRY,
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
    let getCountriesSpy = jest.fn(() => Promise.resolve(mockCountriesResponse));

    beforeEach(() => {
      delete req.session.submittedData.quoteEligibility[FIELD_IDS.BUYER_COUNTRY];
      api.external.getCountries = getCountriesSpy;
    });

    it('should call api.external.getCountries', async () => {
      await get(req, res);

      expect(getCountriesSpy).toHaveBeenCalledTimes(1);
    });

    it('should render template', async () => {
      await get(req, res);

      const expectedVariables = {
        ...singleInputPageVariables(PAGE_VARIABLES),
        BACK_LINK: req.headers.referer,
        userName: getUserNameFromSession(req.session.user),
        countries: mapCisCountries(mockCountriesResponse),
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

        const expectedCountries = mapCisCountries(mockCountriesResponse, req.session.submittedData.insuranceEligibility[FIELD_IDS.BUYER_COUNTRY].isoCode);

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
        getCountriesSpy = jest.fn(() => Promise.reject());
        api.external.getCountries = getCountriesSpy;
      });

      it(`should redirect to ${ROUTES.PROBLEM_WITH_SERVICE}`, async () => {
        await get(req, res);
        expect(res.redirect).toHaveBeenCalledWith(ROUTES.PROBLEM_WITH_SERVICE);
      });
    });

    describe('when the CIS (country information system) API does not return a populated array', () => {
      beforeEach(() => {
        getCountriesSpy = jest.fn(() => Promise.resolve([]));
        api.external.getCountries = getCountriesSpy;
      });

      it(`should redirect to ${ROUTES.PROBLEM_WITH_SERVICE}`, async () => {
        await get(req, res);
        expect(res.redirect).toHaveBeenCalledWith(ROUTES.PROBLEM_WITH_SERVICE);
      });
    });
  });

  describe('post', () => {
    let getCountriesSpy = jest.fn(() => Promise.resolve(mockCountriesResponse));

    beforeEach(() => {
      api.external.getCountries = getCountriesSpy;
    });

    describe('when there are validation errors', () => {
      it('should render template with validation errors', async () => {
        await post(req, res);

        expect(res.render).toHaveBeenCalledWith(TEMPLATE, {
          ...singleInputPageVariables(PAGE_VARIABLES),
          userName: getUserNameFromSession(req.session.user),
          BACK_LINK: req.headers.referer,
          countries: mapCisCountries(mockCountriesResponse),
          validationErrors: generateValidationErrors(req.body),
        });
      });
    });

    describe('when the submitted country is not found', () => {
      beforeEach(() => {
        req.body[FIELD_IDS.BUYER_COUNTRY] = 'Country not in the mock response';
      });

      it(`should redirect to ${ROUTES.INSURANCE.ELIGIBILITY.CANNOT_APPLY}`, async () => {
        await post(req, res);

        expect(res.redirect).toHaveBeenCalledWith(ROUTES.INSURANCE.ELIGIBILITY.CANNOT_APPLY);
      });
    });

    describe('when the country can apply for an application online', () => {
      const selectedCountryName = mockAnswers[FIELD_IDS.BUYER_COUNTRY];
      const mappedCountries = mapCisCountries(mockCountriesResponse);
      const selectedCountry = getCountryByName(mappedCountries, selectedCountryName);

      const validBody = {
        [FIELD_IDS.BUYER_COUNTRY]: countrySupported.marketName,
      };

      beforeEach(() => {
        req.body = validBody;
      });

      it('should update the session with submitted data, popluated with country object', async () => {
        await post(req, res);

        const expectedPopulatedData = {
          [FIELD_IDS.BUYER_COUNTRY]: {
            name: selectedCountry?.name,
            isoCode: selectedCountry?.isoCode,
            riskCategory: selectedCountry?.riskCategory,
          },
        };

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
      beforeEach(() => {
        req.body[FIELD_IDS.BUYER_COUNTRY] = countrySupportedViaOfflineOnly.marketName;
      });

      it(`should redirect to ${ROUTES.INSURANCE.APPLY_OFFLINE}`, async () => {
        await post(req, res);
        expect(res.redirect).toHaveBeenCalledWith(ROUTES.INSURANCE.APPLY_OFFLINE);
      });
    });

    describe('when the submitted country cannot apply for an application', () => {
      beforeEach(() => {
        req.body[FIELD_IDS.BUYER_COUNTRY] = countryUnsupported.marketName;
      });

      it('should add exitReason to req.flash', async () => {
        await post(req, res);

        const countryName = countryUnsupported.marketName;

        const { CANNOT_APPLY } = PAGES;
        const { REASON } = CANNOT_APPLY;

        const expectedReason = `${REASON.UNSUPPORTED_BUYER_COUNTRY_1} ${countryName}, ${REASON.UNSUPPORTED_BUYER_COUNTRY_2}`;

        expect(req.flash).toHaveBeenCalledWith('exitReason', expectedReason);
      });

      it(`should redirect to ${ROUTES.INSURANCE.ELIGIBILITY.CANNOT_APPLY}`, async () => {
        await post(req, res);

        expect(res.redirect).toHaveBeenCalledWith(ROUTES.INSURANCE.ELIGIBILITY.CANNOT_APPLY);
      });
    });

    describe('when the CIS (country information system) API call fails', () => {
      beforeEach(() => {
        getCountriesSpy = jest.fn(() => Promise.reject());
        api.external.getCountries = getCountriesSpy;
      });

      it(`should redirect to ${ROUTES.PROBLEM_WITH_SERVICE}`, async () => {
        await post(req, res);
        expect(res.redirect).toHaveBeenCalledWith(ROUTES.PROBLEM_WITH_SERVICE);
      });
    });

    describe('when the CIS (country information system) API does not return a populated array', () => {
      beforeEach(() => {
        getCountriesSpy = jest.fn(() => Promise.resolve([]));
        api.external.getCountries = getCountriesSpy;
      });

      it(`should redirect to ${ROUTES.PROBLEM_WITH_SERVICE}`, async () => {
        await post(req, res);
        expect(res.redirect).toHaveBeenCalledWith(ROUTES.PROBLEM_WITH_SERVICE);
      });
    });
  });
});
