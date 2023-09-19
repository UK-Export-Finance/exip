import getApimCisCountries from '.';
import APIM from '../../../integrations/APIM';
import mapCisCountries from '../../../helpers/map-CIS-countries';
import mockCisCountriesResponse from '../../../test-mocks/mock-CIS-countries-response';
import mockCisCountries from '../../../test-mocks/mock-CIS-countries';

describe('custom-resolvers/get-APIM-CIS-countries', () => {
  jest.mock('../../../integrations/APIM');

  afterAll(() => {
    jest.resetAllMocks();
  });

  describe('when APIM CIS API returns success with data/countries', () => {
    beforeEach(() => {
      APIM.getCisCountries = jest.fn(() => Promise.resolve(mockCisCountriesResponse));
    });

    it('should return mapped countries', async () => {
      const response = await getApimCisCountries();

      const mapped = mapCisCountries(mockCisCountries);

      expect(response).toEqual(mapped);
    });
  });

  describe('when APIM CIS API returns success as false', () => {
    beforeEach(() => {
      APIM.getCisCountries = jest.fn(() => Promise.resolve({ success: false }));
    });

    it('should return object containing success as false', async () => {
      const response = await getApimCisCountries();

      const expected = { success: false };

      expect(response).toEqual(expected);
    });
  });

  describe('when APIM CIS API returns empty data object', () => {
    beforeEach(() => {
      APIM.getCisCountries = jest.fn(() => Promise.resolve({ success: true, data: undefined }));
    });

    it('should return object containing success as false', async () => {
      const response = await getApimCisCountries();

      const expected = { success: false };

      expect(response).toEqual(expected);
    });
  });

  describe('when APIM CIS API is down', () => {
    const mockError = '500 error';

    beforeEach(() => {
      APIM.getCisCountries = jest.fn(() => Promise.reject(mockError));
    });

    it('should throw an error', async () => {
      try {
        await getApimCisCountries();
      } catch (err) {
        const expected = new Error(`Getting and mapping CIS countries from APIM ${mockError}`);

        expect(err).toEqual(expected);
      }
    });
  });
});
