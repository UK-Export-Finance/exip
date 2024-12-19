interface Country {
  id?: string;
  name: string;
  isoCode: string;
  esraClassification: string;
  selected?: boolean;
  value: string;
  canGetAQuoteOnline: boolean;
  canGetAQuoteOffline: boolean;
  canGetAQuoteByEmail: boolean;
  cannotGetAQuote: boolean;
  canApplyForInsuranceOnline: boolean;
  noOnlineInsuranceSupport: boolean;
  noInsuranceSupport: boolean;
  shortTermCover: boolean;
}

export { Country };
