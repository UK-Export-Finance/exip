import APIM from '../../integrations/APIM';
import mapCisCountries from '../map-CIS-countries';
import { GetApimCisCountriesHelperResponse } from '../../types';

/**
 * get
 * Get and map countries from APIM
 * @returns {Promise<GetApimCisCountriesHelperResponse>}
 */
const get = async (): Promise<GetApimCisCountriesHelperResponse> => {
  try {
    console.info('Getting and mapping CIS countries from APIM (apimCisCountries helper)');

    const response = await APIM.getCisCountries();

    if (response.data) {
      const mapped = mapCisCountries(response.data);

      return {
        success: true,
        countries: mapped,
      } as GetApimCisCountriesHelperResponse;
    }

    return { success: false };
  } catch (error) {
    console.error('Error Getting and mapping CIS countries from APIM (apimCisCountries helper) %o', error);

    throw new Error(`Getting and mapping CIS countries from APIM (apimCisCountries helper) ${error}`);
  }
};

const apimCisCountries = {
  get,
};

export default apimCisCountries;
