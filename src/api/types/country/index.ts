import { Currency } from '../currency';
import { Relationship } from '../relationship';

export interface CisCountry {
  countryRatingDesc: string;
  ESRAClassificationDesc: string;
  isoCode: string;
  marketName: string;
  marketRiskAppetitePublicDesc: string;
  NBIIssue: string;
  riskCategory?: string;
  shortTermCoverAvailabilityDesc: string;
}

export interface Country extends Relationship {
  name: string;
  isoCode: string;
  riskCategory?: string;
  shortTermCover?: boolean;
  nbiIssueAvailable?: boolean;
  canGetAQuoteOnline?: boolean;
  canGetAQuoteOffline?: boolean;
  canGetAQuoteByEmail?: boolean;
  cannotGetAQuote?: boolean;
  canApplyForInsuranceOnline?: boolean;
  noInsuranceSupport?: boolean;
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
  esraClassification?: string;
  isoCode: string;
  nbiIssueAvailable: boolean;
  name: string;
  riskCategory?: string;
  shortTermCover: boolean;
  canGetAQuoteOnline: boolean;
  canGetAQuoteOffline: boolean;
  canGetAQuoteByEmail: boolean;
  cannotGetAQuote: boolean;
  canApplyForInsuranceOnline: boolean;
  noOnlineInsuranceSupport: boolean;
  noInsuranceSupport: boolean;
}
