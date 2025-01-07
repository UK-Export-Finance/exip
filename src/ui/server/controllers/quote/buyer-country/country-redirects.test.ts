import { FIELD_ID, post } from '.';
import { PAGES } from '../../../content-strings';
import { ROUTES } from '../../../constants';
import getCountryByIsoCode from '../../../helpers/get-country-by-iso-code';
import mapSubmittedEligibilityCountry from '../../../helpers/mappings/map-submitted-eligibility-country';
import api from '../../../api';
import { updateSubmittedData } from '../../../helpers/update-submitted-data/quote';
import {
  mockReq,
  mockRes,
  mockCountries,
  mockCountryCannotGetAQuote,
  mockCountryCanGetAQuoteOnline,
  mockCountryCanGetAQuoteByEmail,
} from '../../../test-mocks';
import { Request, Response } from '../../../../types';

let mockCountriesResponse = mockCountries;

describe('controllers/quote/buyer-country - redirects', () => {
  let req: Request;
  let res: Response;

  const mockFlash = jest.fn();

  beforeEach(() => {
    req = mockReq();
    req.flash = mockFlash;

    res = mockRes();
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  describe('post', () => {
    let getCisCountriesSpy = jest.fn(() => Promise.resolve(mockCountriesResponse));

    beforeEach(() => {
      api.keystone.APIM.getCisCountries = getCisCountriesSpy;
    });

    describe('when the submitted country is not found', () => {
      beforeEach(() => {
        req.body[FIELD_ID] = 'Country not in the mock response';
      });

      it(`should redirect to ${ROUTES.QUOTE.CANNOT_APPLY_EXIT}`, async () => {
        await post(req, res);

        expect(res.redirect).toHaveBeenCalledWith(ROUTES.QUOTE.CANNOT_APPLY_EXIT);
      });
    });

    describe('when the API returns a canGetAQuoteOnline flag for the submitted country', () => {
      const selectedCountryIsoCode = mockCountryCanGetAQuoteOnline.isoCode;

      beforeEach(() => {
        jest.resetAllMocks();

        mockCountriesResponse = [mockCountryCanGetAQuoteOnline];

        getCisCountriesSpy = jest.fn(() => Promise.resolve(mockCountriesResponse));

        api.keystone.APIM.getCisCountries = getCisCountriesSpy;

        req.body[FIELD_ID] = selectedCountryIsoCode;
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

    describe('when the API returns a noOnlineSupport flag for the submitted country', () => {
      const selectedCountryIsoCode = mockCountryCanGetAQuoteByEmail.isoCode;

      beforeEach(() => {
        jest.resetAllMocks();

        mockCountriesResponse = [mockCountryCanGetAQuoteByEmail];

        getCisCountriesSpy = jest.fn(() => Promise.resolve(mockCountriesResponse));

        api.keystone.APIM.getCisCountries = getCisCountriesSpy;

        req.body[FIELD_ID] = mockCountryCanGetAQuoteByEmail.isoCode;
      });

      it('should update the session with submitted data, populated with country object', async () => {
        await post(req, res);

        const selectedCountry = getCountryByIsoCode(mockCountriesResponse, selectedCountryIsoCode);

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

    describe('when the API returns a cannotGetAQuote flag for the submitted country', () => {
      const selectedCountryName = mockCountryCannotGetAQuote.name;
      const selectedCountryIsoCode = mockCountryCannotGetAQuote.isoCode;

      beforeEach(() => {
        jest.resetAllMocks();

        mockCountriesResponse = [mockCountryCannotGetAQuote];

        getCisCountriesSpy = jest.fn(() => Promise.resolve(mockCountriesResponse));

        api.keystone.APIM.getCisCountries = getCisCountriesSpy;

        req.body[FIELD_ID] = selectedCountryIsoCode;
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

        const { CANNOT_APPLY_EXIT } = PAGES;
        const { REASON } = CANNOT_APPLY_EXIT;

        const expectedReason = `${REASON.UNSUPPORTED_BUYER_COUNTRY_1} ${countryName}, ${REASON.UNSUPPORTED_BUYER_COUNTRY_2}`;

        expect(req.flash).toHaveBeenCalledWith('exitReason', expectedReason);
      });

      it(`should redirect to ${ROUTES.QUOTE.CANNOT_APPLY_EXIT}`, async () => {
        await post(req, res);

        expect(res.redirect).toHaveBeenCalledWith(ROUTES.QUOTE.CANNOT_APPLY_EXIT);
      });
    });
  });
});
