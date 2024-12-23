interface Country {
  id?: string;
  name: string;
  isoCode: string;
  esraClassification: string;
  selected?: boolean;
  value?: string;
  canGetAQuoteOnline: boolean;
  cannotGetAQuote: boolean;
  canApplyForInsuranceOnline: boolean;
  noOnlineSupport: boolean;
  noInsuranceSupport: boolean;
}

export { Country };
