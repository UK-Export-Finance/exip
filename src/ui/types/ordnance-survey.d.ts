import { Address } from './address';

export interface MappedOrdnanceSurveyAddress extends Address {
  __typename?: string;
  addressLine1?: string;
  addressLine2?: string;
  town?: string;
  county?: string;
  postcode?: string;
}

export interface GetChosenOrdnanceSurveyAddressByIndexParams {
  addresses: Array<MappedOrdnanceSurveyAddress>;
  index?: number;
}
