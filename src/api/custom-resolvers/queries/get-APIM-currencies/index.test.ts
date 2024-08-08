import getApimCurrencies from '.';
import APIM from '../../../integrations/APIM';
import mapCurrencies from '../../../helpers/map-currencies';
import mockApimCurrenciesResponse from '../../../test-mocks/mock-APIM-currencies-response';
import { mockCurrencies, mockErrorMessage } from '../../../test-mocks';

describe('custom-resolvers/get-APIM-currencies', () => {
  jest.mock('../../../integrations/APIM');

  afterAll(() => {
    jest.resetAllMocks();
  });

  describe('when APIM currencies API returns success with data/countries', () => {
    beforeEach(() => {
      APIM.getCurrencies = jest.fn(() => Promise.resolve(mockApimCurrenciesResponse));
    });

    it('should return an object with mapped countries ', async () => {
      const response = await getApimCurrencies();

      const mappedSupported = mapCurrencies(mockCurrencies, false);
      const mappedAlternative = mapCurrencies(mockCurrencies, true);

      const expected = {
        supportedCurrencies: mappedSupported,
        alternativeCurrencies: mappedAlternative,
        allCurrencies: [...mappedSupported, ...mappedAlternative],
      };

      expect(response).toEqual(expected);
    });
  });

  describe('when APIM currencies API returns success as false', () => {
    beforeEach(() => {
      APIM.getCurrencies = jest.fn(() => Promise.resolve({ success: false }));
    });

    it('should return object containing success as false', async () => {
      const response = await getApimCurrencies();

      const expected = { success: false };

      expect(response).toEqual(expected);
    });
  });

  describe('when APIM currencies API returns empty data object', () => {
    beforeEach(() => {
      APIM.getCurrencies = jest.fn(() => Promise.resolve({ success: true, data: undefined }));
    });

    it('should return object containing success as false', async () => {
      const response = await getApimCurrencies();

      const expected = { success: false };

      expect(response).toEqual(expected);
    });
  });

  describe('when APIM currencies API is down', () => {
    beforeEach(() => {
      APIM.getCurrencies = jest.fn(() => Promise.reject(new Error(mockErrorMessage)));
    });

    it('should throw an error', async () => {
      try {
        await getApimCurrencies();
      } catch (error) {
        const expected = new Error(`Getting and mapping currencies from APIM ${new Error(mockErrorMessage)}`);

        expect(error).toEqual(expected);
      }
    });
  });
});
