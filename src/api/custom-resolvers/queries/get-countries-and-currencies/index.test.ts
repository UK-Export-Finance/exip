import { Context } from '.keystone/types'; // eslint-disable-line
import getCountriesAndCurrencies from '.';
import apimCurrencies from '../../../helpers/get-APIM-currencies';
import getKeystoneContext from '../../../test-helpers/get-keystone-context';
import { mockCurrencies, mockApimCurrenciesGetHelperResponse, mockErrorMessage, mockSpyPromiseRejection } from '../../../test-mocks';

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
    const response = await getCountriesAndCurrencies({}, {}, context);

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
      await expect(getCountriesAndCurrencies({}, {}, context)).rejects.toThrow('Getting currencies (getCountriesAndCurrencies helper)');
    });
  });

  describe('when there is an error', () => {
    beforeEach(() => {
      apimCurrencies.get = mockSpyPromiseRejection;
    });

    it('should throw an error', async () => {
      try {
        await getCountriesAndCurrencies({}, {}, context);
      } catch (error) {
        const expected = new Error(`Getting countries and currencies (getCountriesAndCurrencies helper) ${new Error(mockErrorMessage)}`);

        expect(error).toEqual(expected);
      }
    });
  });
});
