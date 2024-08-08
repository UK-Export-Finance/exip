import APIM from '../../../integrations/APIM';
import mapCurrencies from '../../../helpers/map-currencies';

/**
 * getApimCurrencies
 * Get currencies from APIM
 * @returns {Promise<Object>} APIM response data
 */
const getApimCurrencies = async () => {
  try {
    console.info('Getting and mapping currencies from APIM');

    const response = await APIM.getCurrencies();

    if (response.data) {
      const supportedCurrencies = mapCurrencies(response.data, false);
      const alternativeCurrencies = mapCurrencies(response.data, true);
      const allCurrencies = [...supportedCurrencies, ...alternativeCurrencies];

      return {
        supportedCurrencies,
        alternativeCurrencies,
        allCurrencies,
      };
    }

    return { success: false };
  } catch (error) {
    console.error('Error Getting and mapping currencies from APIM %O', error);

    throw new Error(`Getting and mapping currencies from APIM ${error}`);
  }
};

export default getApimCurrencies;
