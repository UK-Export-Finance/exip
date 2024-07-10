import mapSubmittedEligibilityCountry from '.';
import { FIELD_IDS } from '../../../constants';
import mapCountries from '../map-countries';
import { mockCountries } from '../../../test-mocks';

const {
  ELIGIBILITY: { BUYER_COUNTRY },
} = FIELD_IDS;

describe('server/helpers/mappings/map-submitted-eligibility-country', () => {
  describe('when a country has canGetAQuoteOnline=true', () => {
    it('should return an object with BUYER_COUNTRY object with canApplyOnline=true', () => {
      const mappedCountries = mapCountries(mockCountries);

      const [mappedCountry] = mappedCountries;

      const countryCanGetAQuoteOnline = {
        ...mappedCountry,
        canGetAQuoteOnline: true,
      };

      const result = mapSubmittedEligibilityCountry(countryCanGetAQuoteOnline);

      const expected = {
        [BUYER_COUNTRY]: {
          name: mappedCountry.name,
          isoCode: mappedCountry.isoCode,
          riskCategory: mappedCountry.riskCategory,
          canApplyOnline: countryCanGetAQuoteOnline.canGetAQuoteOnline,
        },
      };

      expect(result).toEqual(expected);
    });
  });

  describe('when a country has canGetAQuoteOnline=true', () => {
    it('should return an object with BUYER_COUNTRY object with canApplyOnline=true', () => {
      const mappedCountries = mapCountries(mockCountries);

      const [mappedCountry] = mappedCountries;

      const countryCanApplyForInsuranceOnline = {
        ...mappedCountry,
        canApplyForInsuranceOnline: true,
      };

      const result = mapSubmittedEligibilityCountry(countryCanApplyForInsuranceOnline);

      const expected = {
        [BUYER_COUNTRY]: {
          name: mappedCountry.name,
          isoCode: mappedCountry.isoCode,
          riskCategory: mappedCountry.riskCategory,
          canApplyOnline: countryCanApplyForInsuranceOnline.canApplyForInsuranceOnline,
        },
      };

      expect(result).toEqual(expected);
    });
  });
});
