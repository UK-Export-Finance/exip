import { ApolloResponse } from '../../../../types';
import apollo from '../../../graphql/apollo';
import ordnanceSurveyAddressQuery from '../../../graphql/queries/ordnance-survey-address';

/**
 * keystone GraphQL API call for Ordnance Survey address
 * returns address or errors
 * @param {String} postcode
 * @param {String} houseNameOrNumber
 */
const getOrdnanceSurveyAddress = async (postcode: string, houseNameOrNumber: string) => {
  try {
    console.info('Getting Ordnance Survey Address');

    const queryParams = {
      postcode,
      houseNameOrNumber,
    };

    const response = (await apollo('GET', ordnanceSurveyAddressQuery, queryParams)) as ApolloResponse;

    if (response.errors) {
      console.error('GraphQL network error querying Ordnance Survey address %O', response.errors);
    }

    if (response?.networkError?.result?.errors) {
      console.error('GraphQL network error querying Ordnance Survey address %O', response.networkError.result.errors);
    }

    if (response?.data?.getOrdnanceSurveyAddress) {
      return response.data.getOrdnanceSurveyAddress;
    }

    console.error('Error with GraphQL getOrdnanceSurveyAddress %O', response);
    throw new Error('Getting Ordnance Survey address');
  } catch (err) {
    console.error('Error getting Ordnance Survey address %O', err);
    throw new Error('Getting Ordnance Survey address');
  }
};

export default getOrdnanceSurveyAddress;
