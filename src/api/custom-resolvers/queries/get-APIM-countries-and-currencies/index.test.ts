import getApimCountriesAndCurrencies from '.';
import apimCisCountries from '../../../helpers/get-APIM-CIS-countries';
import apimCurrencies from '../../../helpers/get-APIM-currencies';
import { mockMappedCisCountries, mockCurrencies, mockApimCisCountriesGetHelperResponse, mockApimCurrenciesGetHelperResponse } from '../../../test-mocks';

describe('custom-resolvers/get-APIM-countries-and-currencies', () => {
  jest.mock('../../../helpers/get-APIM-CIS-countries');
  jest.mock('../../../helpers/get-APIM-currencies');

  beforeEach(() => {
    apimCisCountries.get = jest.fn(() => Promise.resolve(mockApimCisCountriesGetHelperResponse));
    apimCurrencies.get = jest.fn(() => Promise.resolve(mockApimCurrenciesGetHelperResponse));
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  it('should return mapped countries and currencies', async () => {
    const response = await getApimCountriesAndCurrencies();

    const expected = {
      countries: mockMappedCisCountries,
      allCurrencies: mockCurrencies,
      alternativeCurrencies: mockCurrencies,
      supportedCurrencies: mockCurrencies,
    };

    expect(response).toEqual(expected);
  });

  describe('when apimCisCountries.get returns success=false', () => {
    beforeEach(() => {
      apimCisCountries.get = jest.fn(() => Promise.resolve({ success: false }));
    });

    it('should throw an error', async () => {
      await expect(getApimCountriesAndCurrencies()).rejects.toThrow('Getting countries from APIM (getApimCountriesAndCurrencies helper)');
    });
  });

  describe('when apimCurrencies.get returns success=false', () => {
    beforeEach(() => {
      apimCisCountries.get = jest.fn(() => Promise.resolve(mockApimCisCountriesGetHelperResponse));
      apimCurrencies.get = jest.fn(() => Promise.resolve({ ...mockApimCurrenciesGetHelperResponse, success: false }));
    });

    it('should throw an error', async () => {
      await expect(getApimCountriesAndCurrencies()).rejects.toThrow('Getting currencies from APIM (getApimCountriesAndCurrencies helper)');
    });
  });

  // TODO promise rejection tests
});
