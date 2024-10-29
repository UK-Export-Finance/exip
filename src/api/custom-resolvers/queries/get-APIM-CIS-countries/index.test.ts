import getApimCisCountriesQuery from '.';
import apimCisCountries from '../../../helpers/get-APIM-CIS-countries';
import mockCisCountriesResponse from '../../../test-mocks/mock-APIM-CIS-countries-response';
import { mockErrorMessage, mockSpyPromiseRejection } from '../../../test-mocks';

describe('custom-resolvers/get-APIM-CIS-countries', () => {
  jest.mock('../../../helpers/get-APIM-CIS-countries');

  beforeEach(() => {
    apimCisCountries.get = jest.fn(() => Promise.resolve(mockCisCountriesResponse));
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  it('should return countries from the result of apimCisCountries.get', async () => {
    const response = await getApimCisCountriesQuery();

    const countriesResponse = await apimCisCountries.get();

    const expected = countriesResponse.countries;

    expect(response).toEqual(expected);
  });

  describe('when apimCisCountries.get returns success=false', () => {
    it('should return an empty array', async () => {
      apimCisCountries.get = jest.fn(() => Promise.resolve({ ...mockCisCountriesResponse, success: false }));

      const response = await getApimCisCountriesQuery();

      expect(response).toEqual([]);
    });
  });

  describe('when there is an error', () => {
    beforeEach(() => {
      apimCisCountries.get = mockSpyPromiseRejection;
    });

    it('should throw an error', async () => {
      await expect(getApimCisCountriesQuery()).rejects.toThrow(`Getting CIS countries from APIM ${new Error(mockErrorMessage)}`);
    });
  });
});
