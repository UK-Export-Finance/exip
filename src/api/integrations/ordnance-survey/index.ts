import axios from 'axios';
import dotenv from 'dotenv';
import { OrdnanceSurveyAPIResponse } from '../../types';
import { ORDNANCE_SURVEY_QUERY_URL } from '../../constants';

dotenv.config();

const { ORDNANCE_SURVEY_API_KEY, ORDNANCE_SURVEY_API_URL } = process.env;

/**
 * ordnanceSurvey
 * makes Ordnance Survey API call and returns address
 * @param {string} postcode
 * @returns {OrdnanceSurveyAPIResponse} OrdnanceSurveyAPIResponse object
 */
const ordnanceSurvey = {
  get: async (postcode: string): Promise<OrdnanceSurveyAPIResponse> => {
    try {
      /**
       * 400 is on list of accepted status due to OS validation
       * OS has very thorough validation for postcodes
       * if a postcode fails their validation, it returns 400
       * so 400 is handled as an accepted status
       */
      const acceptableStatuses = [200, 400, 404];

      const response = await axios({
        method: 'get',
        url: `${ORDNANCE_SURVEY_API_URL}${ORDNANCE_SURVEY_QUERY_URL}${postcode}&key=${ORDNANCE_SURVEY_API_KEY}`,
        validateStatus(status) {
          return acceptableStatuses.includes(status);
        },
      });

      if (!response.data?.results || !acceptableStatuses.includes(response.status)) {
        return {
          success: false,
          status: response.status,
        };
      }

      return {
        success: true,
        data: response.data.results,
        status: response.status,
      };
    } catch (error) {
      console.error('Error calling Ordnance Survey API %o', error);

      throw new Error(`Calling Ordnance Survey API. Unable to search for address ${error}`);
    }
  },
};

export default ordnanceSurvey;
