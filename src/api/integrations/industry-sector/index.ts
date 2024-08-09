import axios from 'axios';
import dotenv from 'dotenv';
import { EXTERNAL_API_ENDPOINTS } from '../../constants';

dotenv.config();

const { APIM_MDM_URL, APIM_MDM_KEY, APIM_MDM_VALUE } = process.env;

const { APIM_MDM } = EXTERNAL_API_ENDPOINTS;

const headers = {
  'Content-Type': 'application/json',
  [String(APIM_MDM_KEY)]: APIM_MDM_VALUE,
};

/**
 * industrySectorNames
 * get
 * @returns {Object} Object with success flag array with all industry sectors
 */
const industrySectorNames = {
  get: async () => {
    try {
      console.info('Calling industry sector API');

      const response = await axios({
        method: 'get',
        url: `${APIM_MDM_URL}${APIM_MDM.INDUSTRY_SECTORS}`,
        headers,
        validateStatus(status) {
          const acceptableStatus = [200, 404];
          return acceptableStatus.includes(status);
        },
      });

      // if no data in response or status is not 200 then return an empty object
      if (!response.data || response.status !== 200) {
        return {
          success: false,
        };
      }

      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      console.error('Error calling industry sector API %O', error);

      return {
        success: false,
        apiError: true,
      };
    }
  },
};

export default industrySectorNames;
