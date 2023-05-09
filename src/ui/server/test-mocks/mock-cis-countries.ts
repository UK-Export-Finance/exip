import { FIELD_VALUES } from '../constants';
import { CisCountry } from '../../types';

const mockCisCountries = [
  {
    marketName: 'Abu Dhabi',
    isoCode: 'XAD',
    shortTermCoverAvailabilityDesc: FIELD_VALUES.NO,
    ESRAClassificationDesc: 'Standard risk',
    NBIIssue: 'N',
  },
  {
    marketName: 'Algeria',
    isoCode: 'DZA',
    shortTermCoverAvailabilityDesc: FIELD_VALUES.YES,
    ESRAClassificationDesc: 'Standard Risk',
    NBIIssue: 'Y',
  },
  {
    marketName: 'Egypt',
    isoCode: 'EGY',
    shortTermCoverAvailabilityDesc: FIELD_VALUES.YES,
    ESRAClassificationDesc: 'Standard Risk',
    NBIIssue: 'N',
  },
  {
    marketName: 'Gabon',
    isoCode: 'GAB',
    shortTermCoverAvailabilityDesc: 'ILC Only',
    ESRAClassificationDesc: 'Very High',
    NBIIssue: 'N',
  },
] as Array<CisCountry>;

export default mockCisCountries;
