import { post } from '.';
import { PAGES } from '../../../../content-strings';
import { FIELD_IDS } from '../../../../constants';
import { INSURANCE_ROUTES } from '../../../../constants/routes/insurance';
import api from '../../../../api';
import getCountryByIsoCode from '../../../../helpers/get-country-by-iso-code';
import mapSubmittedEligibilityCountry from '../../../../helpers/mappings/map-submitted-eligibility-country';
import { updateSubmittedData } from '../../../../helpers/update-submitted-data/insurance';
import { Country, Request, Response } from '../../../../../types';
import { mockReq, mockRes, mockCountries } from '../../../../test-mocks';

const {
  ELIGIBILITY: { CANNOT_APPLY: CANNOT_APPLY_ROUTE, TOTAL_VALUE_INSURED, BUYER_COUNTRY_CHANGE, CHECK_YOUR_ANSWERS, CONTRACT_TOO_SHORT },
} = INSURANCE_ROUTES;

describe('controllers/insurance/eligibility/buyer-country - redirects', () => {
  let req: Request;
  let res: Response;

  let mockCountriesResponse = mockCountries;

  const { 1: countryApplyOnline, 4: countryCannotApply, 5: countryNoShortTermCover } = mockCountriesResponse;
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
        req.body[FIELD_IDS.ELIGIBILITY.BUYER_COUNTRY] = 'Country not in the mock response';
      });

      it(`should redirect to ${CANNOT_APPLY_ROUTE}`, async () => {
        await post(req, res);

        expect(res.redirect).toHaveBeenCalledWith(CANNOT_APPLY_ROUTE);
      });
    });

    describe('when the country can apply for an application online', () => {
      const selectedCountryIsoCode = countryApplyOnline.isoCode;

      const validBody = {
        [FIELD_IDS.ELIGIBILITY.BUYER_COUNTRY]: selectedCountryIsoCode,
      };

      beforeEach(() => {
        req.body = validBody;

        mockCountriesResponse = [countryApplyOnline];

        getCisCountriesSpy = jest.fn(() => Promise.resolve(mockCountriesResponse));

        api.keystone.APIM.getCisCountries = getCisCountriesSpy;
      });

      it('should update the session with populated with country object', async () => {
        await post(req, res);

        const selectedCountry = getCountryByIsoCode(mockCountriesResponse, selectedCountryIsoCode);

        const expectedPopulatedData = mapSubmittedEligibilityCountry(selectedCountry);

        const expected = {
          ...req.session.submittedData,
          insuranceEligibility: updateSubmittedData(expectedPopulatedData, req.session.submittedData.insuranceEligibility),
        };

        expect(req.session.submittedData).toEqual(expected);
      });

      it(`should redirect to ${TOTAL_VALUE_INSURED}`, async () => {
        await post(req, res);

        expect(res.redirect).toHaveBeenCalledWith(TOTAL_VALUE_INSURED);
      });

      describe("when the url's last substring is `change`", () => {
        it(`should redirect to ${CHECK_YOUR_ANSWERS}`, async () => {
          req.originalUrl = BUYER_COUNTRY_CHANGE;

          await post(req, res);

          const expected = CHECK_YOUR_ANSWERS;
          expect(res.redirect).toHaveBeenCalledWith(expected);
        });
      });
    });

    describe('when the submitted country does not have short term cover', () => {
      const selectedCountryName = countryNoShortTermCover.isoCode;

      beforeEach(() => {
        req.body[FIELD_IDS.ELIGIBILITY.BUYER_COUNTRY] = selectedCountryName;

        mockCountriesResponse = [countryNoShortTermCover];

        getCisCountriesSpy = jest.fn(() => Promise.resolve(mockCountriesResponse));

        api.keystone.APIM.getCisCountries = getCisCountriesSpy;
      });

      it('should update the session with populated country object', async () => {
        await post(req, res);

        const selectedCountry = getCountryByIsoCode(mockCountriesResponse, countryNoShortTermCover.isoCode) as Country;

        const expectedPopulatedData = mapSubmittedEligibilityCountry(selectedCountry);

        const expected = {
          ...req.session.submittedData,
          insuranceEligibility: updateSubmittedData(expectedPopulatedData, req.session.submittedData.insuranceEligibility),
        };

        expect(req.session.submittedData).toEqual(expected);
      });

      it(`should redirect to ${CONTRACT_TOO_SHORT}`, async () => {
        await post(req, res);

        expect(res.redirect).toHaveBeenCalledWith(CONTRACT_TOO_SHORT);
      });
    });

    describe('when the submitted country cannot apply for an application', () => {
      const selectedCountryName = countryCannotApply.name;
      const selectedCountryIsoCode = countryCannotApply.isoCode;

      beforeEach(() => {
        req.body[FIELD_IDS.ELIGIBILITY.BUYER_COUNTRY] = selectedCountryIsoCode;

        mockCountriesResponse = [countryCannotApply];

        getCisCountriesSpy = jest.fn(() => Promise.resolve(mockCountriesResponse));

        api.keystone.APIM.getCisCountries = getCisCountriesSpy;
      });

      it('should update the session with populated with country object', async () => {
        await post(req, res);

        const selectedCountry = getCountryByIsoCode(mockCountriesResponse, selectedCountryIsoCode);

        const expectedPopulatedData = mapSubmittedEligibilityCountry(selectedCountry);

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

      it(`should redirect to ${CANNOT_APPLY_ROUTE}`, async () => {
        await post(req, res);

        expect(res.redirect).toHaveBeenCalledWith(CANNOT_APPLY_ROUTE);
      });
    });
  });
});
