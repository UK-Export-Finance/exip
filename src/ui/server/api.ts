import dotenv from 'dotenv';
import axios, { AxiosResponse, AxiosRequestConfig } from 'axios';

dotenv.config();

const headers = {
  'Content-Type': 'application/json',
  [String(process.env.APIM_MDM_KEY)]: process.env.APIM_MDM_VALUE,
};

const getCountries = async () => {
  try {
    const config: AxiosRequestConfig = {
      method: 'GET',
      url: `${process.env.APIM_MDM_URL}/markets`,
      headers,
    };

    const response: AxiosResponse = await axios(config);

    return response.data;
  } catch (err) {
    console.error('Unable to fetch CIS countries', err);
    return err;
  }
};

const getCurrencies = async () => {
  try {
    const config: AxiosRequestConfig = {
      method: 'GET',
      url: `${process.env.APIM_MDM_URL}/currencies`,
      headers,
    };

    const response: AxiosResponse = await axios(config);

    return response.data;
  } catch (err) {
    console.error('Unable to fetch MDM-EA currencies', err);
    return err;
  }
};

const api = {
  getCountries,
  getCurrencies,
};

export default api;
