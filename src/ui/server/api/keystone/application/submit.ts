import apollo from '../../../graphql/apollo';
import submitApplicationMutation from '../../../graphql/mutations/submit-application';
import { ApolloResponse } from '../../../../types';

/**
 * submitApplication
 * Submit an application
 * @param {String} Application ID
 * @returns {Object} Submitted application
 */
const submitApplication = async (applicationId: string) => {
  try {
    console.info(`Submitting application ${applicationId}`);

    const variables = { applicationId };

    const response = (await apollo('POST', submitApplicationMutation, variables)) as ApolloResponse;

    if (response.errors) {
      console.error('GraphQL error submitting application %O', response.errors);
    }

    if (response?.networkError?.result?.errors) {
      console.error('GraphQL network error submitting application %O', response.networkError.result.errors);
    }

    if (response?.data?.submitApplication) {
      return response.data.submitApplication;
    }

    console.error('Error with GraphQL submitApplicationMutation %O', response);
    throw new Error(`Submitting application ${applicationId}`);
  } catch (err) {
    console.error('Error submitting application %O', err);
    throw new Error(`Submitting application ${applicationId}`);
  }
};

export default submitApplication;
