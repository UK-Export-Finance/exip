import { mockCurrenciesResponse } from './mock-currencies';
import mockCountries from './mock-countries';

const mockCountriesAndCurrencies = {
  ...mockCurrenciesResponse,
  countries: mockCountries,
};

export default mockCountriesAndCurrencies;
