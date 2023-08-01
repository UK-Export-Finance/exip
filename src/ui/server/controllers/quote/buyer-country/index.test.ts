import { FIELD_ID, PAGE_VARIABLES, TEMPLATE, getBackLink, get, post } from '.';
import { LINKS, PAGES } from '../../../content-strings';
import { FIELD_IDS, ROUTES, TEMPLATES } from '../../../constants';
import singleInputPageVariables from '../../../helpers/page-variables/single-input/quote';
import getUserNameFromSession from '../../../helpers/get-user-name-from-session';
import constructPayload from '../../../helpers/construct-payload';
import { validation as generateValidationErrors } from '../../../shared-validation/buyer-country';
import isChangeRoute from '../../../helpers/is-change-route';
import getCountryByName from '../../../helpers/get-country-by-name';
import mapSubmittedEligibilityCountry from '../../../helpers/mappings/map-submitted-eligibility-country';
import api from '../../../api';
import { mapCisCountries } from '../../../helpers/mappings/map-cis-countries';
import { updateSubmittedData } from '../../../helpers/update-submitted-data/quote';
import { mockReq, mockRes, mockAnswers, mockSession, mockCisCountries } from '../../../test-mocks';
import { Country, Request, Response } from '../../../../types';

describe('controllers/quote/buyer-country', () => {
  let req: Request;
  let res: Response;

  const mockCountriesResponse = mockCisCountries;

  const { 0: countryUnsupported, 2: countrySupportedViaEmailOnly } = mockCountriesResponse;

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
      const expected = FIELD_IDS.ELIGIBILITY.BUYER_COUNTRY;

      expect(FIELD_ID).toEqual(expected);
    });
  });

  describe('PAGE_VARIABLES', () => {
    it('should have correct properties', () => {
      const expected = {
        FIELD_ID,
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

  describe('getBackLink', () => {
    describe('when there is no referer', () => {
      it(`should return ${LINKS.EXTERNAL.BEFORE_YOU_START}`, () => {
        const result = getBackLink();

        const expected = LINKS.EXTERNAL.BEFORE_YOU_START;
        expect(result).toEqual(expected);
      });
    });

    describe('when the referer is Check your answers', () => {
      it('should return the referer', () => {
        const result = getBackLink(ROUTES.QUOTE.CHECK_YOUR_ANSWERS);

        const expected = ROUTES.QUOTE.CHECK_YOUR_ANSWERS;
        expect(result).toEqual(expected);
      });
    });

    describe('when the referer is Your quote', () => {
      it('should return the referer', () => {
        const result = getBackLink(ROUTES.QUOTE.YOUR_QUOTE);

        const expected = ROUTES.QUOTE.YOUR_QUOTE;
        expect(result).toEqual(expected);
      });
    });

    describe('when the referer is buyer country without change route', () => {
      it('should return the referer', () => {
        const result = getBackLink(ROUTES.QUOTE.BUYER_COUNTRY);

        const expected = ROUTES.QUOTE.BUYER_COUNTRY;
        expect(result).toEqual(expected);
      });
    });

    it(`should return ${LINKS.EXTERNAL.BEFORE_YOU_START}`, () => {
      const result = getBackLink(LINKS.EXTERNAL.BEFORE_YOU_START);

      const expected = LINKS.EXTERNAL.BEFORE_YOU_START;
      expect(result).toEqual(expected);
    });
  });

  describe('get', () => {
    let getCountriesSpy = jest.fn(() => Promise.resolve(mockCountriesResponse));

    beforeEach(() => {
      delete req.session.submittedData.quoteEligibility[FIELD_ID];
      api.external.getCountries = getCountriesSpy;
    });

    it('should call api.external.getCountries', async () => {
      await get(req, res);

      expect(getCountriesSpy).toHaveBeenCalledTimes(1);
    });

    it('should render template', async () => {
      await get(req, res);

      const expectedVariables = {
        ...singleInputPageVariables({ ...PAGE_VARIABLES, BACK_LINK: getBackLink(req.headers.referer), ORIGINAL_URL: req.originalUrl }),
        userName: getUserNameFromSession(req.session.user),
        countries: mapCisCountries(mockCountriesResponse),
        submittedValues: req.session.submittedData.quoteEligibility,
        isChangeRoute: isChangeRoute(req.originalUrl),
      };

      expect(res.render).toHaveBeenCalledWith(TEMPLATES.SHARED_PAGES.BUYER_COUNTRY, expectedVariables);
    });

    describe('when a there is no submittedData in req.session', () => {
      it('should add empty submittedData.quoteEligibility to the session', async () => {
        // @ts-ignore
        req.session = {};

        await get(req, res);

        const expected = {
          ...req.session,
          submittedData: {
            quoteEligibility: {},
          },
        };

        expect(req.session).toEqual(expected);
      });
    });

    describe('when a there is no quoteEligibility in req.session.submittedData', () => {
      it('should add empty submittedData.quoteEligibility to the session and retain existing req.session.submittedData', async () => {
        // @ts-ignore
        req.session.submittedData = {
          insuranceEligibility: {},
        };

        await get(req, res);

        const expected = {
          ...req.session.submittedData,
          quoteEligibility: {},
        };

        expect(req.session.submittedData).toEqual(expected);
      });
    });

    describe('when a country has been submitted', () => {
      it('should render template with countries mapped to submitted country', async () => {
        req.session.submittedData = mockSession.submittedData;

        await get(req, res);

        const expectedCountries = mapCisCountries(mockCountriesResponse, req.session.submittedData.quoteEligibility[FIELD_ID].isoCode);

        const expectedVariables = {
          ...singleInputPageVariables({ ...PAGE_VARIABLES, BACK_LINK: getBackLink(req.headers.referer), ORIGINAL_URL: req.originalUrl }),
          userName: getUserNameFromSession(req.session.user),
          countries: expectedCountries,
          submittedValues: req.session.submittedData.quoteEligibility,
          isChangeRoute: isChangeRoute(req.originalUrl),
        };

        expect(res.render).toHaveBeenCalledWith(TEMPLATES.SHARED_PAGES.BUYER_COUNTRY, expectedVariables);
      });
    });

    describe('api error handling', () => {
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
  });

  describe('post', () => {
    let getCountriesSpy = jest.fn(() => Promise.resolve(mockCountriesResponse));
    const mappedCountries = mapCisCountries(mockCountriesResponse);

    beforeEach(() => {
      api.external.getCountries = getCountriesSpy;
    });

    describe('when there are validation errors', () => {
      it('should render template with validation errors from constructPayload function', async () => {
        await post(req, res);

        const payload = constructPayload(req.body, [FIELD_ID]);

        expect(res.render).toHaveBeenCalledWith(TEMPLATES.SHARED_PAGES.BUYER_COUNTRY, {
          ...singleInputPageVariables({ ...PAGE_VARIABLES, BACK_LINK: getBackLink(req.headers.referer), ORIGINAL_URL: req.originalUrl }),
          userName: getUserNameFromSession(req.session.user),
          countries: mapCisCountries(mockCountriesResponse),
          validationErrors: generateValidationErrors(payload),
          isChangeRoute: isChangeRoute(req.originalUrl),
        });
      });
    });

    describe('when the submitted country can only get a quote via email', () => {
      beforeEach(() => {
        req.body[FIELD_ID] = countrySupportedViaEmailOnly.marketName;
      });

      it('should update the session with submitted data, popluated with country object', async () => {
        await post(req, res);

        const selectedCountry = getCountryByName(mappedCountries, countrySupportedViaEmailOnly.marketName) as Country;

        const expectedPopulatedData = mapSubmittedEligibilityCountry(selectedCountry, false);

        const expected = updateSubmittedData(expectedPopulatedData, req.session.submittedData.quoteEligibility);

        expect(req.session.submittedData.quoteEligibility).toEqual(expected);
      });

      it('should add previousRoute, exitReason and exitDescription to req.flash', async () => {
        await post(req, res);

        expect(mockFlash).toHaveBeenCalledTimes(3);

        expect(mockFlash.mock.calls[0]).toEqual(['previousRoute', ROUTES.QUOTE.BUYER_COUNTRY]);

        const { GET_A_QUOTE_BY_EMAIL } = PAGES.QUOTE;
        const { REASON } = GET_A_QUOTE_BY_EMAIL;

        expect(mockFlash.mock.calls[1]).toEqual(['exitReason', REASON.BUYER_COUNTRY]);
        expect(mockFlash.mock.calls[2]).toEqual(['exitDescription', REASON.BUYER_COUNTRY_DESCRIPTION]);
      });

      it(`should redirect to ${ROUTES.QUOTE.GET_A_QUOTE_BY_EMAIL}`, async () => {
        await post(req, res);

        expect(res.redirect).toHaveBeenCalledWith(ROUTES.QUOTE.GET_A_QUOTE_BY_EMAIL);
      });
    });

    describe('when the submitted country is not found', () => {
      beforeEach(() => {
        req.body[FIELD_ID] = 'Country not in the mock response';
      });

      it(`should redirect to ${ROUTES.QUOTE.CANNOT_APPLY}`, async () => {
        await post(req, res);

        expect(res.redirect).toHaveBeenCalledWith(ROUTES.QUOTE.CANNOT_APPLY);
      });
    });

    describe('when the submitted country is not supported', () => {
      beforeEach(() => {
        req.body[FIELD_ID] = countryUnsupported.marketName;
      });

      it('should update the session with submitted data, popluated with country object', async () => {
        await post(req, res);

        const selectedCountry = getCountryByName(mappedCountries, countryUnsupported.marketName) as Country;

        const expectedPopulatedData = mapSubmittedEligibilityCountry(selectedCountry, false);

        const expected = updateSubmittedData(expectedPopulatedData, req.session.submittedData.quoteEligibility);

        expect(req.session.submittedData.quoteEligibility).toEqual(expected);
      });

      it('should add previousRoute and exitReason to req.flash', async () => {
        await post(req, res);

        expect(req.flash).toHaveBeenCalledWith('previousRoute', ROUTES.QUOTE.BUYER_COUNTRY);

        const countryName = countryUnsupported.marketName;

        const { CANNOT_APPLY } = PAGES;
        const { REASON } = CANNOT_APPLY;

        const expectedReason = `${REASON.UNSUPPORTED_BUYER_COUNTRY_1} ${countryName}, ${REASON.UNSUPPORTED_BUYER_COUNTRY_2}`;

        expect(req.flash).toHaveBeenCalledWith('exitReason', expectedReason);
      });

      it(`should redirect to ${ROUTES.QUOTE.CANNOT_APPLY}`, async () => {
        await post(req, res);

        expect(res.redirect).toHaveBeenCalledWith(ROUTES.QUOTE.CANNOT_APPLY);
      });
    });

    describe('when the country is supported for an online quote and there are no validation errors', () => {
      const selectedCountryName = mockAnswers[FIELD_ID];

      const selectedCountry = getCountryByName(mappedCountries, selectedCountryName) as Country;

      const validBody = {
        [FIELD_ID]: selectedCountryName,
      };

      beforeEach(() => {
        req.body = validBody;
      });

      it('should update the session with submitted data, popluated with country object', async () => {
        await post(req, res);

        const expectedPopulatedData = mapSubmittedEligibilityCountry(selectedCountry, true);

        const expected = updateSubmittedData(expectedPopulatedData, req.session.submittedData.quoteEligibility);

        expect(req.session.submittedData.quoteEligibility).toEqual(expected);
      });

      it(`should redirect to ${ROUTES.QUOTE.BUYER_BODY}`, async () => {
        await post(req, res);

        expect(res.redirect).toHaveBeenCalledWith(ROUTES.QUOTE.BUYER_BODY);
      });

      describe("when the url's last substring is `change`", () => {
        it(`should redirect to ${ROUTES.QUOTE.CHECK_YOUR_ANSWERS}`, async () => {
          req.originalUrl = 'mock/change';

          await post(req, res);

          expect(res.redirect).toHaveBeenCalledWith(ROUTES.QUOTE.CHECK_YOUR_ANSWERS);
        });
      });
    });

    describe('api error handling', () => {
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
});
