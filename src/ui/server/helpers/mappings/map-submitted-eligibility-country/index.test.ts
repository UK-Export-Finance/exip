import mapSubmittedEligibilityCountry from '.';
import { FIELD_IDS } from '../../../constants';
import { mapCisCountries } from '../map-cis-countries';
import { mockCisCountries } from '../../../test-mocks';

const { BUYER_COUNTRY } = FIELD_IDS;

describe('server/helpers/mappings/map-submitted-eligibility-country', () => {
  it('should return an object with BUYER_COUNTRY object', () => {
    const mappedCountries = mapCisCountries(mockCisCountries);

    const mappedCountry = mappedCountries[0];

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
