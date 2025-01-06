import { CurrencyExchange, GetApimCurrenciesExchangeResponse } from '../types';

export const mockCurrencyExchange: CurrencyExchange = {
  id: 389789,
  sourceCurrencyId: 12,
  targetCurrencyId: 37,
  currencyPair: 'GBP-USD X-RATE',
  bidPrice: 1.2768,
  askPrice: 1.2769,
  lastPrice: 1.2768,
  midPrice: 1.27685,
  created: '2024-07-03T16:31:34.000Z',
  updated: '2024-07-03T16:31:34.000Z',
  effectiveFrom: '2024-07-03T00:00:00.000Z',
  effectiveTo: '9999-12-31T00:00:00.000Z',
};

const mockApimCurrenciesExchangeResponse = {
  success: true,
  data: [mockCurrencyExchange],
} as GetApimCurrenciesExchangeResponse;

export default mockApimCurrenciesExchangeResponse;
