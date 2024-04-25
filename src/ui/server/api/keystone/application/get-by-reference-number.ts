import apollo from '../../../graphql/apollo';
import applicationByReferenceNumberQuery from '../../../graphql/queries/application-by-reference-number';
import { ApolloResponse, ApplicationByReferenceNumberVariables } from '../../../../types';

/**
 * getApplicationByReferenceNumber
 * gets an application by reference number - decrypted if flag is set
 * @param {ApplicationByReferenceNumberVariables} variables
 * @returns {Application} encrypted/decrypted application
 */
const getApplicationByReferenceNumber = async (variables: ApplicationByReferenceNumberVariables) => {
  try {
    console.info('Getting application by referenceNumber: %s', variables.referenceNumber);

    const response = (await apollo('GET', applicationByReferenceNumberQuery, variables)) as ApolloResponse;

    if (response.errors) {
      console.error('GraphQL error getting application by referenceNumber %O', response.errors);
    }

    if (response?.networkError?.result?.errors) {
      console.error('GraphQL network error getting application by referenceNumber %O', response.networkError.result.errors);
    }

    if (response?.data?.getApplicationByReferenceNumber?.success && response?.data?.getApplicationByReferenceNumber?.application) {
      const { application } = response.data.getApplicationByReferenceNumber;

      return application;
    }

    console.error('Error with GraphQL applicationByReferenceNumberQuery %O', response);
    throw new Error('Getting application by referenceNumber');
  } catch (err) {
    console.error('Error getting application by referenceNumber %O', err);
    throw new Error('Getting application by referenceNumber');
  }
};

export default getApplicationByReferenceNumber;
