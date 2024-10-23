import apimCisCurrencies from '../../../helpers/get-APIM-currencies';

/**
 * getApimCurrencies
 * Get currencies from APIM
 * @returns {Promise<Array<Currency>>} APIM response data
 */
const getApimCurrencies = async () => {
  try {
    console.info('Getting and mapping currencies from APIM');

    const response = await apimCisCurrencies.get();

    return response;
  } catch (error) {
    console.error('Error Getting and mapping currencies from APIM %o', error);

    throw new Error(`Getting and mapping currencies from APIM ${error}`);
  }
};

export default getApimCurrencies;
