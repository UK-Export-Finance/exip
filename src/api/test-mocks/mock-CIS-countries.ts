import { CisCountry } from '../types';

const mockDescription = 'Mock description';

const mockCisCountries = [
  {
    marketName: 'Abu Dhabi',
    isoCode: 'XAD',
    shortTermCoverAvailabilityDesc: mockDescription,
    ESRAClassificationDesc: mockDescription,
    NBIIssue: '',
  },
  {
    marketName: 'Algeria',
    isoCode: 'DZA',
    shortTermCoverAvailabilityDesc: mockDescription,
    ESRAClassificationDesc: mockDescription,
    NBIIssue: '',
  },
  {
    marketName: 'Greenland',
    isoCode: 'GRL',
    shortTermCoverAvailabilityDesc: mockDescription,
    ESRAClassificationDesc: mockDescription,
    NBIIssue: '',
  },
] as Array<CisCountry>;

export default mockCisCountries;
