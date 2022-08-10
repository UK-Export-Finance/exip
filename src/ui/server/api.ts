import axios, { AxiosBasicCredentials, AxiosResponse, AxiosRequestConfig } from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const getCountries = async () => {
  try {
    const config: AxiosRequestConfig = {
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
    console.error('Unable to fetch CIS countries', err);
    return err;
  }
};

const getCurrencies = async () => {
  try {
    const config: AxiosRequestConfig = {
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
    console.error('Unable to fetch MDM-EA currencies', err);
    return err;
  }
};

const api = {
  getCountries,
  getCurrencies,
};

export default api;
