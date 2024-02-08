import apollo from '../../../../graphql/apollo';
import updateBuyerRelationshipMutation from '../../../../graphql/mutations/update-application/buyerRelationship';
import { ApolloResponse } from '../../../../../types';

/**
 * updateBuyer
 * Update an application's "buyerRelationship"
 * @param {String} buyerRelationship ID
 * @param {Object} buyerRelationship update
 * @returns {Object} Updated buyerRelationship
 */
const updateBuyerRelationship = async (id: string, update: object) => {
  try {
    console.info('Updating buyer relationship');

    const variables = {
      where: { id },
      data: update,
    };

    const response = (await apollo('POST', updateBuyerRelationshipMutation, variables)) as ApolloResponse;

    if (response.errors) {
      console.error('GraphQL error updating buyer relationship %O', response.errors);
    }

    if (response?.networkError?.result?.errors) {
      console.error('GraphQL network error updating buyer relationship %O', response.networkError.result.errors);
    }

    if (response?.data?.updateBuyerRelationship) {
      return response.data.updateBuyerRelationship;
    }

    console.error('Error with GraphQL updateBuyerRelationshipMutation %O', response);
    throw new Error('Updating buyer relationship');
  } catch (err) {
    console.error('Error updating application buyer relationship %O', err);
    throw new Error('Updating buyer relationship');
  }
};

export default updateBuyerRelationship;
