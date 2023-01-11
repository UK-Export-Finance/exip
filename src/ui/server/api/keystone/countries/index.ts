import { ApolloError } from 'apollo-client';
import apollo from '../../../graphql/apollo';
import { ApolloResponse } from '../../../../types';
import getCountries from '../../../graphql/queries/countries';
import getCountriesByIsoCodeQuery from '../../../graphql/queries/countries-by-iso-code';

const countries = {
  getAll: async () => {
    try {
      console.info('Getting countries');

      const response = (await apollo('POST', getCountries, {})) as ApolloResponse;

      if (response.errors) {
        console.error('GraphQL error getting countries ', response.errors);
      }

      if (response?.networkError?.result?.errors) {
        console.error('GraphQL network error getting countries ', response.networkError.result.errors);
      }

      if (response?.data?.countries) {
        return response.data.countries;
      }

      if (response instanceof ApolloError) {
        throw new Error('Getting countries');
      }
    } catch {
      throw new Error('Getting countries');
    }
  },
  get: async (isoCode: string) => {
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
  },
};

export default countries;
