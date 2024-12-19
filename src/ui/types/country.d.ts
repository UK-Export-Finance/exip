interface Country {
  id?: string;
  name: string;
  isoCode: string;
  esraClassification: string;
  selected?: boolean;
  value: string;
  canGetAQuoteOnline: boolean;
  canGetAQuoteOffline: boolean;
  noOnlineSupport: boolean;
  cannotGetAQuote: boolean;
  canApplyForInsuranceOnline: boolean;
  shortTermCover: boolean;
}

export { Country };
