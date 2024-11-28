import { Address } from './address';

export interface MappedOrdnanceSurveyAddress extends Address {
  town?: string;
  county?: string;
}
