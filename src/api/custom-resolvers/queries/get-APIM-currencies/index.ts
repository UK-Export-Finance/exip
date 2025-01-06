import apimCisCurrencies from '../../../helpers/get-APIM-currencies';
import { GetApimCurrenciesQueryResponse } from '../../../types';

/**
 * getApimCurrenciesQuery
 * Get currencies from APIM
 * @returns {Promise<Array<Currency>>} APIM response data
 */
const getApimCurrenciesQuery = async (): Promise<GetApimCurrenciesQueryResponse> => {
  try {
    console.info('Getting and mapping currencies from APIM');

    const response = await apimCisCurrencies.get();

    if (response.success) {
      return response;
    }

    return {};
  } catch (error) {
    console.error('Error Getting and mapping currencies from APIM %o', error);

    throw new Error(`Getting and mapping currencies from APIM ${error}`);
  }
};

export default getApimCurrenciesQuery;
