import getApimCurrencies from '.';
import APIM from '../../../integrations/APIM';
import mapCurrencies from '../../../helpers/map-currencies';
import mockApimCurrenciesResponse from '../../../test-mocks/mock-APIM-currencies-response';
import mockCurrencies from '../../../test-mocks/mock-currencies';

describe('custom-resolvers/get-APIM-currencies', () => {
  jest.mock('../../../integrations/APIM');

  afterAll(() => {
    jest.resetAllMocks();
  });

  describe('when APIM currencies API returns success with data/countries', () => {
    beforeEach(() => {
      APIM.getCurrencies = jest.fn(() => Promise.resolve(mockApimCurrenciesResponse));
    });

    it('should return mapped countries when "allCurrencies" is "false"', async () => {
      const response = await getApimCurrencies({}, { allCurrencies: false });

      const mapped = mapCurrencies(mockCurrencies, false);

      expect(response).toEqual(mapped);
    });

    it('should return mapped countries when "allCurrencies" is "true"', async () => {
      const response = await getApimCurrencies({}, { allCurrencies: true });

      const mapped = mapCurrencies(mockCurrencies, true);

      expect(response).toEqual(mapped);
    });
  });

  describe('when APIM currencies API returns success as false', () => {
    beforeEach(() => {
      APIM.getCurrencies = jest.fn(() => Promise.resolve({ success: false }));
    });

    it('should return object containing success as false', async () => {
      const response = await getApimCurrencies({}, { allCurrencies: true });

      const expected = { success: false };

      expect(response).toEqual(expected);
    });
  });

  describe('when APIM currencies API returns empty data object', () => {
    beforeEach(() => {
      APIM.getCurrencies = jest.fn(() => Promise.resolve({ success: true, data: undefined }));
    });

    it('should return object containing success as false', async () => {
      const response = await getApimCurrencies({}, { allCurrencies: true });

      const expected = { success: false };

      expect(response).toEqual(expected);
    });
  });

  describe('when APIM currencies API is down', () => {
    const mockError = '500 error';

    beforeEach(() => {
      APIM.getCurrencies = jest.fn(() => Promise.reject(mockError));
    });

    it('should throw an error', async () => {
      try {
        await getApimCurrencies({}, { allCurrencies: true });
      } catch (err) {
        const expected = new Error(`Getting and mapping currencies from APIM ${mockError}`);

        expect(err).toEqual(expected);
      }
    });
  });
});
