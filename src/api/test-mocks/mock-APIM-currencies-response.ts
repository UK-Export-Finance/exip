import mockCurrencies from './mock-currencies';
import { GetApimCurrenciesResponse } from '../types';

const mockApimCurrenciesResponse = {
  success: true,
  data: mockCurrencies,
} as GetApimCurrenciesResponse;

export default mockApimCurrenciesResponse;
