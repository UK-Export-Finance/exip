import { PAGE_VARIABLES, getBackLink, get, post } from '.';
import { LINKS, PAGES } from '../../../content-strings';
import { FIELD_IDS, ROUTES, TEMPLATES } from '../../../constants';
import singleInputPageVariables from '../../../helpers/single-input-page-variables';
import { validation as generateValidationErrors } from '../../../shared-validation/buyer-country';
import isChangeRoute from '../../../helpers/is-change-route';
import getCountryByName from '../../../helpers/get-country-by-name';
import api from '../../../api';
import { mapCountries } from '../../../helpers/mappings/map-countries';
import { updateSubmittedData } from '../../../helpers/update-submitted-data/quote';
import { mockReq, mockRes, mockAnswers, mockSession, mockCisCountries } from '../../../test-mocks';
import { Request, Response } from '../../../../types';

describe('controllers/quote/buyer-country', () => {
  let req: Request;
  let res: Response;

  const mockCountriesResponse = mockCisCountries;

  const countryUnsupported = mockCountriesResponse[0];
  const countrySupportedViaEmailOnly = mockCountriesResponse[2];

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
        ...singleInputPageVariables({ ...PAGE_VARIABLES, BACK_LINK: getBackLink(req.headers.referer) }),
        HIDDEN_FIELD_ID: FIELD_IDS.BUYER_COUNTRY,
        countries: mapCountries(mockCountriesResponse),
        submittedValues: req.session.submittedData.quoteEligibility,
        isChangeRoute: isChangeRoute(req.originalUrl),
      };

      expect(res.render).toHaveBeenCalledWith(TEMPLATES.SHARED_PAGES.BUYER_COUNTRY, expectedVariables);
    });

    describe('when a country has been submitted', () => {
      it('should render template with countries mapped to submitted country', async () => {
        req.session.submittedData = mockSession.submittedData;

        await get(req, res);

        const expectedCountries = mapCountries(mockCountriesResponse, req.session.submittedData.quoteEligibility[FIELD_IDS.BUYER_COUNTRY].isoCode);

        const expectedVariables = {
          ...singleInputPageVariables({ ...PAGE_VARIABLES, BACK_LINK: getBackLink(req.headers.referer) }),
          HIDDEN_FIELD_ID: FIELD_IDS.BUYER_COUNTRY,
          countries: expectedCountries,
          submittedValues: req.session.submittedData.quoteEligibility,
          isChangeRoute: isChangeRoute(req.originalUrl),
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
          ...singleInputPageVariables({ ...PAGE_VARIABLES, BACK_LINK: getBackLink(req.headers.referer) }),
          HIDDEN_FIELD_ID: FIELD_IDS.BUYER_COUNTRY,
          countries: mapCountries(mockCountriesResponse),
          validationErrors: generateValidationErrors(req.body),
          isChangeRoute: isChangeRoute(req.originalUrl),
        });
      });
    });

    describe('when the submitted country can only get a quote via email', () => {
      beforeEach(() => {
        req.body[FIELD_IDS.BUYER_COUNTRY] = countrySupportedViaEmailOnly.marketName;
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
        req.body[FIELD_IDS.BUYER_COUNTRY] = 'Country not in the mock response';
      });

      it(`should redirect to ${ROUTES.QUOTE.CANNOT_APPLY}`, async () => {
        await post(req, res);

        expect(res.redirect).toHaveBeenCalledWith(ROUTES.QUOTE.CANNOT_APPLY);
      });
    });

    describe('when the submitted country is not supported', () => {
      beforeEach(() => {
        req.body[FIELD_IDS.BUYER_COUNTRY] = countryUnsupported.marketName;
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
      const selectedCountryName = mockAnswers[FIELD_IDS.BUYER_COUNTRY];
      const mappedCountries = mapCountries(mockCountriesResponse);

      const selectedCountry = getCountryByName(mappedCountries, selectedCountryName);

      const validBody = {
        [FIELD_IDS.BUYER_COUNTRY]: selectedCountryName,
      };

      beforeEach(() => {
        req.body = validBody;
      });

      it('should update the session with submitted data, popluated with country object', async () => {
        await post(req, res);

        const expectedPopulatedData = {
          ...validBody,
          [FIELD_IDS.BUYER_COUNTRY]: {
            name: selectedCountry?.name,
            isoCode: selectedCountry?.isoCode,
            riskCategory: selectedCountry?.riskCategory,
          },
        };

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

    describe(`when the country is supported for an online quote, submitted with ${FIELD_IDS.COUNTRY} (no JS) and there are no validation errors`, () => {
      const selectedCountryName = mockAnswers[FIELD_IDS.BUYER_COUNTRY];
      const mappedCountries = mapCountries(mockCountriesResponse);

      const selectedCountry = getCountryByName(mappedCountries, selectedCountryName);

      const validBody = {
        [FIELD_IDS.BUYER_COUNTRY]: '',
        [FIELD_IDS.COUNTRY]: selectedCountryName,
      };

      beforeEach(() => {
        req.body = validBody;
      });

      it('should update the session with submitted data, popluated with country object', async () => {
        await post(req, res);

        const expectedPopulatedData = {
          ...validBody,
          [FIELD_IDS.BUYER_COUNTRY]: {
            name: selectedCountry?.name,
            isoCode: selectedCountry?.isoCode,
            riskCategory: selectedCountry?.riskCategory,
          },
        };

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
