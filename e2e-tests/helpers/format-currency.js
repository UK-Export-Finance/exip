import { GBP_CURRENCY_CODE } from '../fixtures/currencies';

const formatCurrency = (str) => Number(str).toLocaleString('en', {
  style: 'currency',
  currency: GBP_CURRENCY_CODE,
  minimumFractionDigits: 0,
});

export default formatCurrency;
