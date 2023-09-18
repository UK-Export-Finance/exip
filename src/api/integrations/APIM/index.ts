import axios from 'axios';
import dotenv from 'dotenv';
import { EXTERNAL_API_ENDPOINTS } from '../../constants';
import { GetApimCisCountriesResponse } from '../../types';

dotenv.config();

const { MULESOFT_MDM_EA } = EXTERNAL_API_ENDPOINTS;

const username = String(process.env.COMPANIES_HOUSE_API_KEY);
const url = `${process.env.APIM_MDM_URL}${MULESOFT_MDM_EA.MARKETS}`;

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
        auth: { username, password: '' },
        headers: {
          'Content-Type': 'application/json',
          [String(process.env.APIM_MDM_KEY)]: process.env.APIM_MDM_VALUE,
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
