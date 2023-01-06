import { API } from '../constants';
import { CisCountry } from '../../types';

const mockCisCountries = [
  {
    isoCode: 'A',
    marketName: 'Mock A',
    shortTermCoverAvailabilityDesc: API.CIS.SHORT_TERM_COVER_AVAILABLE.YES,
    ESRAClasificationDesc: 'nbiIssueAvailable',
    NBIIssue: 'NBIIssue',
  },
  {
    isoCode: 'B',
    marketName: 'Mock B',
    shortTermCoverAvailabilityDesc: API.CIS.SHORT_TERM_COVER_AVAILABLE.YES,
    ESRAClasificationDesc: 'nbiIssueAvailable',
    NBIIssue: 'NBIIssue',
  },
] as Array<CisCountry>;

export default mockCisCountries;
