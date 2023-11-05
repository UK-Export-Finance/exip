import { ApolloResponse } from '../../../../types';
import apollo from '../../../graphql/apollo';
import getApplicationsQuery from '../../../graphql/queries/applications';
import { MAX_APPLICATIONS_PER_PAGE } from '../../../constants/pagination';

const applications = {
  /**
   * getAll
   * @param {String} accountID - Account ID
   * @param {Number} skip - Amount of applications to skip.
   * E.g, if an account has 20 applications and skip is 5,
   * the first 5 applications are skipped.
   * @returns {Object} Applications and totals count
   */
  getAll: async (accountId: string, skip?: number) => {
    try {
      console.info('Getting applications');

      const variables = {
        accountId,
        take: MAX_APPLICATIONS_PER_PAGE,
        skip: skip || 0,
      };

      const response = (await apollo('GET', getApplicationsQuery, variables)) as ApolloResponse;

      if (response.errors) {
        console.error('GraphQL error getting applications %O', response.errors);
      }

      if (response?.networkError?.result?.errors) {
        console.error('GraphQL network error getting applications %O', response.networkError.result.errors);
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
      throw new Error('Getting applications');
    } catch (err) {
      console.error('Error getting applications %O', err);
      throw new Error('Getting applications');
    }
  },
};

export default applications;
