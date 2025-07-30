import apollo from '../../../graphql/apollo';
import createAnApplicationMutation from '../../../graphql/mutations/create-an-application';
import { ApolloResponse, SubmittedDataInsuranceEligibility } from '../../../../types';

/**
 * createApplication
 * 1) Extract company object from eligibility answers
 * 2) Construct variables object with separate eligibilityAnswers, company object and sectionReview object.
 * 3) Call the GraphQL API with constructed variables.
 * 4) Return the created application or error.
 * @param {object} eligibilityAnswers: Answers submitted from the eligibility forms.
 * @param {string} accountId: Account ID for the application owner
 * @returns {object} Created application
 */
const createApplication = async (eligibilityAnswers: SubmittedDataInsuranceEligibility, accountId: string) => {
  try {
    console.info('Creating application for user %s', accountId);

    const { company, sectionReview, ...otherAnswers } = eligibilityAnswers;

    const variables = {
      accountId,
      eligibilityAnswers: otherAnswers,
      company,
      sectionReview,
    };

    const response = (await apollo('POST', createAnApplicationMutation, variables)) as ApolloResponse;

    if (response.errors) {
      console.error('GraphQL error creating application for user %s %o', accountId, response.errors);
    }

    if (response?.networkError?.result?.errors) {
      console.error('GraphQL network error creating application for user %s %o', accountId, response.networkError.result.errors);
    }

    if (response?.data?.createAnApplication?.success) {
      return response.data.createAnApplication;
    }

    console.error('Error with GraphQL createApplicationMutation for user %s %o', accountId, response);

    throw new Error(`Creating application for user ${accountId}`);
  } catch (error) {
    console.error('Error creating application for user %s %o', accountId, error);

    throw new Error(`Creating application for user ${accountId}`);
  }
};

export default createApplication;
