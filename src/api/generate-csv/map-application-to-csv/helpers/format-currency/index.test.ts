import formatCurrency from '.';
import { GBP_CURRENCY_CODE } from '../../../../constants';

describe('server/helpers/format-currency', () => {
  const mock = 123456;
  const currencyCode = GBP_CURRENCY_CODE;

  it('should return a formatted currency', () => {
    const result = formatCurrency(mock, currencyCode, 2);

    const expected = mock.toLocaleString('en', {
      style: 'currency',
      currency: currencyCode,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

    expect(result).toEqual(expected);
  });

  describe('when decimalPoints parameter is not provided', () => {
    it('should default to 0', () => {
      const result = formatCurrency(mock, currencyCode);

      const expected = mock.toLocaleString('en', {
        style: 'currency',
        currency: currencyCode,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      });

      expect(result).toEqual(expected);
    });
  });
});
