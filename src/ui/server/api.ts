import { ApolloError } from 'apollo-client';
import axios, { AxiosBasicCredentials, AxiosResponse, AxiosRequestConfig } from 'axios';
import dotenv from 'dotenv';
import { ApolloResponse, SubmittedDataInsuranceEligibility } from '../types';
import apollo from './graphql/apollo';
import createApplicationMutation from './graphql/mutations/create-application';
import getApplicationQuery from './graphql/queries/application';
import updateEligibilityMutation from './graphql/mutations/update-eligibility';
import getCountriesByIsoCodeQuery from './graphql/queries/countries-by-iso-code';
import pageQuery from './graphql/queries/page';

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

const keystone = () => {
  const createEmptyApplication = async () => {
    try {
      console.info('Creating empty application');

      const response = (await apollo('POST', createApplicationMutation, {})) as ApolloResponse;

      if (response.errors) {
        console.error('GraphQL error creating empty application ', response.errors);
      }

      if (response?.networkError?.result?.errors) {
        console.error('GraphQL network error creating empty application ', response.networkError.result.errors);
      }

      if (response?.data?.createApplication) {
        return response.data.createApplication;
      }

      if (response instanceof ApolloError) {
        throw new Error('Creating empty application');
      }
    } catch {
      throw new Error('Creating empty application');
    }
  };

  const getCountry = async (isoCode: string) => {
    try {
      console.info('Getting country');

      const variables = { isoCode };

      const response = (await apollo('POST', getCountriesByIsoCodeQuery, variables)) as ApolloResponse;

      if (response.errors) {
        console.error('GraphQL error getting country ', response.errors);
      }

      if (response?.networkError?.result?.errors) {
        console.error('GraphQL network error getting country ', response.networkError.result.errors);
      }

      if (response?.data?.countries) {
        return response.data.countries[0];
      }

      if (response instanceof ApolloError) {
        throw new Error('Getting country');
      }
    } catch {
      throw new Error('Getting country');
    }
  };

  const updateEligibility = async (eligibilityId: string, eligibilityAnswers: object) => {
    try {
      console.info('Updating eligibility');

      const variables = {
        where: {
          id: eligibilityId,
        },
        data: eligibilityAnswers,
      };

      const response = (await apollo('POST', updateEligibilityMutation, variables)) as ApolloResponse;

      if (response.errors) {
        console.error('GraphQL error updating eligibility ', response.errors);
      }

      if (response?.networkError?.result?.errors) {
        console.error('GraphQL network error updating eligibility ', response.networkError.result.errors);
      }

      if (response?.data?.updateEligibility) {
        return response.data.updateEligibility;
      }

      if (response instanceof ApolloError) {
        throw new Error('Updating eligibility');
      }
    } catch (err) {
      throw new Error(`Updating eligibility ${err}`);
    }
  };

  const createApplication = async (eligibilityAnswers: SubmittedDataInsuranceEligibility) => {
    try {
      console.info('Creating application with relationships');

      const buyerCountryIsoCode = eligibilityAnswers.buyerCountry?.isoCode;

      if (buyerCountryIsoCode) {
        const newApplication = await createEmptyApplication();

        const { id: eligibilityId } = newApplication.eligibility;

        const buyerCountry = await getCountry(buyerCountryIsoCode);

        await updateEligibility(eligibilityId, {
          ...eligibilityAnswers,
          buyerCountry: {
            connect: { id: buyerCountry.id },
          },
        });

        return newApplication;
      }
    } catch {
      throw new Error('Creating application with relationships');
    }
  };

  const getApplication = async (referenceNumber: number) => {
    try {
      console.info('Getting application');

      const response = (await apollo('GET', getApplicationQuery, { referenceNumber })) as ApolloResponse;

      if (response.errors) {
        console.error('GraphQL error getting application ', response.errors);
      }

      if (response?.networkError?.result?.errors) {
        console.error('GraphQL network error getting application ', response.networkError.result.errors);
      }

      if (response?.data?.referenceNumber && response?.data?.referenceNumber?.application) {
        const { data } = response;

        return {
          ...data.referenceNumber.application,
          referenceNumber: data.referenceNumber.id,
        };
      }

      throw new Error('Getting application');
    } catch (err) {
      throw new Error(`Getting application ${err}`);
    }
  };

  const getPage = async (pageId: string) => {
    try {
      console.info('Getting page data');

      const queryParams = {
        id: pageId,
      };

      const response = (await apollo('GET', pageQuery, queryParams)) as ApolloResponse;

      if (response.errors) {
        console.error('GraphQL error querying keystone page ', response.errors);
      }

      if (response?.networkError?.result?.errors) {
        console.error('GraphQL network error querying keystone page ', response.networkError.result.errors);
      }

      if (response?.data?.page) {
        return response.data.page;
      }

      throw new Error('Getting page data');
    } catch {
      throw new Error('Getting page data');
    }
  };

  return {
    createApplication,
    getApplication,
    getCountry,
    getPage,
  };
};

const api = {
  getCountries,
  getCurrencies,
  keystone: keystone(),
};

export default api;
