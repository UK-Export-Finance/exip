import { GBP } from '../../constants';
import APIM from '../../integrations/APIM';

/**
 * get
 * Get a currency exchange rate from APIM
 * @param {string} source: Currency exchange rate source.
 * @param {string} target: Currency exchange rate target.
 * @returns {Promise<number>} APIM response data
 */
const get = async (source: string, target: string): Promise<number> => {
  try {
    console.info('Getting currency exchange rate from APIM - %s to %s (getApimCurrencyExchangeRate helper)', source, target);

    const response = await APIM.getCurrenciesExchange(source, target);

    if (response.success && response.data) {
      const [currency] = response.data;

      const { midPrice: exchangeRate } = currency;

      /**
       * NOTE: At the time of writing,
       * APIM only supports the source as GBP or USD.
       * Therefore, we have to do the following for e.g "NON-GBP => GBP"
       */
      if (source !== GBP) {
        const fixed = Number(1 / exchangeRate).toFixed(2);

        return Number(fixed);
      }

      return exchangeRate;
    }

    return 0;
  } catch (error) {
    console.error('Error Getting currency exchange rate from APIM - %s to %s (getApimCurrencyExchangeRate helper) %o', source, target, error);

    throw new Error(`Getting currency exchange rate from APIM - %s to %s (getApimCurrencyExchangeRate helper) ${error}`);
  }
};

const apimCurrencyExchangeRate = {
  get,
};

export default apimCurrencyExchangeRate;
