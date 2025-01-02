import apimCurrencyExchangeRate from '.';
import { GBP, USD } from '../../constants';
import APIM from '../../integrations/APIM';
import mockApimCurrenciesExchangeResponse, { mockCurrencyExchange } from '../../test-mocks/mock-APIM-currencies-exchange-response';
import { mockErrorMessage, mockSpyPromiseRejection } from '../../test-mocks';

const mockSource = GBP;
const mockTarget = USD;

describe('custom-resolvers/get-APIM-currencies-exchange-rate', () => {
  jest.mock('../../integrations/APIM');

  afterAll(() => {
    jest.resetAllMocks();
  });

  describe('when APIM currencies exchange API returns success with data/currencies', () => {
    beforeEach(() => {
      APIM.getCurrenciesExchange = jest.fn(() => Promise.resolve(mockApimCurrenciesExchangeResponse));
    });

    describe(`when the provided source is ${GBP}`, () => {
      it('should return an exchange rate ', async () => {
        const response = await apimCurrencyExchangeRate.get(GBP, mockTarget);

        const expected = mockCurrencyExchange.midPrice;

        expect(response).toEqual(expected);
      });
    });

    describe(`when the provided source is NOT ${GBP}`, () => {
      it('should return an exchange rate ', async () => {
        const response = await apimCurrencyExchangeRate.get(USD, mockTarget);

        const expected = Number(Number(1 / mockCurrencyExchange.midPrice).toFixed(2));

        expect(response).toEqual(expected);
      });
    });
  });

  describe('when APIM currencies exchange API returns success=false', () => {
    beforeEach(() => {
      APIM.getCurrenciesExchange = jest.fn(() => Promise.resolve({ success: false }));
    });

    it('should return 0', async () => {
      const response = await apimCurrencyExchangeRate.get(mockSource, mockTarget);

      expect(response).toEqual(0);
    });
  });

  describe('when APIM currencies exchange API returns an empty data object', () => {
    beforeEach(() => {
      APIM.getCurrenciesExchange = jest.fn(() => Promise.resolve({ success: true, data: undefined }));
    });

    it('should return 0', async () => {
      const response = await apimCurrencyExchangeRate.get(mockSource, mockTarget);

      expect(response).toEqual(0);
    });
  });

  describe('when APIM currencies exchange API is down', () => {
    beforeEach(() => {
      APIM.getCurrenciesExchange = mockSpyPromiseRejection;
    });

    it('should throw an error', async () => {
      await expect(apimCurrencyExchangeRate.get(mockSource, mockTarget)).rejects.toThrow(
        `Getting currency exchange rate from APIM (getApimCurrencyExchangeRate helper) ${new Error(mockErrorMessage)}`,
      );
    });
  });
});
