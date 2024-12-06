import { Address } from './address';

export interface MappedOrdnanceSurveyAddress extends Address {
  addressLine1?: string;
  addressLine2?: string;
  town?: string;
  county?: string;
  postcode?: string;
}
