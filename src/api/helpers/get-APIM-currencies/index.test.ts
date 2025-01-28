import apimCurrencies from '.';
import APIM from '../../integrations/APIM';
import mapCurrencies from '../map-currencies';
import mockApimCurrenciesResponse from '../../test-mocks/mock-APIM-currencies-response';
import { mockCurrencies, mockErrorMessage, mockSpyPromiseRejection } from '../../test-mocks';

describe('custom-resolvers/get-APIM-currencies', () => {
  jest.mock('../../integrations/APIM');

  afterAll(() => {
    jest.resetAllMocks();
  });

  describe('when APIM currencies API returns success with data/currencies', () => {
    beforeEach(() => {
      APIM.getCurrencies = jest.fn(() => Promise.resolve(mockApimCurrenciesResponse));
    });

    it('should return an object with mapped currencies ', async () => {
      const response = await apimCurrencies.get();

      const mappedSupported = mapCurrencies(mockCurrencies, false);
      const mappedAlternative = mapCurrencies(mockCurrencies, true);

      const expected = {
        success: true,
        supportedCurrencies: mappedSupported,
        alternativeCurrencies: mappedAlternative,
        allCurrencies: [...mappedSupported, ...mappedAlternative],
      };

      expect(response).toEqual(expected);
    });
  });

  describe('when APIM currencies API returns success=false', () => {
    beforeEach(() => {
      APIM.getCurrencies = jest.fn(() => Promise.resolve({ success: false }));
    });

    it('should return an object containing success=false', async () => {
      const response = await apimCurrencies.get();

      const expected = { success: false };

      expect(response).toEqual(expected);
    });
  });

  describe('when APIM currencies API returns an empty data object', () => {
    beforeEach(() => {
      APIM.getCurrencies = jest.fn(() => Promise.resolve({ success: true, data: undefined }));
    });

    it('should return an object containing success=false', async () => {
      const response = await apimCurrencies.get();

      const expected = { success: false };

      expect(response).toEqual(expected);
    });
  });

  describe('when APIM currencies API is down', () => {
    beforeEach(() => {
      APIM.getCurrencies = mockSpyPromiseRejection;
    });

    it('should throw an error', async () => {
      try {
        await apimCurrencies.get();
      } catch (error) {
        const expected = new Error(`Getting and mapping currencies from APIM (apimCurrencies helper) ${new Error(mockErrorMessage)}`);

        expect(error).toEqual(expected);
      }
    });
  });
});
