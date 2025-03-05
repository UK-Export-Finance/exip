import { ApolloResponse } from '../../../../types';
import apollo from '../../../graphql/apollo';
import getApimCisCountries from '../../../graphql/queries/APIM/CIS-countries';
import getApimCurrencies from '../../../graphql/queries/APIM/currencies';

const APIM = {
  getCisCountries: async () => {
    try {
      const response = (await apollo('GET', getApimCisCountries, {})) as ApolloResponse;

      if (response.errors) {
        console.error('GraphQL error querying APIM - CIS countries API %o', response.errors);
      }

      if (response?.networkError?.result?.errors) {
        console.error('GraphQL network error querying APIM - CIS countries API %o', response.networkError.result.errors);
      }

      if (response?.data?.getApimCisCountries) {
        return response.data.getApimCisCountries;
      }

      console.error('Error with GraphQL APIM - CIS countries API %o', response);

      throw new Error('Getting APIM - CIS countries API');
    } catch (error) {
      console.error('Error getting APIM - CIS countries API %o', error);

      throw new Error('Getting APIM - CIS countries API');
    }
  },
  getCurrencies: async () => {
    try {
      const response = (await apollo('GET', getApimCurrencies, {})) as ApolloResponse;

      if (response.errors) {
        console.error('GraphQL error querying APIM - currencies API %o', response.errors);
      }

      if (response?.networkError?.result?.errors) {
        console.error('GraphQL network error querying APIM - currencies API %o', response.networkError.result.errors);
      }

      if (response?.data?.getApimCurrencies) {
        return response.data.getApimCurrencies;
      }

      console.error('Error with GraphQL APIM - currencies API %o', response);

      throw new Error('Getting APIM - currencies API');
    } catch (error) {
      console.error('Error getting APIM - currencies API %o', error);

      throw new Error('Getting APIM - currencies API');
    }
  },
};

export default APIM;
