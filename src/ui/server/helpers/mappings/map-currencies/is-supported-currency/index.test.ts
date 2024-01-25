import isSupportedCurrency from '.';
import { GBP, AED } from '../../../../constants';

describe('server/helpers/mappings/map-currencies/is-supported-currency', () => {
  describe('supported currency', () => {
    it('should return the currency', () => {
      const result = isSupportedCurrency(GBP);

      expect(result).toEqual(GBP);
    });
  });

  describe('unsupported currency', () => {
    it('should return undefined', () => {
      const result = isSupportedCurrency(AED);

      expect(result).toBeUndefined();
    });
  });
});
