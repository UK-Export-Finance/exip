import getCountryByName from '.';
import { Country } from '../../../types';

describe('server/helpers/get-country-by-name', () => {
  it('should return a mapped object', () => {
    const mockCountries = [
      {
        isoCode: 'A',
        name: 'Mock A',
        riskCategory: 'Standard',
        shortTermCoverAvailable: true,
        nbiIssueAvailable: true,
        selected: false,
        value: 'A',
      },
      {
        isoCode: 'B',
        name: 'Mock B',
        shortTermCoverAvailable: true,
        nbiIssueAvailable: true,
        selected: false,
        value: 'B',
      },
    ] as Array<Country>;

    const result = getCountryByName(mockCountries, 'Mock B');

    const expected = mockCountries[1];

    expect(result).toEqual(expected);
  });
});
