import { SuccessResponse } from '../generic';
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

export interface GetApimCisCountriesResponse extends SuccessResponse {
  data?: [CisCountry];
}

export interface GetApimCisCountriesHelperResponse extends SuccessResponse {
  countries: [MappedCisCountry];
}
