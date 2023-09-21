import mockCisCountries from './mock-CIS-countries';
import { GetApimCisCountriesResponse } from '../types';

const mockCisCountriesResponse = {
  success: true,
  data: mockCisCountries,
} as GetApimCisCountriesResponse;

export default mockCisCountriesResponse;
