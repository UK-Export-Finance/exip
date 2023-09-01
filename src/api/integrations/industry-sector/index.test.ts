import dotenv from 'dotenv';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import getIndustrySectorNames from '.';
import { EXTERNAL_API_ENDPOINTS } from '../../constants';
import mockIndustrySectors from '../../test-mocks/mock-industry-sectors';

dotenv.config();

const { APIM_MDM_URL } = process.env;
const { MULESOFT_MDM_EA } = EXTERNAL_API_ENDPOINTS;

describe('integrations/industry-sector', () => {
  describe('when a 200 status and data is returned', () => {
    test('it should return success=true and data', async () => {
      const mock = new MockAdapter(axios);

      const mockResponseData = mockIndustrySectors;

      mock.onGet(`${APIM_MDM_URL}${MULESOFT_MDM_EA.INDUSTRY_SECTORS}`).reply(200, mockResponseData);

      const result = await getIndustrySectorNames.get();

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

      mock.onGet(`${APIM_MDM_URL}${MULESOFT_MDM_EA.INDUSTRY_SECTORS}`).reply(200);

      const result = await getIndustrySectorNames.get();

      const expected = {
        success: false,
      };

      expect(result).toEqual(expected);
    });
  });

  describe('when a 200 status is not returned', () => {
    test('it should return success=false and apiError=true', async () => {
      const mock = new MockAdapter(axios);

      mock.onGet(`${APIM_MDM_URL}${MULESOFT_MDM_EA.INDUSTRY_SECTORS}`).reply(500);

      const result = await getIndustrySectorNames.get();

      const expected = {
        success: false,
        apiError: true,
      };

      expect(result).toEqual(expected);
    });
  });
});
