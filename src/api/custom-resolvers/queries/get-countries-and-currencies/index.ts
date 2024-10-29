import getCountries from '../../../helpers/get-countries';
import apimCurrencies from '../../../helpers/get-APIM-currencies';
import { Context } from '../../../types';

/**
 * getCountriesAndCurrencies
 * - Get countries from our DB.
 * - Get and map currencies from APIM.
 * @param {Object} root: GraphQL root variables
 * @param {Object} variables: GraphQL variables for the getCountriesAndCurrencies query
 * @param {Context} context: KeystoneJS context API
 * @returns {Promise<Object>} APIM countries and currencies
 */
const getCountriesAndCurrencies = async (root: any, variables: object, context: Context) => {
  try {
    console.info('Getting countries and currencies (getCountriesAndCurrencies resolver)');

    const [countries, currenciesResponse] = await Promise.all([await getCountries(context), await apimCurrencies.get()]);

    if (!currenciesResponse.success) {
      throw new Error('Getting currencies (getCountriesAndCurrencies resolver)');
    }

    const { allCurrencies, alternativeCurrencies, supportedCurrencies } = currenciesResponse;

    return {
      countries,
      allCurrencies,
      alternativeCurrencies,
      supportedCurrencies,
    };
  } catch (error) {
    console.error('Error getting countries and currencies (getCountriesAndCurrencies resolver) %o', error);

    throw new Error(`Getting countries and currencies (getCountriesAndCurrencies resolver) ${error}`);
  }
};

export default getCountriesAndCurrencies;
