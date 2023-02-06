import displayNumberFieldValue from '.';

describe('server/helpers/display-number-field-value', () => {
  describe('when provided value is null', () => {
    it('should return null', () => {
      const response = displayNumberFieldValue();

      expect(response).toBeUndefined();
    });
  });

  describe('when provided value is a number', () => {
    it('should return null', () => {
      const response = displayNumberFieldValue(5);

      expect(response).toEqual(5);
    });
  });

  describe('when provided value is 0', () => {
    it('should return null', () => {
      const response = displayNumberFieldValue(0);

      expect(response).toEqual('0');
    });
  });
});
