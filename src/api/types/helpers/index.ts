export interface MapYesNoFieldParams {
  answer?: boolean | null;
  defaultValue?: string;
}

export interface MapCisCountryParams {
  shortTermCover: boolean;
  esraClassification?: string | null;
}

export interface NoInsuranceSupportParams {
  countryRating: string;
  esraClassification: string;
  shortTermCover: string;
}
