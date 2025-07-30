import { SuccessResponse } from '../generic';
import { Relationship } from '../relationship';

/**
 * An object representing the available risk levels.
 *
 * @property {string} VERY_HIGH - Represents a "Very High" risk level.
 * @property {string} HIGH - Represents a "High" risk level.
 * @property {string} STANDARD - Represents a "Standard" risk level.
 */
const RISKS = {
  VERY_HIGH: 'Very High',
  HIGH: 'High',
  STANDARD: 'Standard',
} as const;

export type RiskClassifications = (typeof RISKS)[keyof typeof RISKS];

export interface CisCountry {
  countryRatingDesc: string;
  ESRAClassificationDesc: RiskClassifications;
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
  esraClassification?: RiskClassifications;
  canGetAQuoteOnline?: boolean;
  cannotGetAQuote?: boolean;
  canApplyForInsuranceOnline?: boolean;
}

export interface MappedCisCountry {
  countryRating: string;
  esraClassification?: RiskClassifications | null;
  isoCode: string;
  name: string;
  noOnlineSupport: boolean;
  canGetAQuoteOnline: boolean;
  cannotGetAQuote: boolean;
  canApplyForInsuranceOnline: boolean;
  noInsuranceSupport: boolean;
  isHighRisk: boolean;
}

export interface GetApimCisCountriesResponse extends SuccessResponse {
  data?: [CisCountry];
}

export interface GetApimCisCountriesHelperResponse extends SuccessResponse {
  countries: [MappedCisCountry];
}
