import axios from 'axios';
import dotenv from 'dotenv';
import { OrdnanceSurveyAPIResponse } from '../../types';
import { ORDNANCE_SURVEY_QUERY_URL } from '../../constants';

dotenv.config();

const ordnanceSurveyBaseUrl = process.env.ORDNANCE_SURVEY_API_URL;
const ordnanceSurveyApiKey = process.env.ORDNANCE_SURVEY_API_KEY;

/**
 * ordnanceSurvey
 * makes ordnance survey API call and returns address
 * @param {String} postcode
 * @returns {OrdanceSurveyAPIResponse} OrdanceSurveyAPIResponse object
 */
const ordnanceSurvey = {
  get: async (postcode: string): Promise<OrdnanceSurveyAPIResponse> => {
    try {
      const response = await axios({
        method: 'get',
        url: `${ordnanceSurveyBaseUrl}/${ORDNANCE_SURVEY_QUERY_URL}${postcode}&key=${ordnanceSurveyApiKey}`,
        validateStatus(status) {
          const acceptableStatus = [200, 404];
          return acceptableStatus.includes(status);
        },
      });

      // if no data in response or status is not 200 then return success as false
      if (!response.data || response.status !== 200) {
        return {
          success: false,
        };
      }

      return {
        success: true,
        data: response.data.results,
      };
    } catch (err) {
      console.error('Error calling Ordnance Survey API %O', err);

      throw new Error(`Calling Ordnance Survey API. Unable to search for address ${err}`);
    }
  },
};

export default ordnanceSurvey;
