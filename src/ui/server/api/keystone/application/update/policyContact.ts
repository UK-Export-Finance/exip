import apollo from '../../../../graphql/apollo';
import updateApplicationPolicyContactMutation from '../../../../graphql/mutations/update-application/policy-contact';
import { ApolloResponse } from '../../../../../types';

/**
 * updatePolicyContact
 * Update an application's policy contact
 * @param {string} PolicyContact ID
 * @param {object} PolicyContact update
 * @returns {Promise<object>} Updated policy contact
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
      console.error('GraphQL error updating application policyContact %o', response.errors);
    }

    if (response?.networkError?.result?.errors) {
      console.error('GraphQL network error updating application policyContact %o', response.networkError.result.errors);
    }

    if (response?.data?.updatePolicyContact) {
      return response.data.updatePolicyContact;
    }

    console.error('Error with GraphQL updateApplicationPolicyContactMutation %o', response);

    throw new Error('Updating application policyContact');
  } catch (error) {
    console.error('Error updating application policyContact %o', error);

    throw new Error('Updating application policyContact');
  }
};

export default updatePolicy;
