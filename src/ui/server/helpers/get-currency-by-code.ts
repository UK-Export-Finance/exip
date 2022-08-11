import { Currency } from '../../types';

const getCurrencyByCode = (currencies: Array<Currency>, isoCode: string) => {
  const currency = currencies.find((c) => c.isoCode === isoCode);

  return {
    isoCode: currency?.isoCode,
    name: currency?.name,
  };
};

export default getCurrencyByCode;
