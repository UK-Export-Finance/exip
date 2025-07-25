import { EXTERNAL_API_MAPPINGS } from '../constants';
import { RiskClassifications, Country } from '../../types';

const {
  CIS: { RISK },
} = EXTERNAL_API_MAPPINGS;

const baseCountry = {
  noOnlineSupport: false,
  canGetAQuoteOnline: false,
  cannotGetAQuote: false,
  canApplyForInsuranceOnline: false,
  noInsuranceSupport: false,
  shortTermCover: false,
  esraClassification: RISK.STANDARD as RiskClassifications,
  isHighRisk: false,
};

export const mockCountryCannotGetAQuote: Country = {
  ...baseCountry,
  name: 'Abu Dhabi',
  isoCode: 'XAD',
  cannotGetAQuote: true,
};

export const mockCountryCanGetAQuoteOnline: Country = {
  ...baseCountry,
  name: 'Algeria',
  isoCode: 'DZA',
  canGetAQuoteOnline: true,
};

export const mockCountryCanApplyForInsuranceOnline: Country = {
  ...baseCountry,
  name: 'Algeria',
  isoCode: 'DZA',
  canApplyForInsuranceOnline: true,
};

export const mockCountryNoInsuranceSupport: Country = {
  ...baseCountry,
  name: 'Algeria',
  isoCode: 'DZA',
  noInsuranceSupport: true,
};

export const mockCountryNoOnlineSupport: Country = {
  ...baseCountry,
  name: 'Algeria',
  isoCode: 'DZA',
  noOnlineSupport: true,
};

export const mockCountryCanGetAQuoteByEmail: Country = {
  ...baseCountry,
  name: 'Egypt',
  isoCode: 'EGY',
  noOnlineSupport: true,
};

export const mockHighRiskCountry: Country = {
  ...baseCountry,
  name: 'Bahrain',
  isoCode: 'EGY',
  noOnlineSupport: true,
  isHighRisk: true,
};

export const mockCountries = [mockCountryCannotGetAQuote, mockCountryCanGetAQuoteOnline, mockCountryCanGetAQuoteByEmail, mockHighRiskCountry] as Array<Country>;

export default mockCountries;
