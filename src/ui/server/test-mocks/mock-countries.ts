import { EXTERNAL_API_MAPPINGS } from '../constants';
import { Country } from '../../types';

const {
  CIS: { RISK },
} = EXTERNAL_API_MAPPINGS;

// mock base country that can get a quote and apply online.
const baseCountry = {
  canGetAQuoteOnline: true,
  canGetAQuoteOffline: false,
  canGetAQuoteByEmail: false,
  cannotGetAQuote: false,
  canApplyForInsuranceOnline: true,
  canApplyForInsuranceOffline: false,
  cannotGetAQuoteOrApplyForInsurance: false,
};

const mockCountries = [
  /**
   * mock country that:
   * - cannot get a quote online
   * - cannot apply for insurance
   */
  {
    name: 'Abu Dhabi',
    isoCode: 'XAD',
    riskCategory: RISK.STANDARD,
    shortTermCover: false,
    ...baseCountry,
    canGetAQuoteOnline: false,
    canApplyForInsuranceOnline: false,
    cannotGetAQuote: true,
  },
  {
    name: 'Algeria',
    isoCode: 'DZA',
    riskCategory: RISK.STANDARD,
    ...baseCountry,
  },
  /**
   * mock country that:
   * - cannot get a quote online
   * - can get a quote by email
   */
  {
    name: 'Egypt',
    isoCode: 'EGY',
    riskCategory: RISK.VERY_HIGH,
    ...baseCountry,
    canGetAQuoteOnline: false,
    canGetAQuoteByEmail: true,
  },
  /**
   * mock country that:
   * - can only apply for insurance offline
   */
  {
    name: 'Gabon',
    isoCode: 'GAB',
    riskCategory: RISK.VERY_HIGH,
    ...baseCountry,
    canGetAQuoteOnline: false,
    canApplyForInsuranceOnline: false,
    canApplyForInsuranceOffline: true,
  },
  /**
   * mock country that:
   * - cannot get a quote, online or offline
   * - cannot apply for insurance, online or offline
   */
  {
    name: 'Gibraltar',
    isoCode: 'GIB',
    ...baseCountry,
    riskCategory: RISK.STANDARD,
    canGetAQuoteOnline: false,
    canGetAQuoteOffline: false,
    canApplyForInsuranceOnline: false,
    canApplyForInsuranceOffline: false,
    cannotGetAQuoteOrApplyForInsurance: true,
  },
] as Array<Country>;

export default mockCountries;
