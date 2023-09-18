import { FIELD_VALUES } from '../constants';
import { Country } from '../../types';

const mockCountries = [
  {
    name: 'Abu Dhabi',
    isoCode: 'XAD',
    shortTermCover: FIELD_VALUES.NO,
    riskCategory: 'Standard',
    nbiIssueAvailable: false,
  },
  {
    name: 'Algeria',
    isoCode: 'DZA',
    shortTermCover: FIELD_VALUES.YES,
    riskCategory: 'Standard',
    nbiIssueAvailable: true,
  },
  {
    name: 'Egypt',
    isoCode: 'EGY',
    shortTermCover: FIELD_VALUES.YES,
    riskCategory: 'Standard',
    nbiIssueAvailable: false,
  },
  {
    name: 'Gabon',
    isoCode: 'GAB',
    shortTermCover: 'ILC Only',
    ESRAClassificationDesc: 'Very High',
    nbiIssueAvailable: false,
  },
] as Array<Country>;

export default mockCountries;
