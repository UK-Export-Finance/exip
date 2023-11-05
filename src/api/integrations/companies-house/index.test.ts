import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import companiesHouse from '.';
import mockCompany from '../../test-mocks/mock-company';

const companiesHouseURL = process.env.COMPANIES_HOUSE_API_URL;

const { companyNumber } = mockCompany;

describe('integrations/companies-house', () => {
  describe('when a 200 status and data is returned', () => {
    test('it should return success=true and data', async () => {
      const mock = new MockAdapter(axios);

      const mockResponse = mockCompany;

      mock.onGet(`${companiesHouseURL}/company/${companyNumber}`).reply(200, mockResponse);

      const result = await companiesHouse.get(companyNumber);

      const expected = {
        success: true,
        data: mockResponse,
      };

      expect(result).toEqual(expected);
    });
  });

  describe('when no data is returned', () => {
    test('it should return success=false', async () => {
      const mock = new MockAdapter(axios);

      mock.onGet(`${companiesHouseURL}/company/${companyNumber}`).reply(200);

      const result = await companiesHouse.get(companyNumber);

      const expected = {
        success: false,
      };

      expect(result).toEqual(expected);
    });
  });

  describe('when a 200 status is not returned', () => {
    test('it should throw an error', async () => {
      const mock = new MockAdapter(axios);

      mock.onGet(`${companiesHouseURL}/company/${companyNumber}`).reply(500);

      try {
        await companiesHouse.get(companyNumber);
      } catch (err) {
        const expectedError = 'Calling Companies House API. Unable to search for company Error: Request failed with status code 500';

        const expected = new Error(expectedError);

        expect(err).toEqual(expected);
      }
    });
  });
});
