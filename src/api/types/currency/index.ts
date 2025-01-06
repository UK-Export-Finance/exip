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

export interface CurrencyExchange {
  id: number;
  sourceCurrencyId: number;
  targetCurrencyId: number;
  currencyPair: string;
  bidPrice: number;
  askPrice: number;
  lastPrice: number;
  midPrice: number;
  created: string;
  updated: string;
  effectiveFrom: string;
  effectiveTo: string;
}

export interface GetApimCurrenciesExchangeResponse extends SuccessResponse {
  data?: [CurrencyExchange];
}
