import APIM from '../../../integrations/APIM';
import mapCurrencies from '../../../helpers/map-currencies';
import { GetCurrencyVariables } from '../../../types';

/**
 * getApimCurrencies
 * Get currencies from APIM
 * @param {Object} GraphQL root variables
 * @param {Object} GraphQL variables for the GetCurrencyVariables mutation
 * @param {Object} KeystoneJS context API
 * @returns {Object} APIM response data
 */
const getApimCurrencies = async (root: any, variables: GetCurrencyVariables) => {
  try {
    const { allCurrencies } = variables;

    console.info('Getting and mapping currencies from APIM');

    const response = await APIM.getCurrencies();

    if (response.data) {
      const mapped = mapCurrencies(response.data, allCurrencies);

      return mapped;
    }

    return { success: false };
  } catch (err) {
    console.error('Error Getting and mapping currencies from APIM %O', err);

    throw new Error(`Getting and mapping currencies from APIM ${err}`);
  }
};

export default getApimCurrencies;
