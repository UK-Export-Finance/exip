import APIM from '../../integrations/APIM';

/**
 * getApimCurrencyExchangeRate
 * Get a currency exchange rate from APIM
 * @param {String} source: Currency exchange rate  source.
 * @param {String} target: Currency exchange rate target.
 * @returns {Promise<Number>} APIM response data
 */
const getApimCurrencyExchangeRate = async (source: string, target: string): Promise<number> => {
  try {
    console.info('Getting currency exchange rate from APIM (getApimCurrencyExchangeRate helper)');

    const response = await APIM.getCurrenciesExchange(source, target);

    if (response.success && response.data) {
      const [currency] = response.data;

      const { midPrice: exchangeRate } = currency;

      return exchangeRate;
    }

    return 0;
  } catch (error) {
    console.error('Error Getting currency exchange rate from APIM (getApimCurrencyExchangeRate helper) %o', error);

    throw new Error(`Getting currency exchange rate from APIM (getApimCurrencyExchangeRate helper) ${error}`);
  }
};

export default getApimCurrencyExchangeRate;
