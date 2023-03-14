import { ApolloResponse } from '../../../../types';
import apollo from '../../../graphql/apollo';
import getDeclarationConfidentialityQuery from '../../../graphql/queries/declarations/confidentiality';
import isPopulatedArray from '../../../helpers/is-populated-array';

const declarations = {
  getLatestConfidentiality: async () => {
    try {
      console.info('Getting latest declaration - confidentiality');

      const response = (await apollo('POST', getDeclarationConfidentialityQuery, {})) as ApolloResponse;

      if (response.errors) {
        console.error('GraphQL error getting latest declaration - confidentiality ', response.errors);
      }

      if (response?.networkError?.result?.errors) {
        console.error('GraphQL network error getting latest declaration - confidentiality ', response.networkError.result.errors);
      }

      if (response?.data?.declarationConfidentialities && isPopulatedArray(response.data.declarationConfidentialities)) {
        return response.data.declarationConfidentialities[0];
      }

      console.error(response);
      throw new Error('Getting latest declaration - confidentiality');
    } catch (err) {
      console.error(err);
      throw new Error('Getting latest declaration - confidentiality');
    }
  },
};

export default declarations;
