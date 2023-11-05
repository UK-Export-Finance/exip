import mapSubmittedEligibilityCountry from '.';
import { FIELD_IDS } from '../../../constants';
import mapCountries from '../map-countries';
import { mockCountries } from '../../../test-mocks';

const {
  ELIGIBILITY: { BUYER_COUNTRY },
} = FIELD_IDS;

describe('server/helpers/mappings/map-submitted-eligibility-country', () => {
  it('should return an object with BUYER_COUNTRY object', () => {
    const mappedCountries = mapCountries(mockCountries);

    const [mappedCountry] = mappedCountries;

    const mockCanApplyOnline = false;

    const result = mapSubmittedEligibilityCountry(mappedCountry, mockCanApplyOnline);

    const expected = {
      [BUYER_COUNTRY]: {
        name: mappedCountry.name,
        isoCode: mappedCountry.isoCode,
        riskCategory: mappedCountry.riskCategory,
        canApplyOnline: mockCanApplyOnline,
      },
    };

    expect(result).toEqual(expected);
  });
});
