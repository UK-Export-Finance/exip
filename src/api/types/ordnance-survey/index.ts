import { Address } from '../address';
import { SuccessResponse } from '../generic';

export interface MappedOrdnanceSurveyAddress extends Address {
  town?: string;
  county?: string;
}

export interface OrdnanceSurveyAddress {
  ADDRESS: string;
  BUILDING_NUMBER: string;
  BUILDING_NAME?: string;
  POST_TOWN: string;
  POSTCODE: string;
  DEPENDENT_LOCALITY?: string;
  ORGANISATION_NAME?: string;
  THOROUGHFARE_NAME?: string;
}

export interface OrdnanceSurveyResponse {
  DPA: OrdnanceSurveyAddress;
}

export interface OrdnanceSurveyAPIResponse extends SuccessResponse {
  data?: Array<OrdnanceSurveyResponse>;
}

export interface OrdnanceSurveyVariables {
  postcode: string;
  houseNameOrNumber: string;
}
