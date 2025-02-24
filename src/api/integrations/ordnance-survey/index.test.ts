import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import mockOrdnanceSurveyResponse from '../../test-mocks/mock-ordnance-survey-response';
import { MOCK_OS_ADDRESS_INPUT } from '../../test-mocks/mock-os-address-input';
import ordnanceSurvey from '.';
import { ORDNANCE_SURVEY_QUERY_URL } from '../../constants';

const { ORDNANCE_SURVEY_API_KEY, ORDNANCE_SURVEY_API_URL } = process.env;

describe('integrations/ordnance-survey', () => {
  const { postcode } = MOCK_OS_ADDRESS_INPUT;
  const url = `${ORDNANCE_SURVEY_API_URL}${ORDNANCE_SURVEY_QUERY_URL}${postcode}&key=${ORDNANCE_SURVEY_API_KEY}`;

  describe('when a successful request is made', () => {
    it('should return success=true and data', async () => {
      const mock = new MockAdapter(axios);

      const mockResponse = mockOrdnanceSurveyResponse;

      mock.onGet(url).reply(200, mockResponse);

      const result = await ordnanceSurvey.get(postcode);

      const expected = {
        success: true,
        data: mockResponse.results,
        status: 200,
      };

      expect(result).toEqual(expected);
    });
  });

  describe('when no data is returned', () => {
    it('should return success=false', async () => {
      const mock = new MockAdapter(axios);

      mock.onGet(url).reply(200);

      const result = await ordnanceSurvey.get(postcode);

      const expected = {
        success: false,
        status: 200,
      };

      expect(result).toEqual(expected);
    });
  });

  describe('when response.data.results does not exist', () => {
    it('should return success=false', async () => {
      const mock = new MockAdapter(axios);

      mock.onGet(url).reply(200, {});

      const result = await ordnanceSurvey.get(postcode);

      const expected = {
        success: false,
        status: 200,
      };

      expect(result).toEqual(expected);
    });
  });

  describe('when a status code of 400 is returned', () => {
    it('should return success=false', async () => {
      const mock = new MockAdapter(axios);

      mock.onGet(url).reply(400, {});

      const result = await ordnanceSurvey.get(postcode);

      const expected = {
        success: false,
        status: 400,
      };

      expect(result).toEqual(expected);
    });
  });

  describe('when a 200 status is not returned', () => {
    it('should throw an error', async () => {
      const mock = new MockAdapter(axios);

      mock.onGet(url).reply(500);

      try {
        await ordnanceSurvey.get(postcode);
      } catch (error) {
        const expectedError = 'Calling Ordnance Survey API. Unable to search for address Error: Request failed with status code 500';

        const expected = new Error(expectedError);

        expect(error).toEqual(expected);
      }
    });
  });
});
