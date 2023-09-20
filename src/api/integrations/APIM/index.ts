import axios from 'axios';
import dotenv from 'dotenv';
import { EXTERNAL_API_ENDPOINTS } from '../../constants';
import { GetApimCisCountriesResponse } from '../../types';

dotenv.config();

const { APIM_MDM_URL, APIM_MDM_KEY, APIM_MDM_VALUE } = process.env;
const { APIM_MDM } = EXTERNAL_API_ENDPOINTS;

const url = `${APIM_MDM_URL}${APIM_MDM.MARKETS}`;

/**
 * APIM
 * Calls to APIM:
 * - CIS countries
 * @returns {GetApimCisCountriesResponse} GetApimCisCountriesResponse object
 */
const APIM = {
  getCisCountries: async (): Promise<GetApimCisCountriesResponse> => {
    try {
      console.info('Calling APIM - CIS countries');

      const response = await axios({
        method: 'get',
        url,
        headers: {
          'Content-Type': 'application/json',
          [String(APIM_MDM_KEY)]: APIM_MDM_VALUE,
        },
        validateStatus(status) {
          const acceptableStatus = [200];
          return acceptableStatus.includes(status);
        },
      });

      if (response.data && response.status === 200) {
        return {
          success: true,
          data: response.data,
        };
      }

      return {
        success: false,
      };
    } catch (err) {
      console.error('Error calling APIM - CIS countries %O', err);

      throw new Error(`Calling APIM - CIS countries ${err}`);
    }
  },
};

export default APIM;
