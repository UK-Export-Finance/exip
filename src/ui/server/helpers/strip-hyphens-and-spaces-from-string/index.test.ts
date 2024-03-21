import stripHyphensAndSpacesFromString from '.';

describe('helpers/strip-hyphens-and-spaces-from-string', () => {
  describe('when a string does not have a hyphen or a space', () => {
    it('should return the string', () => {
      const string = 'mockstring';

      const result = stripHyphensAndSpacesFromString(string);

      expect(result).toEqual(string);
    });
  });

  describe('when a string contains hyphens', () => {
    it('should remove the hyphens', () => {
      const string = 'mock-string';

      const result = stripHyphensAndSpacesFromString(string);

      const expected = 'mockstring';

      expect(result).toEqual(expected);
    });
  });

  describe('when a string contains hyphens and spaces', () => {
    it('should remove the hyphens and spaces', () => {
      const string = 'mock-string test';

      const result = stripHyphensAndSpacesFromString(string);

      const expected = 'mockstringtest';

      expect(result).toEqual(expected);
    });
  });

  describe('when a string contains multiple hyphens and spaces', () => {
    it('should remove the hyphens and spaces', () => {
      const string = 'mock--string  test';

      const result = stripHyphensAndSpacesFromString(string);

      const expected = 'mockstringtest';

      expect(result).toEqual(expected);
    });
  });

  describe('when a string contains only numbers', () => {
    it('should return the string', () => {
      const string = '123456';

      const result = stripHyphensAndSpacesFromString(string);

      expect(result).toEqual(string);
    });
  });

  describe('when a string contains numbers and hyphens', () => {
    it('should remove the hyphens', () => {
      const string = '123-456';

      const result = stripHyphensAndSpacesFromString(string);

      const expected = '123456';

      expect(result).toEqual(expected);
    });
  });

  describe('when a string contains numbers and hyphens and spaces', () => {
    it('should remove the hyphens and spaces', () => {
      const string = '12-34 56';

      const result = stripHyphensAndSpacesFromString(string);

      const expected = '123456';

      expect(result).toEqual(expected);
    });
  });

  describe('when a string contains numbers and multiple hyphens and spaces', () => {
    it('should remove the hyphens and spaces', () => {
      const string = '12-3-4 5 6';

      const result = stripHyphensAndSpacesFromString(string);

      const expected = '123456';

      expect(result).toEqual(expected);
    });
  });
});
