import { EXTERNAL_API_MAPPINGS } from '../constants';
import { Country } from '../../types';

const {
  CIS: { RISK },
} = EXTERNAL_API_MAPPINGS;

// mock base country that can get a quote and apply online.
const baseCountry = {
  canGetAQuoteOnline: true,
  canGetAQuoteOffline: false,
  noOnlineSupport: false,
  cannotGetAQuote: false,
  canApplyForInsuranceOnline: true,
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
    esraClassification: RISK.STANDARD,
    shortTermCover: false,
    canGetAQuoteOnline: false,
    canApplyForInsuranceOnline: false,
    cannotGetAQuote: true,
  },
  {
    name: 'Algeria',
    isoCode: 'DZA',
    esraClassification: RISK.STANDARD,
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
    esraClassification: RISK.VERY_HIGH,
    ...baseCountry,
    canGetAQuoteOnline: false,
    noOnlineSupport: true,
  },
  /**
   * mock country that:
   * - can only apply for insurance offline
   */
  {
    name: 'Gabon',
    isoCode: 'GAB',
    esraClassification: RISK.VERY_HIGH,
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
    esraClassification: RISK.STANDARD,
    canGetAQuoteOnline: false,
    canGetAQuoteOffline: false,
    canApplyForInsuranceOnline: false,
    noOnlineSupport: false,
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
    esraClassification: RISK.STANDARD,
    canGetAQuoteOnline: true,
    canGetAQuoteOffline: true,
    canApplyForInsuranceOnline: true,
    canApplyForInsuranceOffline: false,
    shortTermCover: false,
    noOnlineSupport: true,
  },
] as Array<Country>;

export default mockCountries;
