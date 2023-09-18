import { ApolloResponse } from '../../../../types';
import apollo from '../../../graphql/apollo';
import getApimCisCountries from '../../../graphql/queries/APIM/CIS-countries';

const APIM = {
  getCisCountries: async () => {
    try {
      const response = (await apollo('GET', getApimCisCountries, {})) as ApolloResponse;

      if (response.errors) {
        console.error('GraphQL network error querying NEW API CALL %O', response.errors);
      }

      if (response?.networkError?.result?.errors) {
        console.error('GraphQL network error querying NEW API CALL %O', response.networkError.result.errors);
      }

      if (response?.data?.getApimCisCountries) {
        return response.data.getApimCisCountries;
      }

      console.error('Error with GraphQL NEW API CALL %O', response);
      throw new Error('Getting NEW API CALL');
    } catch (err) {
      console.error('Error getting NEW API CALL %O', err);
      throw new Error('Getting NEW API CALL');
    }
  },
};

export default APIM;
