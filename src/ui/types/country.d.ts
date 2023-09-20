interface Country {
  id?: string;
  name: string;
  isoCode: string;
  riskCategory: string;
  selected?: boolean;
  value: string;
  canGetAQuoteOnline: boolean;
  canGetAQuoteByEmail: boolean;
  cannotGetAQuote: boolean;
  canApplyOnline: boolean;
  canApplyOffline: boolean;
  cannotApply: boolean;
}

export { Country };
