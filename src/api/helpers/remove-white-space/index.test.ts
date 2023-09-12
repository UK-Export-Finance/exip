import removeWhiteSpace from '.';

describe('removeWhiteSpace', () => {
  describe('when string contains whitespace', () => {
    const string = 'test test2';

    it('should remove the space', () => {
      const result = removeWhiteSpace(string);

      const expected = 'testtest2';

      expect(result).toEqual(expected);
    });
  });

  describe('when string does not contain whitespace', () => {
    const string = 'test';

    it('should remove the space', () => {
      const result = removeWhiteSpace(string);

      expect(result).toEqual(string);
    });
  });
});
