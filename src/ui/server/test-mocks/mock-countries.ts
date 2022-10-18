import { API } from '../constants';
import { Country } from '../../types';

const mockCountries = [
  {
    isoCode: 'A',
    name: 'Mock A',
    riskCategory: 'Standard',
    shortTermCover: API.CIS.SHORT_TERM_COVER_AVAILABLE.YES,
    nbiIssueAvailable: true,
    selected: false,
    value: 'A',
  },
  {
    isoCode: 'B',
    name: 'Mock B',
    shortTermCover: API.CIS.SHORT_TERM_COVER_AVAILABLE.YES,
    nbiIssueAvailable: true,
    selected: false,
    value: 'B',
  },
] as Array<Country>;

export default mockCountries;
