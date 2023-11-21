interface Country {
  id?: string;
  name: string;
  isoCode: string;
  riskCategory: string;
  selected?: boolean;
  value: string;
  canGetAQuoteOnline: boolean;
  canGetAQuoteOffline: boolean;
  canGetAQuoteByEmail: boolean;
  cannotGetAQuote: boolean;
  // canApplyOnline: boolean;
  // canApplyOffline: boolean;
  // cannotApply: boolean;

  canApplyForInsuranceOnline: boolean;
  canApplyForInsuranceOffline: boolean;
  cannotGetAQuoteOrApplyForInsurance: boolean;
}

export { Country };
