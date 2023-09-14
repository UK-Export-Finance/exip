import apollo from '../../../../graphql/apollo';
import updateBusinessContactMutation from '../../../../graphql/mutations/update-application/business-contact';
import { ApolloResponse } from '../../../../../types';

/**
 * updateBusinessContact
 * Update an application's "business contact"
 * @param {String} Business contact ID
 * @param {Object} Business contact update
 * @returns {Object} Updated business contact
 */
const updateBusinessContact = async (id: string, update: object) => {
  try {
    console.info('Updating application business contact');

    const variables = {
      where: { id },
      data: update,
    };

    const response = (await apollo('POST', updateBusinessContactMutation, variables)) as ApolloResponse;

    if (response.errors) {
      console.error('GraphQL error updating application business contact %O', response.errors);
    }

    if (response?.networkError?.result?.errors) {
      console.error('GraphQL network error updating application business contact %O', response.networkError.result.errors);
    }

    if (response?.data?.updateBusinessContactDetail) {
      return response.data.updateBusinessContactDetail;
    }

    console.error('Error with GraphQL updateBusinessContactMutation %O', response);
    throw new Error('Updating application business contact');
  } catch (err) {
    console.error('Error updating application business contact %O', err);
    throw new Error('Updating application business contact');
  }
};

export default updateBusinessContact;
