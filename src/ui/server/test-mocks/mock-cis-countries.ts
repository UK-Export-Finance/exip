import { CisCountry } from '../../types';

const mockCisCountries = [
  {
    marketName: 'Abu Dhabi',
    isoCode: 'XAD',
    shortTermCoverAvailabilityDesc: 'No',
    ESRAClasificationDesc: 'Standard risk',
    NBIIssue: 'N',
  },
  {
    marketName: 'Algeria',
    isoCode: 'DZA',
    shortTermCoverAvailabilityDesc: 'Yes',
    ESRAClasificationDesc: 'Standard Risk',
    NBIIssue: 'Y',
  },
  {
    marketName: 'Egypt',
    isoCode: 'EGY',
    shortTermCoverAvailabilityDesc: 'Yes',
    ESRAClasificationDesc: 'Standard Risk',
    NBIIssue: 'N',
  },
] as Array<CisCountry>;

export default mockCisCountries;
