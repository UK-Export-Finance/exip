import { Currency } from '../currency';
import { Relationship } from '../relationship';

export interface CisCountry {
  countryRatingDesc: string;
  ESRAClassificationDesc: string;
  isoCode: string;
  marketName: string;
  marketRiskAppetitePublicDesc: string;
  NBIIssue: string;
  esraClassification?: string;
  shortTermCoverAvailabilityDesc: string;
}

export interface Country extends Relationship {
  name: string;
  isoCode: string;
  esraClassification?: string;
  canGetAQuoteOnline?: boolean;
  cannotGetAQuote?: boolean;
  canApplyForInsuranceOnline?: boolean;
}

export interface GetApimCisCountriesResponse {
  success: boolean;
  data?: [CisCountry];
}

export interface GetApimCurrenciesResponse {
  success: boolean;
  data?: [Currency];
}

export interface MappedCisCountry {
  countryRating: string;
  esraClassification?: string | null;
  isoCode: string;
  name: string;
  noOnlineSupport: boolean;
  canGetAQuoteOnline: boolean;
  cannotGetAQuote: boolean;
  canApplyForInsuranceOnline: boolean;
  noInsuranceSupport: boolean;
}
