import removeCommasFromString from '.';

describe('server/helpers/remove-commas-from-string', () => {
  describe('when string has one comma in it', () => {
    it('should remove the comma and return the string', () => {
      const response = removeCommasFromString('1,000');

      const expected = '1000';
      expect(response).toEqual(expected);
    });
  });

  describe('when string has multipe commas in it', () => {
    it('should remove the commas and return the string', () => {
      const response = removeCommasFromString('1,00,0,');

      const expected = '1000';
      expect(response).toEqual(expected);
    });
  });

  describe('when string has no commas in it', () => {
    it('should return the string', () => {
      const response = removeCommasFromString('1000');

      const expected = '1000';
      expect(response).toEqual(expected);
    });
  });

  describe('when string is empty', () => {
    it('should return an empty string', () => {
      const response = removeCommasFromString('1000');

      const expected = '1000';
      expect(response).toEqual(expected);
    });
  });
});
