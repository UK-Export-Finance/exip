export interface MapYesNoFieldParams {
  answer?: boolean | null;
  defaultValue?: string;
}

export interface MapCisCountryParams {
  shortTermCover: boolean;
  nbiIssueAvailable: boolean;
  esraClassification?: string | null;
}

export interface noOnlineInsuranceSupportParams {
  countryRating: string;
  esraClassification: string;
  shortTermCover: string;
}
