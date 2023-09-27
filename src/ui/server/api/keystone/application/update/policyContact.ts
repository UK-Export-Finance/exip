import apollo from '../../../../graphql/apollo';
import updateApplicationPolicyContactMutation from '../../../../graphql/mutations/update-application/policy-contact';
import { ApolloResponse } from '../../../../../types';

/**
 * updatePolicy
 * Update an application's "policy"
 * @param {String} Policy ID
 * @param {Object} Policy update
 * @returns {Object} Updated policy
 */
const updatePolicy = async (id: string, update: object) => {
  try {
    console.info('Updating application policyContact');

    const variables = {
      where: { id },
      data: update,
    };

    const response = (await apollo('POST', updateApplicationPolicyContactMutation, variables)) as ApolloResponse;

    if (response.errors) {
      console.error('GraphQL error updating application policyContact %O', response.errors);
    }

    if (response?.networkError?.result?.errors) {
      console.error('GraphQL network error updating application policyContact %O', response.networkError.result.errors);
    }

    if (response?.data?.updatePolicyContact) {
      return response.data.updatePolicyContact;
    }

    console.error('Error with GraphQL updateApplicationPolicyContactMutation %O', response);
    throw new Error('Updating application policy');
  } catch (err) {
    console.error('Error updating application policy contact %O', err);
    throw new Error('Updating application policy contact');
  }
};

export default updatePolicy;
