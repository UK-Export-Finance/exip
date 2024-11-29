import { ApolloResponse } from '../../../../types';
import apollo from '../../../graphql/apollo';
import ordnanceSurveyAddressQuery from '../../../graphql/queries/ordnance-survey-address';

/**
 * keystone GraphQL API call for Ordnance Survey addresses
 * returns address or errors
 * @param {String} postcode
 * @param {String} houseNameOrNumber
 */
const getOrdnanceSurveyAddresses = async (postcode: string, houseNameOrNumber: string) => {
  try {
    console.info('Getting Ordnance Survey Address');

    const queryParams = {
      postcode,
      houseNameOrNumber,
    };

    const response = (await apollo('GET', ordnanceSurveyAddressQuery, queryParams)) as ApolloResponse;

    if (response.errors) {
      console.error('GraphQL network error querying Ordnance Survey addresses %o', response.errors);
    }

    if (response.apiError) {
      console.error('GraphQL API error querying Ordnance Survey address %o', response);
    }

    if (response?.networkError?.result?.errors) {
      console.error('GraphQL network error querying Ordnance Survey addresses %o', response.networkError.result.errors);
    }

    if (response?.data?.getOrdnanceSurveyAddresses) {
      return response.data.getOrdnanceSurveyAddresses;
    }

    console.error('Error with GraphQL getOrdnanceSurveyAddresses %o', response);

    throw new Error('Getting Ordnance Survey addresses');
  } catch (error) {
    console.error('Error getting Ordnance Survey addresses %o', error);

    throw new Error('Getting Ordnance Survey addresses');
  }
};

export default getOrdnanceSurveyAddresses;
