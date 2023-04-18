import { FIELD_VALUES } from '../constants';
import { CisCountry } from '../../types';

const mockCisCountries = [
  {
    marketName: 'Abu Dhabi',
    isoCode: 'XAD',
    shortTermCoverAvailabilityDesc: FIELD_VALUES.NO,
    ESRAClasificationDesc: 'Standard risk',
    NBIIssue: 'N',
  },
  {
    marketName: 'Algeria',
    isoCode: 'DZA',
    shortTermCoverAvailabilityDesc: FIELD_VALUES.YES,
    ESRAClasificationDesc: 'Standard Risk',
    NBIIssue: 'Y',
  },
  {
    marketName: 'Egypt',
    isoCode: 'EGY',
    shortTermCoverAvailabilityDesc: FIELD_VALUES.YES,
    ESRAClasificationDesc: 'Standard Risk',
    NBIIssue: 'N',
  },
  {
    marketName: 'Gabon',
    isoCode: 'GAB',
    shortTermCoverAvailabilityDesc: 'ILC Only',
    ESRAClasificationDesc: 'Very High',
    NBIIssue: 'N',
  },
] as Array<CisCountry>;

export default mockCisCountries;
