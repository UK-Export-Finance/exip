import { ApolloResponse } from '../../../../types';
import apollo from '../../../graphql/apollo';
import ordnanceSurveyAddressQuery from '../../../graphql/queries/ordnance-survey-address';

const getOrdnanceSurveyAddress = async (postcode: string, houseNumber: string) => {
  try {
    const queryParams = {
      postcode,
      houseNumber,
    };

    const query = ordnanceSurveyAddressQuery;
    const response = (await apollo('GET', query, queryParams)) as ApolloResponse;

    if (response.errors) {
      console.error('GraphQL network error querying ordnance survey address %O', response.errors);
    }

    if (response?.networkError?.result?.errors) {
      console.error('GraphQL network error querying ordnance survey address %O', response.networkError.result.errors);
    }

    if (response?.data?.getOrdnanceSurveyAddress) {
      return response.data.getOrdnanceSurveyAddress;
    }

    console.error('Error with GraphQL getOrdnanceSurveyAddress %O', response);
    throw new Error('Getting Ordnance Survey address');
  } catch (err) {
    console.error('Error getting ordnance survey address %O', err);
    throw new Error('Getting Ordnance Survey address');
  }
};

export default getOrdnanceSurveyAddress;
