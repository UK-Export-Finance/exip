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
  } catch (err) {
    console.error('Error Getting and mapping CIS countries from APIM %O', err);

    throw new Error(`Getting and mapping CIS countries from APIM ${err}`);
  }
};

export default getApimCisCountries;
