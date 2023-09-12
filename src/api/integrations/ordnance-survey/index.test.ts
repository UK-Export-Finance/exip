import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import mockOrdnanceSurveyResponse from '../../test-mocks/mock-ordnance-survey-response';
import ordnanceSurvey from '.';
import { ORDNANCE_SURVEY_QUERY_URL } from '../../constants';

const ordnanceSurveyBaseUrl = process.env.ORDNANCE_SURVEY_API_URL;
const ordnanceSurveyApiKey = process.env.ORDNANCE_SURVEY_API_KEY;

describe('integrations/ordnance-survey', () => {
  const postcode = 'SW1A2AA';

  describe('when a successful request is made', () => {
    test('it should return success=true and data', async () => {
      const mock = new MockAdapter(axios);

      const mockResponse = mockOrdnanceSurveyResponse;

      mock.onGet(`${ordnanceSurveyBaseUrl}/${ORDNANCE_SURVEY_QUERY_URL}${postcode}&key=${ordnanceSurveyApiKey}`).reply(200, mockResponse);

      const result = await ordnanceSurvey.get(postcode);

      const expected = {
        success: true,
        data: mockResponse.results,
      };

      expect(result).toEqual(expected);
    });
  });

  describe('when no data is returned', () => {
    test('it should return success=false', async () => {
      const mock = new MockAdapter(axios);

      mock.onGet(`${ordnanceSurveyBaseUrl}/${ORDNANCE_SURVEY_QUERY_URL}${postcode}&key=${ordnanceSurveyApiKey}`).reply(200);

      const result = await ordnanceSurvey.get(postcode);

      const expected = {
        success: false,
      };

      expect(result).toEqual(expected);
    });
  });

  describe('when a 200 status is not returned', () => {
    test('it should throw an error', async () => {
      const mock = new MockAdapter(axios);

      mock.onGet(`${ordnanceSurveyBaseUrl}/${ORDNANCE_SURVEY_QUERY_URL}${postcode}&key=${ordnanceSurveyApiKey}`).reply(500);

      try {
        await ordnanceSurvey.get(postcode);
      } catch (err) {
        const expectedError = 'Calling Ordnance Survey API. Unable to search for address Error: Request failed with status code 500';

        const expected = new Error(expectedError);

        expect(err).toEqual(expected);
      }
    });
  });
});
