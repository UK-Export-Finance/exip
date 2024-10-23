import getCountries from '../../../helpers/get-countries';
import apimCurrencies from '../../../helpers/get-APIM-currencies';
import { Context } from '../../../types';

/**
 * getCountriesAndCurrencies
 * - Get countries from our DB.
 * - Get and map currencies from APIM.
 * @param {Context} context: KeystoneJS context API
 * @returns {Promise<Object>} APIM countries and currencies
 */
const getCountriesAndCurrencies = async (context: Context) => {
  try {
    console.info('Getting countries and currencies (getCountriesAndCurrencies helper)');

    const [countries, currenciesResponse] = await Promise.all([await getCountries(context), await apimCurrencies.get()]);

    if (!currenciesResponse.success) {
      throw new Error('Getting currencies (getCountriesAndCurrencies helper)');
    }

    const { allCurrencies, alternativeCurrencies, supportedCurrencies } = currenciesResponse;

    return {
      countries,
      allCurrencies,
      alternativeCurrencies,
      supportedCurrencies,
    };
  } catch (error) {
    console.error('Error getting countries and currencies (getCountriesAndCurrencies helper) %o', error);

    throw new Error(`Getting countries and currencies (getCountriesAndCurrencies helper) ${error}`);
  }
};

export default getCountriesAndCurrencies;
