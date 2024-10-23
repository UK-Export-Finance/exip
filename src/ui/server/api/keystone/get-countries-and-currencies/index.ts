import apollo from '../../../graphql/apollo';
import { ApolloResponse } from '../../../../types';
import getCountriesAndCurrenciesQuery from '../../../graphql/queries/countries-and-currencies';

const getCountriesAndCurrencies = async () => {
  try {
    console.info('Getting countries and currencies');

    const response = (await apollo('POST', getCountriesAndCurrenciesQuery, {})) as ApolloResponse;

    if (response.errors) {
      console.error('GraphQL error getting countries and currencies %o', response.errors);
    }

    if (response?.networkError?.result?.errors) {
      console.error('GraphQL network error getting countries and currencies %o', response.networkError.result.errors);
    }

    if (response?.data?.countries) {
      return response.data.countries[0];
    }

    console.error('Error with GraphQL getCountriesAndCurrenciesQuery %o', response);

    throw new Error('Getting country');
  } catch (error) {
    console.error('Error getting countries and currencies %o', error);

    throw new Error('Getting country');
  }
};

export default getCountriesAndCurrencies;
