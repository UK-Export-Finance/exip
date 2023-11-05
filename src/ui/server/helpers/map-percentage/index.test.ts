import mapPercentage from '.';

describe('server/helpers/map-percentage', () => {
  describe('when a number is provided', () => {
    it('should return the number and percentage in string form', () => {
      const value = 5;

      const response = mapPercentage(value);

      expect(response).toEqual('5%');
    });
  });

  describe('when a string is provided', () => {
    it('should return the string and percentage in string form', () => {
      const value = '5';

      const response = mapPercentage(value);

      expect(response).toEqual('5%');
    });
  });
});
