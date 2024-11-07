import { SuccessResponse } from '../generic';

export interface Currency {
  name: string;
  isoCode: string;
}

export interface GetApimCurrenciesResponse extends SuccessResponse {
  data?: [Currency];
}

export interface GetApimCurrenciesHelperResponse extends SuccessResponse {
  supportedCurrencies?: [Currency];
  alternativeCurrencies?: [Currency];
  allCurrencies?: [Currency];
}

export interface GetApimCurrenciesQueryResponse {
  supportedCurrencies?: [Currency];
  alternativeCurrencies?: [Currency];
  allCurrencies?: [Currency];
}
