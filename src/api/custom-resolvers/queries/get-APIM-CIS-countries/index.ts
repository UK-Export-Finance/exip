import apimCisCountries from '../../../helpers/get-APIM-CIS-countries';
import { MappedCisCountry, SuccessResponse } from '../../../types';

/**
 * getApimCisCountriesQuery
 * Get countries from APIM
 * @returns {Promise<Array<MappedCisCountry>>} APIM response data
 */
const getApimCisCountriesQuery = async (): Promise<Array<MappedCisCountry> | Promise<SuccessResponse>> => {
  try {
    console.info('Getting CIS countries from APIM');

    const response = await apimCisCountries.get();

    return response;
  } catch (error) {
    console.error('Error Getting CIS countries from APIM %o', error);

    throw new Error(`Getting CIS countries from APIM ${error}`);
  }
};

export default getApimCisCountriesQuery;
