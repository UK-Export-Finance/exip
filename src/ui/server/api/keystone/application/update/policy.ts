import apollo from '../../../../graphql/apollo';
import updateApplicationPolicyMutation from '../../../../graphql/mutations/update-application/policy';
import { ApolloResponse } from '../../../../../types';

/**
 * updatePolicy
 * Update an application's "policy"
 * @param {String} Policy ID
 * @param {Object} Policy update
 * @returns {Promise<Object>} Updated policy
 */
const updatePolicy = async (id: string, update: object) => {
  try {
    console.info('Updating application policy');

    const variables = {
      where: { id },
      data: update,
    };

    const response = (await apollo('POST', updateApplicationPolicyMutation, variables)) as ApolloResponse;

    if (response.errors) {
      console.error('GraphQL error updating application policy %O', response.errors);
    }

    if (response?.networkError?.result?.errors) {
      console.error('GraphQL network error updating application policy %O', response.networkError.result.errors);
    }

    if (response?.data?.updatePolicy) {
      return response.data.updatePolicy;
    }

    console.error('Error with GraphQL updateApplicationPolicyMutation %O', response);
    throw new Error('Updating application policy');
  } catch (err) {
    console.error('Error updating application policy %O', err);
    throw new Error('Updating application policy');
  }
};

export default updatePolicy;
