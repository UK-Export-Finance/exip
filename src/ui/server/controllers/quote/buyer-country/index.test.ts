import { FIELD_ID, PAGE_VARIABLES, TEMPLATE, getBackLink, get, post } from '.';
import { LINKS, PAGES } from '../../../content-strings';
import { FIELD_IDS, ROUTES, TEMPLATES } from '../../../constants';
import singleInputPageVariables from '../../../helpers/page-variables/single-input/quote';
import getUserNameFromSession from '../../../helpers/get-user-name-from-session';
import constructPayload from '../../../helpers/construct-payload';
import { validation as generateValidationErrors } from '../../../shared-validation/buyer-country';
import isChangeRoute from '../../../helpers/is-change-route';
import getCountryByIsoCode from '../../../helpers/get-country-by-iso-code';
import mapSubmittedEligibilityCountry from '../../../helpers/mappings/map-submitted-eligibility-country';
import api from '../../../api';
import mapCountries from '../../../helpers/mappings/map-countries';
import { updateSubmittedData } from '../../../helpers/update-submitted-data/quote';
import { mockReq, mockRes, mockCountries } from '../../../test-mocks';
import { Request, Response } from '../../../../types';

describe('controllers/quote/buyer-country', () => {
  let req: Request;
  let res: Response;

  let mockCountriesResponse = mockCountries;

  const { 0: countryUnsupported, 1: countryQuoteOnline, 2: countryQuoteByEmail } = mockCountriesResponse;

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
        ...singleInputPageVariables({ ...PAGE_VARIABLES, BACK_LINK: getBackLink(req.headers.referer), ORIGINAL_URL: req.originalUrl }),
        userName: getUserNameFromSession(req.session.user),
        countries: mapCountries(mockCountriesResponse, req.session.submittedData.quoteEligibility[FIELD_ID]?.isoCode),
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

    describe('api error handling', () => {
      describe('when the get CIS countries API call fails', () => {
        beforeEach(() => {
          getCisCountriesSpy = jest.fn(() => Promise.reject(new Error('mock')));
          api.keystone.APIM.getCisCountries = getCisCountriesSpy;
        });

        it(`should redirect to ${ROUTES.PROBLEM_WITH_SERVICE}`, async () => {
          await get(req, res);

          expect(res.redirect).toHaveBeenCalledWith(ROUTES.PROBLEM_WITH_SERVICE);
        });
      });

      describe('when the get CIS countries API call does not return a populated array', () => {
        beforeEach(() => {
          getCisCountriesSpy = jest.fn(() => Promise.resolve([]));
          api.keystone.APIM.getCisCountries = getCisCountriesSpy;
        });

        it(`should redirect to ${ROUTES.PROBLEM_WITH_SERVICE}`, async () => {
          await get(req, res);
          expect(res.redirect).toHaveBeenCalledWith(ROUTES.PROBLEM_WITH_SERVICE);
        });
      });
    });
  });

  describe('post', () => {
    let getCisCountriesSpy = jest.fn(() => Promise.resolve(mockCountriesResponse));

    beforeEach(() => {
      api.keystone.APIM.getCisCountries = getCisCountriesSpy;
    });

    describe('when there are validation errors', () => {
      it('should render template with validation errors from constructPayload function', async () => {
        await post(req, res);

        const payload = constructPayload(req.body, [FIELD_ID]);

        expect(res.render).toHaveBeenCalledWith(TEMPLATES.SHARED_PAGES.BUYER_COUNTRY, {
          ...singleInputPageVariables({ ...PAGE_VARIABLES, BACK_LINK: getBackLink(req.headers.referer), ORIGINAL_URL: req.originalUrl }),
          userName: getUserNameFromSession(req.session.user),
          countries: mapCountries(mockCountriesResponse),
          validationErrors: generateValidationErrors(payload),
          isChangeRoute: isChangeRoute(req.originalUrl),
        });
      });
    });

    describe('when the submitted country can only get a quote via email', () => {
      const selectedCountryisoCode = countryQuoteByEmail.isoCode;

      mockCountriesResponse = [countryQuoteByEmail];

      getCisCountriesSpy = jest.fn(() => Promise.resolve(mockCountriesResponse));

      beforeEach(() => {
        req.body[FIELD_ID] = countryQuoteByEmail.isoCode;
      });

      it('should update the session with submitted data, populated with country object', async () => {
        await post(req, res);

        const selectedCountry = getCountryByIsoCode(mockCountriesResponse, selectedCountryisoCode);

        const expectedPopulatedData = mapSubmittedEligibilityCountry(selectedCountry);

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
      const selectedCountryName = countryUnsupported.name;
      const selectedCountryIsoCode = countryUnsupported.isoCode;

      beforeEach(() => {
        req.body[FIELD_ID] = selectedCountryIsoCode;

        mockCountriesResponse = [countryUnsupported];

        getCisCountriesSpy = jest.fn(() => Promise.resolve(mockCountriesResponse));

        api.keystone.APIM.getCisCountries = getCisCountriesSpy;
      });

      it('should update the session with submitted data, populated with country object', async () => {
        await post(req, res);

        const selectedCountry = getCountryByIsoCode(mockCountriesResponse, selectedCountryIsoCode);

        const expectedPopulatedData = mapSubmittedEligibilityCountry(selectedCountry);

        const expected = updateSubmittedData(expectedPopulatedData, req.session.submittedData.quoteEligibility);

        expect(req.session.submittedData.quoteEligibility).toEqual(expected);
      });

      it('should add previousRoute and exitReason to req.flash', async () => {
        await post(req, res);

        expect(req.flash).toHaveBeenCalledWith('previousRoute', ROUTES.QUOTE.BUYER_COUNTRY);

        const countryName = selectedCountryName;

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
      const selectedCountryIsoCode = countryQuoteOnline.isoCode;

      const validBody = {
        [FIELD_ID]: selectedCountryIsoCode,
      };

      beforeEach(() => {
        req.body = validBody;

        mockCountriesResponse = [countryQuoteOnline];

        getCisCountriesSpy = jest.fn(() => Promise.resolve(mockCountriesResponse));

        api.keystone.APIM.getCisCountries = getCisCountriesSpy;
      });

      it('should update the session with submitted data, populated with country object', async () => {
        await post(req, res);

        const selectedCountry = getCountryByIsoCode(mockCountriesResponse, selectedCountryIsoCode);

        const expectedPopulatedData = mapSubmittedEligibilityCountry(selectedCountry);

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
      describe('when the get CIS countries API call fails', () => {
        beforeEach(() => {
          getCisCountriesSpy = jest.fn(() => Promise.reject(new Error('mock')));
          api.keystone.APIM.getCisCountries = getCisCountriesSpy;
        });

        it(`should redirect to ${ROUTES.PROBLEM_WITH_SERVICE}`, async () => {
          await post(req, res);

          expect(res.redirect).toHaveBeenCalledWith(ROUTES.PROBLEM_WITH_SERVICE);
        });
      });

      describe('when the get CIS countries API call does not return a populated array', () => {
        beforeEach(() => {
          getCisCountriesSpy = jest.fn(() => Promise.resolve([]));
          api.keystone.APIM.getCisCountries = getCisCountriesSpy;
        });

        it(`should redirect to ${ROUTES.PROBLEM_WITH_SERVICE}`, async () => {
          await post(req, res);
          expect(res.redirect).toHaveBeenCalledWith(ROUTES.PROBLEM_WITH_SERVICE);
        });
      });
    });
  });
});
