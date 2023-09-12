import apollo from '../../../graphql/apollo';
import getApplicationQuery from '../../../graphql/queries/application';
import { ApolloResponse } from '../../../../types';

const getApplication = async (referenceNumber: number) => {
  try {
    console.info('Getting application');

    const response = (await apollo('GET', getApplicationQuery, { referenceNumber })) as ApolloResponse;

    if (response.errors) {
      console.error('GraphQL error getting application %O', response.errors);
    }

    if (response?.networkError?.result?.errors) {
      console.error('GraphQL network error getting application %O', response.networkError.result.errors);
    }

    if (response?.data?.referenceNumber && response?.data?.referenceNumber?.application) {
      const { data } = response;

      return {
        ...data.referenceNumber.application,
        referenceNumber: data.referenceNumber.id,
      };
    }

    console.error('Error with GraphQL getApplicationQuery %O', response);
    throw new Error('Getting application');
  } catch (err) {
    console.error('Error getting application %O', err);
    throw new Error('Getting application');
  }
};

export default getApplication;
