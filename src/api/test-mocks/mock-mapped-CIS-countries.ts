import { MappedCisCountry } from '../types';

// mock base country that can get a quote and apply online.
const baseCountry = {
  canGetAQuoteOnline: true,
  canGetAQuoteByEmail: false,
  cannotGetAQuote: false,
  canApplyOnline: true,
  canApplyOffline: false,
  cannotApply: false,
};

const mockCountries = [
  {
    name: 'Abu Dhabi',
    isoCode: 'XAD',
    ...baseCountry,
  },
  {
    name: 'Algeria',
    isoCode: 'DZA',
    ...baseCountry,
  },
  {
    name: 'Greenland',
    isoCode: 'GRL',
    ...baseCountry,
  },
] as Array<MappedCisCountry>;

export default mockCountries;
