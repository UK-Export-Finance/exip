import dotenv from 'dotenv';
import axios, { AxiosResponse, RawAxiosRequestConfig } from 'axios';
import { EXTERNAL_API_ENDPOINTS } from '../../constants/external-apis';

dotenv.config();

const { APIM_MDM } = EXTERNAL_API_ENDPOINTS;
const headers = {
  'Content-Type': 'application/json',
  [String(process.env.APIM_MDM_KEY)]: process.env.APIM_MDM_VALUE,
};

const external = {
  getCountries: async () => {
    try {
      const config: RawAxiosRequestConfig = {
        method: 'GET',
        url: `${process.env.APIM_MDM_URL}${APIM_MDM.MARKETS}`,
        headers,
      };

      const response: AxiosResponse = await axios(config);

      return response.data;
    } catch (err) {
      console.error('Error getting CIS countries %O', err);
      throw new Error(`Getting CIS countries ${err}`);
    }
  },
  getCurrencies: async () => {
    try {
      const config: RawAxiosRequestConfig = {
        method: 'GET',
        url: `${process.env.APIM_MDM_URL}/${APIM_MDM.CURRENCY}`,
        headers,
      };

      const response: AxiosResponse = await axios(config);

      return response.data;
    } catch (err) {
      console.error('Error getting MDM-EA currencies %O', err);
      throw new Error(`Getting MDM-EA currencies ${err}`);
    }
  },
};

export default external;
