import APIM from '../../../integrations/APIM';
import mapCisCountries from '../../../helpers/map-CIS-countries';

/**
 * getApimCisCountries
 * Get countries from APIM
 * @returns {Promise<Object>} APIM response data
 */
const getApimCisCountries = async () => {
  try {
    console.info('Getting and mapping CIS countries from APIM');

    const response = await APIM.getCisCountries();

    if (response.data) {
      const mapped = mapCisCountries(response.data);

      return mapped;
    }

    return { success: false };
  } catch (error) {
    console.error('Error Getting and mapping CIS countries from APIM %o', error);

    throw new Error(`Getting and mapping CIS countries from APIM ${error}`);
  }
};

export default getApimCisCountries;
