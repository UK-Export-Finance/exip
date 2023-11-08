import apollo from '../../../graphql/apollo';
import createAnApplicationMutation from '../../../graphql/mutations/create-an-application';
import { ApolloResponse, SubmittedDataInsuranceEligibility } from '../../../../types';

/**
 * createApplication
 * 1) Extract company object from eligibility answers
 * 2) Construct variables object with separate eligibilityAnswers and company object.
 * 3) Call the GraphQL API with constructed variables.
 * 4) Return the created application or error.
 * @param {Object} eligibilityAnswers: Answers submitted from the eligibility forms.
 * @param {String} accountId: Account ID for the application owner
 * @returns {Object} Created application
 */
const createApplication = async (eligibilityAnswers: SubmittedDataInsuranceEligibility, accountId: string) => {
  try {
    console.info('Creating application');

    const { company, ...otherAnswers } = eligibilityAnswers;

    const variables = {
      accountId,
      eligibilityAnswers: otherAnswers,
      company,
    };

    const response = (await apollo('POST', createAnApplicationMutation, variables)) as ApolloResponse;

    if (response.errors) {
      console.error('GraphQL error creating application %O', response.errors);
    }

    if (response?.networkError?.result?.errors) {
      console.error('GraphQL network error creating application %O', response.networkError.result.errors);
    }

    if (response?.data?.createAnApplication?.success) {
      return response.data.createAnApplication;
    }

    console.error('Error with GraphQL createApplicationMutation %O', response);
    throw new Error('Creating application');
  } catch (err) {
    console.error('Error creating application %O', err);
    throw new Error('Creating application');
  }
};

export default createApplication;
