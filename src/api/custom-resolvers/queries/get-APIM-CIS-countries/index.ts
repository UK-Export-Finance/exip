import apimCisCountries from '../../../helpers/get-APIM-CIS-countries';
import { MappedCisCountry } from '../../../types';

/**
 * getApimCisCountriesQuery
 * Get countries from APIM
 * @returns {Promise<Array<MappedCisCountry>>} APIM response data
 */
const getApimCisCountriesQuery = async (): Promise<Array<MappedCisCountry>> => {
  try {
    console.info('Getting CIS countries from APIM');

    const response = await apimCisCountries.get();

    if (response.success) {
      return response.countries;
    }

    return [];
  } catch (error) {
    console.error('Error Getting CIS countries from APIM %o', error);

    throw new Error(`Getting CIS countries from APIM ${error}`);
  }
};

export default getApimCisCountriesQuery;
