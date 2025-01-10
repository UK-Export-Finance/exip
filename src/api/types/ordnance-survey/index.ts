import { SuccessResponse } from '../generic';

export interface OrdnanceSurveyAddressDPA {
  ADDRESS: string;
  BUILDING_NUMBER?: string;
  BUILDING_NAME?: string;
  DEPENDENT_LOCALITY?: string;
  ORGANISATION_NAME?: string;
  POST_TOWN: string;
  POSTCODE: string;
  SUB_BUILDING_NAME?: string;
  THOROUGHFARE_NAME?: string;
}

export interface OrdnanceSurveyAddress {
  DPA: OrdnanceSurveyAddressDPA;
}

export interface OrdnanceSurveyAPIResponse extends SuccessResponse {
  data?: Array<OrdnanceSurveyAddress>;
}

export interface OrdnanceSurveyVariables {
  postcode: string;
  houseNameOrNumber: string;
}
