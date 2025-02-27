import axios from 'axios';
import dotenv from 'dotenv';
import { OrdnanceSurveyAPIResponse } from '../../types';
import { ORDNANCE_SURVEY_QUERY_URL } from '../../constants';

dotenv.config();

const { ORDNANCE_SURVEY_API_KEY, ORDNANCE_SURVEY_API_URL } = process.env;

/**
 * ordnanceSurvey
 * makes Ordnance Survey API call and returns address
 * @param {String} postcode
 * @returns {OrdnanceSurveyAPIResponse} OrdnanceSurveyAPIResponse object
 */
const ordnanceSurvey = {
  get: async (postcode: string): Promise<OrdnanceSurveyAPIResponse> => {
    try {
      const response = await axios({
        method: 'get',
        url: `${ORDNANCE_SURVEY_API_URL}${ORDNANCE_SURVEY_QUERY_URL}${postcode}&key=${ORDNANCE_SURVEY_API_KEY}`,
        validateStatus(status) {
          const acceptableStatus = [200, 404];
          return acceptableStatus.includes(status);
        },
      });

      if (!response?.data?.results || response.status !== 200) {
        return {
          success: false,
        };
      }

      return {
        success: true,
        data: response.data.results,
      };
    } catch (error) {
      console.error('Error calling Ordnance Survey API %o', error);

      throw new Error(`Calling Ordnance Survey API. Unable to search for address ${error}`);
    }
  },
};

export default ordnanceSurvey;
