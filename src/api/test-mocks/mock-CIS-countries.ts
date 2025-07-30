import { CisCountry } from '../types';
import { EXTERNAL_API_DEFINITIONS } from '../constants';

const mockDescription = 'Mock description';
const {
  CIS: { ESRA_CLASSIFICATION },
} = EXTERNAL_API_DEFINITIONS;

const mockCisCountries = [
  {
    countryRatingDesc: 'A',
    ESRAClassificationDesc: ESRA_CLASSIFICATION.NONE,
    isoCode: 'XAD',
    marketName: 'Abu Dhabi',
    NBIIssue: '',
    shortTermCoverAvailabilityDesc: mockDescription,
  },
  {
    countryRatingDesc: 'B+',
    ESRAClassificationDesc: ESRA_CLASSIFICATION.NONE,
    isoCode: 'DZA',
    marketName: 'Algeria',
    NBIIssue: '',
    shortTermCoverAvailabilityDesc: mockDescription,
  },
  {
    countryRatingDesc: 'CCC-',
    ESRAClassificationDesc: ESRA_CLASSIFICATION.NONE,
    isoCode: 'GRL',
    marketName: 'Greenland',
    NBIIssue: '',
    shortTermCoverAvailabilityDesc: mockDescription,
  },
] as Array<CisCountry>;

export default mockCisCountries;
