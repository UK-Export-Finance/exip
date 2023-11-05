import apollo from '../../../../graphql/apollo';
import getDeclarationHowDataWillBeUsedQuery from '../../../../graphql/queries/declarations/how-data-will-be-used';
import { isPopulatedArray } from '../../../../helpers/array';
import { ApolloResponse } from '../../../../../types';

/**
 * getLatestHowDataWillBeUsed
 * Get the latest "how data will be used" declaration content
 * @returns {Object} Latest "how data will be used" declaration content
 */
const getLatestHowDataWillBeUsed = async () => {
  try {
    console.info('Getting latest declaration - how data will be used');

    const response = (await apollo('POST', getDeclarationHowDataWillBeUsedQuery, {})) as ApolloResponse;

    if (response.errors) {
      console.error('GraphQL error getting latest declaration - how data will be used %O', response.errors);
    }

    if (response?.networkError?.result?.errors) {
      console.error('GraphQL network error getting latest declaration - how data will be used %O', response.networkError.result.errors);
    }

    if (response?.data?.declarationHowDataWillBeUseds && isPopulatedArray(response.data.declarationHowDataWillBeUseds)) {
      return response.data.declarationHowDataWillBeUseds[0];
    }

    console.error('Error with GraphQL getDeclarationHowDataWillBeUsedQuery %O', response);
    throw new Error('Getting latest declaration - how data will be used');
  } catch (err) {
    console.error('Error getting latest declaration - how data will be used %O', err);
    throw new Error('Getting latest declaration - how data will be used');
  }
};

export default getLatestHowDataWillBeUsed;
