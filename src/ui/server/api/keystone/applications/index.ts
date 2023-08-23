import { ApolloResponse } from '../../../../types';
import apollo from '../../../graphql/apollo';
import getApplicationsQuery from '../../../graphql/queries/applications';
import { MAX_APPLICATIONS_PER_PAGE } from '../../../constants';

const applications = {
  getAll: async (accountId: string, skip: number) => {
    try {
      console.info('Getting all applications');

      const variables = {
        accountId,
        take: MAX_APPLICATIONS_PER_PAGE,
        skip,
      };

      const response = (await apollo('GET', getApplicationsQuery, variables)) as ApolloResponse;

      if (response.errors) {
        console.error('GraphQL error getting all applications %O', response.errors);
      }

      if (response?.networkError?.result?.errors) {
        console.error('GraphQL network error getting all applications %O', response.networkError.result.errors);
      }

      if (response?.data?.applications) {
        const { applications: applicationsData, applicationsCount } = response.data;

        const mappedResponse = {
          applications: applicationsData,
          totalApplications: applicationsCount,
        };

        return mappedResponse;
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
