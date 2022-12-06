import formatCurrency from './format-currency';

describe('server/helpers/format-currency', () => {
  it('shouild return a formatted currency', () => {
    const mock = 123456;
    const currencyCode = 'GBP';

    const result = formatCurrency(mock, currencyCode, 2);

    const expected = mock.toLocaleString('en', {
      style: 'currency',
      currency: currencyCode,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

    expect(result).toEqual(expected);
  });
});
