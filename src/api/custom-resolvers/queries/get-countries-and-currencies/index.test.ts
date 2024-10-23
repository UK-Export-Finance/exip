import { Context } from '.keystone/types'; // eslint-disable-line
import getCountriesAndCurrencies from '.';
import apimCurrencies from '../../../helpers/get-APIM-currencies';
import getKeystoneContext from '../../../test-helpers/get-keystone-context';
import { mockCurrencies, mockApimCurrenciesGetHelperResponse } from '../../../test-mocks';

describe('custom-resolvers/get-countries-and-currencies', () => {
  jest.mock('../../../helpers/get-APIM-currencies');

  let context: Context;

  beforeEach(() => {
    context = getKeystoneContext();

    apimCurrencies.get = jest.fn(() => Promise.resolve(mockApimCurrenciesGetHelperResponse));
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  it('should return countries and mapped currencies', async () => {
    const response = await getCountriesAndCurrencies(context);

    const expectedCountries = await context.db.Country.findMany();

    const expected = {
      countries: expectedCountries,
      allCurrencies: mockCurrencies,
      alternativeCurrencies: mockCurrencies,
      supportedCurrencies: mockCurrencies,
    };

    expect(response).toEqual(expected);
  });

  describe('when apimCurrencies.get returns success=false', () => {
    beforeEach(() => {
      apimCurrencies.get = jest.fn(() => Promise.resolve({ ...mockApimCurrenciesGetHelperResponse, success: false }));
    });

    it('should throw an error', async () => {
      await expect(getCountriesAndCurrencies(context)).rejects.toThrow('Getting currencies (getCountriesAndCurrencies helper)');
    });
  });

  // TODO promise rejection tests
});
