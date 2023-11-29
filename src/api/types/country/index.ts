import { Relationship } from '../relationship';

export interface CisCountry {
  marketName: string;
  isoCode: string;
  shortTermCoverAvailabilityDesc: string;
  ESRAClassificationDesc: string;
  NBIIssue: string;
  riskCategory?: string;
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
  canApplyForInsuranceOffline?: boolean;
  noInsuranceSupport?: boolean;
}

export interface GetApimCisCountriesResponse {
  success: boolean;
  data?: [CisCountry];
}

export interface MappedCisCountry {
  name: string;
  isoCode: string;
  shortTermCover: boolean;
  riskCategory?: string;
  nbiIssueAvailable: boolean;
  canGetAQuoteOnline: boolean;
  canGetAQuoteOffline: boolean;
  canGetAQuoteByEmail: boolean;
  cannotGetAQuote: boolean;
  canApplyForInsuranceOnline: boolean;
  canApplyForInsuranceOffline: boolean;
  noInsuranceSupport: boolean;
}
