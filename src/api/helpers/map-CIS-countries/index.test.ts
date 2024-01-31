import mapCisCountries from '.';
import mapCisCountry from './map-CIS-country';
import { EXTERNAL_API_DEFINITIONS } from '../../constants';
import filterCisEntries from '../filter-cis-entries';
import sortArrayAlphabetically from '../sort-array-alphabetically';
import mockCisCountries from '../../test-mocks/mock-CIS-countries';
import { CisCountry } from '../../types';

const { CIS } = EXTERNAL_API_DEFINITIONS;

describe('helpers/map-CIS-countries', () => {
  it('should return array of filtered, mapped and sorted objects', () => {
    const filteredCountries = filterCisEntries(mockCisCountries, CIS.INVALID_COUNTRIES, 'marketName') as Array<CisCountry>;

    const result = mapCisCountries(filteredCountries);

    const mapped = filteredCountries.map((country) => mapCisCountry(country));

    const expected = sortArrayAlphabetically(mapped, 'name');

    expect(result).toEqual(expected);
  });
});
