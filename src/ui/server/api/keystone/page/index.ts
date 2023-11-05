import { ApolloResponse } from '../../../../types';
import apollo from '../../../graphql/apollo';
import pageQuery from '../../../graphql/queries/page';

const page = {
  get: async (pageId: string) => {
    try {
      console.info('Getting page data');

      const queryParams = {
        id: pageId,
      };

      const response = (await apollo('GET', pageQuery, queryParams)) as ApolloResponse;

      if (response.errors) {
        console.error('GraphQL error querying keystone page %O', response.errors);
      }

      if (response?.networkError?.result?.errors) {
        console.error('GraphQL network error querying keystone page %O', response.networkError.result.errors);
      }

      if (response?.data?.page) {
        return response.data.page;
      }

      console.error('Error with GraphQL pageQuery %O', response);
      throw new Error('Getting page data');
    } catch (err) {
      console.error('Error getting page data %O', err);
      throw new Error('Getting page data');
    }
  },
};

export default page;
