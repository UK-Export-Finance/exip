import stripHyphensAndSpacesFromString from '.';

describe('helpers/strip-hyphens-and-spaces-from-string', () => {
  describe('when a string does not have a hyphen or a space', () => {
    it('should return the string', () => {
      const mockString = 'mockstring';

      const result = stripHyphensAndSpacesFromString(mockString);

      expect(result).toEqual(mockString);
    });
  });

  describe('when a string contains hyphens', () => {
    it('should remove the hyphens', () => {
      const mockString = 'mock-string';

      const result = stripHyphensAndSpacesFromString(mockString);

      const expected = 'mockstring';

      expect(result).toEqual(expected);
    });
  });

  describe('when a string contains hyphens and spaces', () => {
    it('should remove the hyphens and spaces', () => {
      const mockString = 'mock-string test';

      const result = stripHyphensAndSpacesFromString(mockString);

      const expected = 'mockstringtest';

      expect(result).toEqual(expected);
    });
  });

  describe('when a string contains multiple hyphens and spaces', () => {
    it('should remove the hyphens and spaces', () => {
      const mockString = 'mock--string  test';

      const result = stripHyphensAndSpacesFromString(mockString);

      const expected = 'mockstringtest';

      expect(result).toEqual(expected);
    });
  });

  describe('when a string contains only numbers', () => {
    it('should return the string', () => {
      const mockString = '123456';

      const result = stripHyphensAndSpacesFromString(mockString);

      expect(result).toEqual(mockString);
    });
  });

  describe('when a string contains numbers and hyphens', () => {
    it('should remove the hyphens', () => {
      const mockString = '123-456';

      const result = stripHyphensAndSpacesFromString(mockString);

      const expected = '123456';

      expect(result).toEqual(expected);
    });
  });

  describe('when a string contains numbers and hyphens and spaces', () => {
    it('should remove the hyphens and spaces', () => {
      const mockString = '12-34 56';

      const result = stripHyphensAndSpacesFromString(mockString);

      const expected = '123456';

      expect(result).toEqual(expected);
    });
  });

  describe('when a string contains numbers and multiple hyphens and spaces', () => {
    it('should remove the hyphens and spaces', () => {
      const mockString = '12-3-4 5 6';

      const result = stripHyphensAndSpacesFromString(mockString);

      const expected = '123456';

      expect(result).toEqual(expected);
    });
  });
});
