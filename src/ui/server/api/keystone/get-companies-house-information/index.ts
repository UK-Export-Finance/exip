import { ApolloResponse } from '../../../../types';
import apollo from '../../../graphql/apollo';
import getCompaniesHouseInformationQuery from '../../../graphql/queries/companies-house';

const getCompaniesHouseInformation = async (companiesHouseNumber: string) => {
  try {
    const queryParams = {
      companiesHouseNumber,
    };

    const response = (await apollo('GET', getCompaniesHouseInformationQuery, queryParams)) as ApolloResponse;

    if (response.errors) {
      console.error('GraphQL network error querying companies house information %o', response.errors);
    }

    if (response?.networkError?.result?.errors) {
      console.error('GraphQL network error querying companies house information %o', response.networkError.result.errors);
    }

    if (response?.data?.getCompaniesHouseInformation) {
      return response.data.getCompaniesHouseInformation;
    }

    console.error('Error with GraphQL getCompaniesHouseInformation %o', response);

    throw new Error('Getting Companies house information');
  } catch (error) {
    console.error('Error getting companies house information %o', error);

    throw new Error('Getting Companies house information');
  }
};

export default getCompaniesHouseInformation;
