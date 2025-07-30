import apollo from '../../../../graphql/apollo';
import updateApplicationPolicyMutation from '../../../../graphql/mutations/update-application/policy';
import { ApolloResponse } from '../../../../../types';

/**
 * updatePolicy
 * Update an application's "policy"
 * @param {string} Policy ID
 * @param {object} Policy update
 * @returns {Promise<object>} Updated policy
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
      console.error('GraphQL error updating application policy %o', response.errors);
    }

    if (response?.networkError?.result?.errors) {
      console.error('GraphQL network error updating application policy %o', response.networkError.result.errors);
    }

    if (response?.data?.updatePolicy) {
      return response.data.updatePolicy;
    }

    console.error('Error with GraphQL updateApplicationPolicyMutation %o', response);

    throw new Error('Updating application policy');
  } catch (error) {
    console.error('Error updating application policy %o', error);

    throw new Error('Updating application policy');
  }
};

export default updatePolicy;
