import APIM from '../../integrations/APIM';
import mapCurrencies from '../map-currencies';
import { GetApimCurrenciesHelperResponse } from '../../types';

/**
 * get
 * Get and map currencies from APIM
 * @returns {Promise<GetApimCurrenciesHelperResponse>} APIM response data
 */
const get = async (): Promise<GetApimCurrenciesHelperResponse> => {
  try {
    console.info('Getting and mapping currencies from APIM (apimCurrencies helper)');

    const response = await APIM.getCurrencies();

    if (response.data) {
      const supportedCurrencies = mapCurrencies(response.data, false);
      const alternativeCurrencies = mapCurrencies(response.data, true);
      const allCurrencies = [...supportedCurrencies, ...alternativeCurrencies];

      return {
        success: true,
        supportedCurrencies,
        alternativeCurrencies,
        allCurrencies,
      } as GetApimCurrenciesHelperResponse;
    }

    return { success: false };
  } catch (error) {
    console.error('Error Getting and mapping currencies from APIM (apimCurrencies helper) %o', error);

    throw new Error(`Getting and mapping currencies from APIM (apimCurrencies helper) ${error}`);
  }
};

const apimCurrencies = {
  get,
};

export default apimCurrencies;
