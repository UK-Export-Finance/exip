import { CisCountry } from '../types';
import { EXTERNAL_API_DEFINITIONS } from '../constants';

const {
  CIS: { ESRA_CLASSIFICATION },
} = EXTERNAL_API_DEFINITIONS;
const mockDescription = 'mock';

const mockCisCountries = [
  {
    countryRatingDesc: 'A',
    ESRAClassificationDesc: ESRA_CLASSIFICATION.STANDARD,
    isoCode: 'XAD',
    marketName: 'Abu Dhabi',
    NBIIssue: '',
    shortTermCoverAvailabilityDesc: mockDescription,
  },
  {
    countryRatingDesc: 'B+',
    ESRAClassificationDesc: ESRA_CLASSIFICATION.STANDARD,
    isoCode: 'DZA',
    marketName: 'Algeria',
    NBIIssue: '',
    shortTermCoverAvailabilityDesc: mockDescription,
  },
  {
    countryRatingDesc: 'CCC-',
    ESRAClassificationDesc: ESRA_CLASSIFICATION.HIGH,
    isoCode: 'GRL',
    marketName: 'Greenland',
    NBIIssue: '',
    shortTermCoverAvailabilityDesc: mockDescription,
  },
] as Array<CisCountry>;

export default mockCisCountries;
