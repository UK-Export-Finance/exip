import dotenv from 'dotenv';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import APIM from '.';
import { EXTERNAL_API_ENDPOINTS, GBP, USD } from '../../constants';
import { mockCisCountries, mockCurrencies } from '../../test-mocks';

dotenv.config();

const { APIM_MDM_URL } = process.env;
const { APIM_MDM } = EXTERNAL_API_ENDPOINTS;

// TODO: update once main is merged into this branch.

describe('integrations/APIM', () => {
  describe('getCisCountries', () => {
    const url = `${APIM_MDM_URL}${APIM_MDM.MARKETS}`;

    describe('when a 200 status and data is returned', () => {
      test('it should return success=true and data', async () => {
        const mock = new MockAdapter(axios);

        const mockResponseData = mockCisCountries;

        mock.onGet(url).reply(200, mockResponseData);

        const result = await APIM.getCisCountries();

        const expected = {
          success: true,
          data: mockResponseData,
        };

        expect(result).toEqual(expected);
      });
    });

    describe('when no data is returned', () => {
      test('it should return success=false', async () => {
        const mock = new MockAdapter(axios);

        mock.onGet(url).reply(200);

        const result = await APIM.getCisCountries();

        const expected = {
          success: false,
        };

        expect(result).toEqual(expected);
      });
    });

    describe('when a 200 status is not returned', () => {
      test('it should throw an error', async () => {
        const mock = new MockAdapter(axios);

        mock.onGet(url).reply(500);

        await expect(APIM.getCisCountries()).rejects.toThrow('Calling APIM - CIS countries');
      });
    });
  });

  describe('getCurrencies', () => {
    const url = `${APIM_MDM_URL}${APIM_MDM.CURRENCY}`;

    describe('when a 200 status and data is returned', () => {
      test('it should return success=true and data', async () => {
        const mock = new MockAdapter(axios);

        const mockResponseData = mockCurrencies;

        mock.onGet(url).reply(200, mockResponseData);

        const result = await APIM.getCurrencies();

        const expected = {
          success: true,
          data: mockResponseData,
        };

        expect(result).toEqual(expected);
      });
    });

    describe('when no data is returned', () => {
      test('it should return success=false', async () => {
        const mock = new MockAdapter(axios);

        mock.onGet(url).reply(200);

        const result = await APIM.getCurrencies();

        const expected = {
          success: false,
        };

        expect(result).toEqual(expected);
      });
    });

    describe('when a 200 status is not returned', () => {
      test('it should throw an error', async () => {
        const mock = new MockAdapter(axios);

        mock.onGet(url).reply(500);

        await expect(APIM.getCurrencies()).rejects.toThrow('Calling APIM - currencies');
      });
    });
  });

  describe('getCurrenciesExchange', () => {
    const url = `${APIM_MDM_URL}${APIM_MDM.CURRENCY_EXCHANGE}`;

    const mockSource = GBP;
    const mockTarget = USD;

    describe('when a 200 status and data is returned', () => {
      test('it should return success=true and data', async () => {
        const mock = new MockAdapter(axios);

        const mockResponseData = mockCurrencies;

        mock.onGet(url).reply(200, mockResponseData);

        const result = await APIM.getCurrenciesExchange(mockSource, mockTarget);

        const expected = {
          success: true,
          data: mockResponseData,
        };

        expect(result).toEqual(expected);
      });
    });

    describe('when no data is returned', () => {
      test('it should return success=false', async () => {
        const mock = new MockAdapter(axios);

        mock.onGet(url).reply(200);

        const result = await APIM.getCurrenciesExchange(mockSource, mockTarget);

        const expected = {
          success: false,
        };

        expect(result).toEqual(expected);
      });
    });

    describe('when a 200 status is not returned', () => {
      test('it should throw an error', async () => {
        const mock = new MockAdapter(axios);

        mock.onGet(url).reply(500);

        await expect(APIM.getCurrenciesExchange(mockSource, mockTarget)).rejects.toThrow('Calling APIM - currencies exchange');
      });
    });
  });
});
