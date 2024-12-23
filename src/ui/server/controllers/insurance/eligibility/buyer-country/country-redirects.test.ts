import { post } from '.';
import { PAGES } from '../../../../content-strings';
import { FIELD_IDS } from '../../../../constants';
import { INSURANCE_ROUTES } from '../../../../constants/routes/insurance';
import api from '../../../../api';
import getCountryByIsoCode from '../../../../helpers/get-country-by-iso-code';
import mapSubmittedEligibilityCountry from '../../../../helpers/mappings/map-submitted-eligibility-country';
import { updateSubmittedData } from '../../../../helpers/update-submitted-data/insurance';
import { Request, Response } from '../../../../../types';
import {
  mockReq,
  mockRes,
  mockCountries,
  mockCountryCanApplyForInsuranceOnline,
  mockCountryNoInsuranceSupport,
  mockCountryNoOnlineSupport,
} from '../../../../test-mocks';

const {
  ELIGIBILITY: { CANNOT_APPLY_EXIT: CANNOT_APPLY_ROUTE, TOTAL_VALUE_INSURED, BUYER_COUNTRY_CHANGE, CHECK_YOUR_ANSWERS, TALK_TO_AN_EXPORT_FINANCE_MANAGER_EXIT },
} = INSURANCE_ROUTES;

let mockCountriesResponse = mockCountries;

describe('controllers/insurance/eligibility/buyer-country - redirects', () => {
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

    describe('when the country is not found', () => {
      beforeEach(() => {
        req.body[FIELD_IDS.ELIGIBILITY.BUYER_COUNTRY] = 'Country not in the mock response';
      });

      it(`should redirect to ${CANNOT_APPLY_ROUTE}`, async () => {
        await post(req, res);

        expect(res.redirect).toHaveBeenCalledWith(CANNOT_APPLY_ROUTE);
      });
    });

    describe('when the API returns a noOnlineSupport flag for the submitted country', () => {
      const selectedCountryName = mockCountryNoOnlineSupport.isoCode;

      beforeEach(() => {
        mockCountriesResponse = [mockCountryNoOnlineSupport];

        getCisCountriesSpy = jest.fn(() => Promise.resolve(mockCountriesResponse));

        api.keystone.APIM.getCisCountries = getCisCountriesSpy;

        req.body[FIELD_IDS.ELIGIBILITY.BUYER_COUNTRY] = selectedCountryName;
      });

      it('should update the session with populated country object', async () => {
        await post(req, res);

        const selectedCountry = getCountryByIsoCode(mockCountriesResponse, mockCountryNoOnlineSupport.isoCode);

        const expectedPopulatedData = mapSubmittedEligibilityCountry(selectedCountry);

        const expected = {
          ...req.session.submittedData,
          insuranceEligibility: updateSubmittedData(expectedPopulatedData, req.session.submittedData.insuranceEligibility),
        };

        expect(req.session.submittedData).toEqual(expected);
      });

      it(`should redirect to ${TALK_TO_AN_EXPORT_FINANCE_MANAGER_EXIT}`, async () => {
        await post(req, res);

        expect(res.redirect).toHaveBeenCalledWith(TALK_TO_AN_EXPORT_FINANCE_MANAGER_EXIT);
      });
    });

    describe('when the API returns a canApplyForInsuranceOnline flag for the submitted country', () => {
      const selectedCountryIsoCode = mockCountryCanApplyForInsuranceOnline.isoCode;

      const validBody = {
        [FIELD_IDS.ELIGIBILITY.BUYER_COUNTRY]: selectedCountryIsoCode,
      };

      beforeEach(() => {
        mockCountriesResponse = [mockCountryCanApplyForInsuranceOnline];

        getCisCountriesSpy = jest.fn(() => Promise.resolve(mockCountriesResponse));

        api.keystone.APIM.getCisCountries = getCisCountriesSpy;

        req.body = validBody;
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

    describe('when the API returns a noInsuranceSupport flag for the submitted country', () => {
      const selectedCountryName = mockCountryNoInsuranceSupport.name;
      const selectedCountryIsoCode = mockCountryNoInsuranceSupport.isoCode;

      beforeEach(() => {
        mockCountriesResponse = [mockCountryNoInsuranceSupport];

        getCisCountriesSpy = jest.fn(() => Promise.resolve(mockCountriesResponse));

        api.keystone.APIM.getCisCountries = getCisCountriesSpy;

        req.body[FIELD_IDS.ELIGIBILITY.BUYER_COUNTRY] = selectedCountryIsoCode;
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

        const { CANNOT_APPLY_EXIT } = PAGES;
        const { REASON } = CANNOT_APPLY_EXIT;

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
