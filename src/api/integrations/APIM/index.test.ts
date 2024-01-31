import dotenv from 'dotenv';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import APIM from '.';
import { EXTERNAL_API_ENDPOINTS } from '../../constants';
import { mockCisCountries } from '../../test-mocks';

dotenv.config();

const { APIM_MDM_URL } = process.env;
const { APIM_MDM } = EXTERNAL_API_ENDPOINTS;

const url = `${APIM_MDM_URL}${APIM_MDM.MARKETS}`;

describe('integrations/APIM', () => {
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

      try {
        await APIM.getCisCountries();
      } catch (err) {
        const expected = 'Calling APIM - CIS countries';

        const errorAssertion = String(err).includes(expected);

        expect(errorAssertion).toEqual(true);
      }
    });
  });
});
