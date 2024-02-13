import apollo from '../../../../graphql/apollo';
import updateApplicationJointlyInsuredPartyMutation from '../../../../graphql/mutations/update-application/jointly-insured-party';
import { ApolloResponse } from '../../../../../types';

/**
 * updateJointlyInsuredParty
 * Update an application's "jointly insured party"
 * @param {String} Jointly insured party ID
 * @param {Object} Jointly insured party update
 * @returns {Object} Updated jointly insured party
 */
const updateJointlyInsuredParty = async (id: string, update: object) => {
  try {
    console.info('Updating application jointly insured party');

    const variables = {
      where: { id },
      data: update,
    };

    const response = (await apollo('POST', updateApplicationJointlyInsuredPartyMutation, variables)) as ApolloResponse;

    if (response.errors) {
      console.error('GraphQL error updating application jointly insured party %O', response.errors);
    }

    if (response?.networkError?.result?.errors) {
      console.error('GraphQL network error updating application jointly insured party %O', response.networkError.result.errors);
    }

    if (response?.data?.updateJointlyInsuredParty) {
      return response.data.updateJointlyInsuredParty;
    }

    console.error('Error with GraphQL updateApplicationJointlyInsuredPartyMutation %O', response);
    throw new Error('Updating application jointly insured party');
  } catch (err) {
    console.error('Error updating application jointly insured party %O', err);
    throw new Error('Updating application jointly insured party');
  }
};

export default updateJointlyInsuredParty;
