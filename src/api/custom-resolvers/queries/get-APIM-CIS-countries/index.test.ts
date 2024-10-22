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

  it('should return the result of apimCisCountries.get', async () => {
    const response = await getApimCisCountriesQuery();

    const expected = await apimCisCountries.get();

    expect(response).toEqual(expected);
  });

  describe('when there is an error', () => {
    beforeEach(() => {
      apimCisCountries.get = mockSpyPromiseRejection;
    });

    it('should throw an error', async () => {
      try {
        await getApimCisCountriesQuery();
      } catch (error) {
        const expected = new Error(`Getting CIS countries from APIM ${new Error(mockErrorMessage)}`);

        expect(error).toEqual(expected);
      }
    });
  });
});
