import APIM from '../../../integrations/APIM';
import mapCurrencies from '../../../helpers/map-currencies';

/**
 * getApimCurrencies
 * Get currencies from APIM
 * @returns {Object} APIM response data
 */
const getApimCurrencies = async () => {
  try {
    console.info('Getting and mapping currencies from APIM');

    const response = await APIM.getCurrencies();

    if (response.data) {
      const mapped = mapCurrencies(response.data);

      return mapped;
    }

    return { success: false };
  } catch (err) {
    console.error('Error Getting and mapping currencies from APIM %O', err);

    throw new Error(`Getting and mapping currencies from APIM ${err}`);
  }
};

export default getApimCurrencies;
