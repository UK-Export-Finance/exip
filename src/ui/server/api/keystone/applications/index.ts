import { ApolloResponse } from '../../../../types';
import apollo from '../../../graphql/apollo';
import getApplicationsQuery from '../../../graphql/queries/applications';

const applications = {
  getAll: async () => {
    try {
      console.info('Getting all applications');

      const response = (await apollo('GET', getApplicationsQuery, {})) as ApolloResponse;

      if (response.errors) {
        console.error('GraphQL error getting all applications ', response.errors);
      }

      if (response?.networkError?.result?.errors) {
        console.error('GraphQL network error getting all applications ', response.networkError.result.errors);
      }

      if (response?.data?.applications) {
        return response.data.applications;
      }

      console.error(response);
      throw new Error('Getting applications');
    } catch (err) {
      console.error(err);
      throw new Error('Getting all applications');
    }
  },
};

export default applications;
