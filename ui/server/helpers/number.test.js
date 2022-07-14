const {
  isNumber,
  numberHasDecimal,
  getPercentageOfNumber,
} = require('./number');

describe('server/helpers/number', () => {
  describe('isNumber', () => {
    describe('when a string is provided', () => {
      it('should return false', () => {
        const result = isNumber('test');

        expect(result).toEqual(false);
      });
    });

    describe('when a number is provided', () => {
      it('should return true', () => {
        const result = isNumber(1);

        expect(result).toEqual(true);
      });
    });
  });

  describe('numberHasDecimal', () => {
    describe('when number has a decimal', () => {
      it('should return true', () => {
        const result = numberHasDecimal(1.234);

        expect(result).toEqual(true);
      });
    });

    describe('when a number is does NOT have a decimal', () => {
      it('should return false', () => {
        const result = numberHasDecimal(1);

        expect(result).toEqual(false);
      });
    });
  });

  describe('getPercentageOfNumber', () => {
    it('should return percentage value of a number', () => {
      const mockPercent = 20;
      const mockTotal = 1000;

      const result = getPercentageOfNumber(mockPercent, mockTotal);

      const expected = '200.00';

      expect(result).toEqual(expected);
    });
  });
});
