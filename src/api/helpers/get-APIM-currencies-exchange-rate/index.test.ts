import getApimCurrencyExchangeRate from '.';
import APIM from '../../integrations/APIM';
import mockApimCurrenciesExchangeResponse, { mockCurrencyExchange } from '../../test-mocks/mock-APIM-currencies-exchange-response';
import { GBP, USD } from '../../test-mocks/mock-currencies';
import { mockErrorMessage, mockSpyPromiseRejection } from '../../test-mocks';

const mockSource = GBP.isoCode;
const mockTarget = USD.isoCode;

describe('custom-resolvers/get-APIM-currencies-exchange-rate', () => {
  jest.mock('../../integrations/APIM');

  afterAll(() => {
    jest.resetAllMocks();
  });

  describe('when APIM currencies exchange API returns success with data/currencies', () => {
    beforeEach(() => {
      APIM.getCurrenciesExchange = jest.fn(() => Promise.resolve(mockApimCurrenciesExchangeResponse));
    });

    it('should return an object with mapped currencies ', async () => {
      const response = await getApimCurrencyExchangeRate(mockSource, mockTarget);

      const expected = mockCurrencyExchange.midPrice;

      expect(response).toEqual(expected);
    });
  });

  describe('when APIM currencies exchange API returns success=false', () => {
    beforeEach(() => {
      APIM.getCurrenciesExchange = jest.fn(() => Promise.resolve({ success: false }));
    });

    it('should return 0', async () => {
      const response = await getApimCurrencyExchangeRate(mockSource, mockTarget);

      expect(response).toEqual(0);
    });
  });

  describe('when APIM currencies exchange API returns an empty data object', () => {
    beforeEach(() => {
      APIM.getCurrenciesExchange = jest.fn(() => Promise.resolve({ success: true, data: undefined }));
    });

    it('should return 0', async () => {
      const response = await getApimCurrencyExchangeRate(mockSource, mockTarget);

      expect(response).toEqual(0);
    });
  });

  describe('when APIM currencies exchange API is down', () => {
    beforeEach(() => {
      APIM.getCurrenciesExchange = mockSpyPromiseRejection;
    });

    it('should throw an error', async () => {
      try {
        await getApimCurrencyExchangeRate(mockSource, mockTarget);
      } catch (error) {
        const expected = new Error(`Getting currency exchange rate from APIM (getApimCurrencyExchangeRate helper) ${new Error(mockErrorMessage)}`);

        expect(error).toEqual(expected);
      }
    });
  });
});
