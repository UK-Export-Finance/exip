import { RiskClassifications } from './risk';
interface Country {
  id?: string;
  name: string;
  isoCode: string;
  esraClassification: RiskClassifications;
  selected?: boolean;
  value?: string;
  canGetAQuoteOnline: boolean;
  cannotGetAQuote: boolean;
  canApplyForInsuranceOnline: boolean;
  noOnlineSupport: boolean;
  noInsuranceSupport: boolean;
  isHighRisk: boolean;
}

export { Country };
