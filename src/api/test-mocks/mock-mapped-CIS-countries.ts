import { MappedCisCountry } from '../types';

// mock base country that can get a quote and apply online.
const baseCountry = {
  canGetAQuoteOnline: true,
  canGetAQuoteOffline: true,
  canGetAQuoteByEmail: true,
  cannotGetAQuote: false,
  canApplyForInsuranceOnline: true,
  canApplyForInsuranceOffline: true,
  noInsuranceSupport: false,
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
