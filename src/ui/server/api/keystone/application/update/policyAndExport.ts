import apollo from '../../../../graphql/apollo';
import updateApplicationPolicyAndExportMutation from '../../../../graphql/mutations/update-application/policy-and-export';
import { ApolloResponse } from '../../../../../types';

/**
 * updatePolicyAndExport
 * Update an application's "policy and export"
 * @param {String} Policy and export ID
 * @param {Object} Policy and export update
 * @returns {Object} Updated policy and export
 */
const updatePolicyAndExport = async (id: string, update: object) => {
  try {
    console.info('Updating application policy and export');

    const variables = {
      where: { id },
      data: update,
    };

    const response = (await apollo('POST', updateApplicationPolicyAndExportMutation, variables)) as ApolloResponse;

    if (response.errors) {
      console.error('GraphQL error updating application policy and export %O', response.errors);
    }

    if (response?.networkError?.result?.errors) {
      console.error('GraphQL network error updating application policy and export %O', response.networkError.result.errors);
    }

    if (response?.data?.updatePolicyAndExport) {
      return response.data.updatePolicyAndExport;
    }

    console.error('Error with GraphQL updateApplicationPolicyAndExportMutation %O', response);
    throw new Error('Updating application policy and export');
  } catch (err) {
    console.error('Error updating application policy and export %O', err);
    throw new Error('Updating application policy and export');
  }
};

export default updatePolicyAndExport;
