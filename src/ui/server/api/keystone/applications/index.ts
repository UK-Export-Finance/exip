import { ApolloResponse } from '../../../../types';
import apollo from '../../../graphql/apollo';
import getApplicationsQuery from '../../../graphql/queries/applications';

const applications = {
  getAll: async (accountId: string) => {
    try {
      console.info('Getting all applications');

      const variables = { accountId };

      const response = (await apollo('GET', getApplicationsQuery, variables)) as ApolloResponse;

      if (response.errors) {
        console.error('GraphQL error getting all applications %O', response.errors);
      }

      if (response?.networkError?.result?.errors) {
        console.error('GraphQL network error getting all applications %O', response.networkError.result.errors);
      }

      if (response?.data?.applications) {
        return response.data.applications;
      }

      console.error('Error with GraphQL getApplicationsQuery %O', response);
      throw new Error('Getting all applications');
    } catch (err) {
      console.error('Error getting all applications %O', err);
      throw new Error('Getting all applications');
    }
  },
};

export default applications;
