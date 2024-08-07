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
  canApplyForInsuranceOnline: boolean;
  noInsuranceSupport: boolean;
  shortTermCover: boolean;
}

export { Country };
