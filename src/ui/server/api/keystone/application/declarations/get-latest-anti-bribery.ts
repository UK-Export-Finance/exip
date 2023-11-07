import apollo from '../../../../graphql/apollo';
import getDeclarationAntiBriberyQuery from '../../../../graphql/queries/declarations/anti-bribery';
import { isPopulatedArray } from '../../../../helpers/array';
import { ApolloResponse } from '../../../../../types';

/**
 * getLatestAntiBribery
 * Get the latest "anti bribery" declaration content
 * @returns {Object} Latest "anti bribery" declaration content
 */
const getLatestAntiBribery = async () => {
  try {
    console.info('Getting latest declaration - anti-bribery');

    const response = (await apollo('POST', getDeclarationAntiBriberyQuery, {})) as ApolloResponse;

    if (response.errors) {
      console.error('GraphQL error getting latest declaration - anti-bribery %O', response.errors);
    }

    if (response?.networkError?.result?.errors) {
      console.error('GraphQL network error getting latest declaration - anti-bribery %O', response.networkError.result.errors);
    }

    if (response?.data?.declarationAntiBriberies && isPopulatedArray(response.data.declarationAntiBriberies)) {
      return response.data.declarationAntiBriberies[0];
    }

    console.error('Error with GraphQL getDeclarationAntiBriberyQuery %O', response);
    throw new Error('Getting latest declaration - anti-bribery');
  } catch (err) {
    console.error('Error getting latest declaration - anti bribery %O', err);
    throw new Error('Getting latest declaration - anti-bribery');
  }
};

export default getLatestAntiBribery;
