import axios, { AxiosBasicCredentials, AxiosResponse, AxiosRequestConfig } from 'axios';
import dotenv from 'dotenv';
import { ApolloResponse } from '../types';
import apollo from './graphql/apollo';
import pageQuery from './graphql/queries/page';
import companiesHouseQuery from './graphql/queries/companiesHouse';

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

const keystone = {
  getPage: async (pageId: string) => {
    const queryParams = {
      id: pageId,
    };

    const query = pageQuery;
    const response = (await apollo('GET', query, queryParams)) as ApolloResponse;

    if (response.errors) {
      console.error('GraphQL error querying keystone page ', response.errors);
    }

    if (response?.networkError?.result?.errors) {
      console.error('GraphQL network error querying keystone page ', response.networkError.result.errors);
    }

    if (response?.data?.page) {
      return response.data.page;
    }

    return {};
  },
  getCompaniesHouseInformation: async (companiesHouseNumber: string) => {
    const queryParams = {
      companiesHouseNumber,
    };

    const query = companiesHouseQuery;
    const response = (await apollo('GET', query, queryParams)) as ApolloResponse;

    if (response.errors) {
      console.error('GraphQL error querying keystone page ', response.errors);
    }

    if (response?.networkError?.result?.errors) {
      console.error('GraphQL network error querying keystone page ', response.networkError.result.errors);
    }

    // response.data.getCompaniesHouseInformation should exist if successful
    if (response?.data?.getCompaniesHouseInformation) {
      return response.data?.getCompaniesHouseInformation;
    }

    return {};
  },
};

const api = {
  getCountries,
  getCurrencies,
  keystone,
};

export default api;
