import dotenv from 'dotenv';
import axios, { AxiosBasicCredentials, AxiosResponse, RawAxiosRequestConfig } from 'axios';

dotenv.config();

const external = {
  getCountries: async () => {
    try {
      const config: RawAxiosRequestConfig = {
        method: 'GET',
        url: process.env.MULESOFT_API_CIS_URL,
        headers: {
          'Content-Type': 'application/json',
        },
        auth: {
          username: process.env.MULESOFT_API_CIS_KEY,
          password: process.env.MULESOFT_API_CIS_SECRET,
        } as AxiosBasicCredentials,
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
        url: process.env.MULESOFT_API_MDM_EA_URL,
        headers: {
          'Content-Type': 'application/json',
        },
        auth: {
          username: process.env.MULESOFT_API_MDM_EA_KEY,
          password: process.env.MULESOFT_API_MDM_EA_SECRET,
        } as AxiosBasicCredentials,
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
