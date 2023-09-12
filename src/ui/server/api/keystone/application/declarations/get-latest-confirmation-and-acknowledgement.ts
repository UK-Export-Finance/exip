import apollo from '../../../../graphql/apollo';
import getDeclarationConfirmationAndAcknowledgementQuery from '../../../../graphql/queries/declarations/confirmation-and-acknowledgement';
import { isPopulatedArray } from '../../../../helpers/array';
import { ApolloResponse } from '../../../../../types';

/**
 * getLatestConfirmationAndAcknowledgement
 * Get the latest "confirmation and acknowledgement" declaration content
 * @returns {Object} Latest "confirmation and acknowledgement" declaration content
 */
const getLatestConfirmationAndAcknowledgement = async () => {
  try {
    console.info('Getting latest declaration - confirmation and acknowledgement');

    const response = (await apollo('POST', getDeclarationConfirmationAndAcknowledgementQuery, {})) as ApolloResponse;

    if (response.errors) {
      console.error('GraphQL error getting latest declaration - confirmation and acknowledgement %O', response.errors);
    }

    if (response?.networkError?.result?.errors) {
      console.error('GraphQL network error getting latest declaration - confirmation and acknowledgement %O', response.networkError.result.errors);
    }

    if (response?.data?.declarationConfirmationAndAcknowledgements && isPopulatedArray(response.data.declarationConfirmationAndAcknowledgements)) {
      return response.data.declarationConfirmationAndAcknowledgements[0];
    }

    console.error('Error with GraphQL getDeclarationConfirmationAndAcknowledgementQuery %O', response);
    throw new Error('Getting latest declaration - confirmation and acknowledgement');
  } catch (err) {
    console.error('Error getting latest declaration - confirmation and acknowledgement %O', err);
    throw new Error('Getting latest declaration - confirmation and acknowledgement');
  }
};

export default getLatestConfirmationAndAcknowledgement;
