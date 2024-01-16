import { ApolloResponse } from '../../../../types';
import apollo from '../../../graphql/apollo';
import getApimCisCountries from '../../../graphql/queries/APIM/CIS-countries';
import getApimCurrencies from '../../../graphql/queries/APIM/currencies';

const APIM = {
  getCisCountries: async () => {
    try {
      const response = (await apollo('GET', getApimCisCountries, {})) as ApolloResponse;

      if (response.errors) {
        console.error('GraphQL network error querying APIM - CIS countries API %O', response.errors);
      }

      if (response?.networkError?.result?.errors) {
        console.error('GraphQL network error querying APIM - CIS countries API %O', response.networkError.result.errors);
      }

      if (response?.data?.getApimCisCountries) {
        return response.data.getApimCisCountries;
      }

      console.error('Error with GraphQL APIM - CIS countries API %O', response);
      throw new Error('Getting APIM - CIS countries API');
    } catch (err) {
      console.error('Error getting APIM - CIS countries API %O', err);
      throw new Error('Getting APIM - CIS countries API');
    }
  },
  getCurrencies: async (allCurrencies = false) => {
    try {
      const queryParams = {
        allCurrencies,
      };

      const response = (await apollo('GET', getApimCurrencies, queryParams)) as ApolloResponse;

      if (response.errors) {
        console.error('GraphQL network error querying APIM - currencies API %O', response.errors);
      }

      if (response?.networkError?.result?.errors) {
        console.error('GraphQL network error querying APIM - currencies API %O', response.networkError.result.errors);
      }

      if (response?.data?.getApimCurrencies) {
        return response.data.getApimCurrencies;
      }

      console.error('Error with GraphQL APIM - currencies API %O', response);
      throw new Error('Getting APIM - currencies API');
    } catch (err) {
      console.error('Error getting APIM - currencies API %O', err);
      throw new Error('Getting APIM - currencies API');
    }
  },
};

export default APIM;
