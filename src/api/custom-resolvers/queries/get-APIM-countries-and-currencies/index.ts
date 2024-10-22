import apimCisCountries from '../../../helpers/get-APIM-CIS-countries';
import apimCurrencies from '../../../helpers/get-APIM-currencies';

/**
 * getApimCountriesAndCurrencies
 * Get countries and currencies from APIM
 * @returns {Promise<Object>} APIM countries and currencies
 */
const getApimCountriesAndCurrencies = async () => {
  try {
    console.info('Getting countries and currencies from APIM (getApimCountriesAndCurrencies helper)');

    const [countriesResponse, currenciesResponse] = await Promise.all([await apimCisCountries.get(), await apimCurrencies.get()]);

    if (!countriesResponse.success) {
      throw new Error('Getting countries from APIM (getApimCountriesAndCurrencies helper)');
    }

    if (!currenciesResponse.success) {
      throw new Error('Getting currencies from APIM (getApimCountriesAndCurrencies helper)');
    }

    const { countries } = countriesResponse;

    const { allCurrencies, alternativeCurrencies, supportedCurrencies } = currenciesResponse;

    return {
      countries,
      allCurrencies,
      alternativeCurrencies,
      supportedCurrencies,
    };
  } catch (error) {
    console.error('Error Getting countries and currencies from APIM (getApimCountriesAndCurrencies helper) %o', error);

    throw new Error(`Getting countries and currencies from APIM (getApimCountriesAndCurrencies helper) ${error}`);
  }
};

export default getApimCountriesAndCurrencies;
