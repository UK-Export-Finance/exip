import { EXTERNAL_API_MAPPINGS } from '../constants';
import { Country } from '../../types';

const {
  CIS: { RISK },
} = EXTERNAL_API_MAPPINGS;

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
  // mock country that cannot get a quote
  {
    name: 'Abu Dhabi',
    isoCode: 'XAD',
    riskCategory: RISK.STANDARD,
    shortTermCover: false,
    ...baseCountry,
    canGetAQuoteOnline: false,
    cannotGetAQuote: true,
  },
  {
    name: 'Algeria',
    isoCode: 'DZA',
    riskCategory: RISK.STANDARD,
    ...baseCountry,
  },
  // mock country that cannot get a quote online, but can get a quote by email
  {
    name: 'Egypt',
    isoCode: 'EGY',
    riskCategory: RISK.VERY_HIGH,
    ...baseCountry,
    canGetAQuoteOnline: false,
    canGetAQuoteByEmail: true,
  },
  // mock country that can only apply for an application offline
  {
    name: 'Gabon',
    isoCode: 'GAB',
    riskCategory: RISK.VERY_HIGH,
    ...baseCountry,
    canGetAQuoteOnline: false,
    canApplyOnline: false,
    canApplyOffline: true,
  },
  {
    name: 'Gibraltar',
    isoCode: 'GIB',
    ...baseCountry,
    riskCategory: RISK.STANDARD,
    canGetAQuoteOnline: false,
    canApplyOnline: false,
    cannotApply: true,
  },
] as Array<Country>;

export default mockCountries;
