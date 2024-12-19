import { CisCountry } from '../types';

const mockDescription = 'Mock description';

const mockCisCountries = [
  {
    countryRatingDesc: 'A',
    ESRAClassificationDesc: mockDescription,
    isoCode: 'XAD',
    marketName: 'Abu Dhabi',
    NBIIssue: '',
    shortTermCoverAvailabilityDesc: mockDescription,
  },
  {
    countryRatingDesc: 'B+',
    ESRAClassificationDesc: mockDescription,
    isoCode: 'DZA',
    marketName: 'Algeria',
    NBIIssue: '',
    shortTermCoverAvailabilityDesc: mockDescription,
  },
  {
    countryRatingDesc: 'CCC-',
    ESRAClassificationDesc: mockDescription,
    isoCode: 'GRL',
    marketName: 'Greenland',
    NBIIssue: '',
    shortTermCoverAvailabilityDesc: mockDescription,
  },
] as Array<CisCountry>;

export default mockCisCountries;
