import transformNumberToString from '.';

describe('server/helpers/display-number-field-value', () => {
  describe('when provided value is null', () => {
    it('should return null', () => {
      const response = transformNumberToString();

      expect(response).toBeUndefined();
    });
  });

  describe('when provided value is a number', () => {
    it('should return the number', () => {
      const response = transformNumberToString(5);

      expect(response).toEqual(5);
    });
  });

  describe('when provided value is 0', () => {
    it('should return 0 as a string', () => {
      const response = transformNumberToString(0);

      expect(response).toEqual('0');
    });
  });
});
