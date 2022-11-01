import { PAGE_VARIABLES, get, post } from '.';
import { PAGES } from '../../../../content-strings';
import { FIELD_IDS, ROUTES, TEMPLATES } from '../../../../constants';
import singleInputPageVariables from '../../../../helpers/single-input-page-variables';
import { validation as generateValidationErrors } from '../../../../shared-validation/buyer-country';
import api from '../../../../api';
import { mapCountries } from '../../../../helpers/mappings/map-countries';
import { mockReq, mockRes, mockSession, mockCisCountries } from '../../../../test-mocks';
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
        FIELD_ID: FIELD_IDS.COUNTRY,
        PAGE_CONTENT_STRINGS: PAGES.BUYER_COUNTRY,
      };

      expect(PAGE_VARIABLES).toEqual(expected);
    });
  });

  describe('get', () => {
    let getCountriesSpy = jest.fn(() => Promise.resolve(mockCountriesResponse));

    beforeEach(() => {
      delete req.session.submittedData.quoteEligibility[FIELD_IDS.BUYER_COUNTRY];
      api.getCountries = getCountriesSpy;
    });

    it('should call api.getCountries', async () => {
      await get(req, res);

      expect(getCountriesSpy).toHaveBeenCalledTimes(1);
    });

    it('should render template', async () => {
      await get(req, res);

      const expectedVariables = {
        ...singleInputPageVariables(PAGE_VARIABLES),
        BACK_LINK: req.headers.referer,
        HIDDEN_FIELD_ID: FIELD_IDS.BUYER_COUNTRY,
        countries: mapCountries(mockCountriesResponse),
      };

      expect(res.render).toHaveBeenCalledWith(TEMPLATES.SHARED_PAGES.BUYER_COUNTRY, expectedVariables);
    });

    describe('when a country has been submitted', () => {
      it('should render template with countries mapped to submitted country', async () => {
        req.session.submittedData = mockSession.submittedData;

        await get(req, res);

        const expectedCountries = mapCountries(mockCountriesResponse, req.session.submittedData.quoteEligibility[FIELD_IDS.BUYER_COUNTRY].isoCode);

        const expectedVariables = {
          ...singleInputPageVariables(PAGE_VARIABLES),
          BACK_LINK: req.headers.referer,
          HIDDEN_FIELD_ID: FIELD_IDS.BUYER_COUNTRY,
          countries: expectedCountries,
        };

        expect(res.render).toHaveBeenCalledWith(TEMPLATES.SHARED_PAGES.BUYER_COUNTRY, expectedVariables);
      });
    });

    describe('when the CIS (country information system) API has no data', () => {
      beforeEach(() => {
        // @ts-ignore
        getCountriesSpy = jest.fn(() => Promise.resolve());
        api.getCountries = getCountriesSpy;
      });

      it(`should redirect to ${ROUTES.PROBLEM_WITH_SERVICE}`, async () => {
        await get(req, res);
        expect(res.redirect).toHaveBeenCalledWith(ROUTES.PROBLEM_WITH_SERVICE);
      });
    });

    describe('when the CIS (country information system) API does not return an array', () => {
      beforeEach(() => {
        // @ts-ignore
        getCountriesSpy = jest.fn(() => Promise.resolve({}));
        api.getCountries = getCountriesSpy;
      });

      it(`should redirect to ${ROUTES.PROBLEM_WITH_SERVICE}`, async () => {
        await get(req, res);
        expect(res.redirect).toHaveBeenCalledWith(ROUTES.PROBLEM_WITH_SERVICE);
      });
    });

    describe('when the CIS (country information system) API does not return a populated array', () => {
      beforeEach(() => {
        getCountriesSpy = jest.fn(() => Promise.resolve([]));
        api.getCountries = getCountriesSpy;
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
      api.getCountries = getCountriesSpy;
    });

    describe('when there are validation errors', () => {
      it('should render template with validation errors', async () => {
        await post(req, res);

        expect(res.render).toHaveBeenCalledWith(TEMPLATES.SHARED_PAGES.BUYER_COUNTRY, {
          ...singleInputPageVariables(PAGE_VARIABLES),
          BACK_LINK: req.headers.referer,
          HIDDEN_FIELD_ID: FIELD_IDS.BUYER_COUNTRY,
          countries: mapCountries(mockCountriesResponse),
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

    describe('when the submitted country can apply for an application online', () => {
      beforeEach(() => {
        req.body[FIELD_IDS.BUYER_COUNTRY] = countrySupported.marketName;
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

      it(`should redirect to ${ROUTES.INSURANCE.ELIGIBILITY.APPLY_OFFLINE}`, async () => {
        await post(req, res);
        expect(res.redirect).toHaveBeenCalledWith(ROUTES.INSURANCE.ELIGIBILITY.APPLY_OFFLINE);
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

    describe('when the CIS (country information system) API has no data', () => {
      beforeEach(() => {
        // @ts-ignore
        getCountriesSpy = jest.fn(() => Promise.resolve());
        api.getCountries = getCountriesSpy;
      });

      it(`should redirect to ${ROUTES.PROBLEM_WITH_SERVICE}`, async () => {
        await post(req, res);
        expect(res.redirect).toHaveBeenCalledWith(ROUTES.PROBLEM_WITH_SERVICE);
      });
    });

    describe('when the CIS (country information system) API does not return an array', () => {
      beforeEach(() => {
        // @ts-ignore
        getCountriesSpy = jest.fn(() => Promise.resolve({}));
        api.getCountries = getCountriesSpy;
      });

      it(`should redirect to ${ROUTES.PROBLEM_WITH_SERVICE}`, async () => {
        await post(req, res);
        expect(res.redirect).toHaveBeenCalledWith(ROUTES.PROBLEM_WITH_SERVICE);
      });
    });

    describe('when the CIS (country information system) API does not return a populated array', () => {
      beforeEach(() => {
        getCountriesSpy = jest.fn(() => Promise.resolve([]));
        api.getCountries = getCountriesSpy;
      });

      it(`should redirect to ${ROUTES.PROBLEM_WITH_SERVICE}`, async () => {
        await post(req, res);
        expect(res.redirect).toHaveBeenCalledWith(ROUTES.PROBLEM_WITH_SERVICE);
      });
    });
  });
});
