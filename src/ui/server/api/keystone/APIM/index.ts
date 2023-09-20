import { ApolloResponse } from '../../../../types';
import apollo from '../../../graphql/apollo';
import getApimCisCountries from '../../../graphql/queries/APIM/CIS-countries';

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
};

export default APIM;
