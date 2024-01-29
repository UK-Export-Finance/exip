import isNotAlternativeCurrency from '.';
import { GBP, NON_STANDARD_CURRENCY_CODE } from '../../../../constants';

describe('server/helpers/mappings/map-currencies/is-not-alternative-currency', () => {
  describe('supported currency', () => {
    it('should return the currency', () => {
      const result = isNotAlternativeCurrency(GBP);

      expect(result).toEqual(GBP);
    });
  });

  describe('unsupported currency', () => {
    it('should return undefined', () => {
      const result = isNotAlternativeCurrency(NON_STANDARD_CURRENCY_CODE);

      expect(result).toBeUndefined();
    });
  });
});
