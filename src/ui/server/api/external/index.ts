import dotenv from 'dotenv';
import axios, { AxiosResponse, RawAxiosRequestConfig } from 'axios';

dotenv.config();

const headers = {
  'Content-Type': 'application/json',
  [String(process.env.APIM_MDM_KEY)]: process.env.APIM_MDM_VALUE,
};

const external = {
  getCurrencies: async () => {
    try {
      const config: RawAxiosRequestConfig = {
        method: 'GET',
        url: `${process.env.APIM_MDM_URL}/currencies`,
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
