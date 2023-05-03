import dotenv from 'dotenv';
import axios, { AxiosResponse, RawAxiosRequestConfig } from 'axios';
import { EXTERNAL_API_ENDPOINTS } from '../../constants';

dotenv.config();

const { MULESOFT_MDM_EA } = EXTERNAL_API_ENDPOINTS;
const headers = {
  'Content-Type': 'application/json',
  [process.env.APIM_MDM_KEY]: process.env.APIM_MDM_VALUE,
};

const external = {
  getCountries: async () => {
    try {
      const config: RawAxiosRequestConfig = {
        method: 'GET',
        url: `${process.env.APIM_MDM_URL}${MULESOFT_MDM_EA.MARKETS}`,
        headers,
      };

      const response: AxiosResponse = await axios(config);

      return response.data;
    } catch (err) {
      console.error(err);
      throw new Error(`Getting CIS countries ${err}`);
    }
  },
  getCurrencies: async () => {
    try {
      const config: RawAxiosRequestConfig = {
        method: 'GET',
        url: `${process.env.APIM_MDM_URL}${MULESOFT_MDM_EA.CURRENCY}`,
        headers,
      };

      const response: AxiosResponse = await axios(config);

      return response.data;
    } catch (err) {
      console.error(err);
      throw new Error(`Getting MDM-EA currencies ${err}`);
    }
  },
};

export default external;
