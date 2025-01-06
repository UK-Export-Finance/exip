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
  noInsuranceSupport: false,
  shortTermCover: true,
};

const mockCountries = [
  /**
   * mock country that:
   * - cannot get a quote online
   * - cannot apply for insurance
   */
  {
    name: 'Abu Dhabi',
    ...baseCountry,
    isoCode: 'XAD',
    riskCategory: RISK.STANDARD,
    shortTermCover: false,
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
    noInsuranceSupport: true,
  },
  /**
   * mock country that:
   * - can get a quote, online or offline
   * - can apply for insurance, online
   * - cannot get short term cover
   */
  {
    name: 'France',
    isoCode: 'FRA',
    ...baseCountry,
    riskCategory: RISK.STANDARD,
    canGetAQuoteOnline: true,
    canGetAQuoteOffline: true,
    canApplyForInsuranceOnline: true,
    canApplyForInsuranceOffline: false,
    noInsuranceSupport: false,
    shortTermCover: false,
  },
] as Array<Country>;

export default mockCountries;
