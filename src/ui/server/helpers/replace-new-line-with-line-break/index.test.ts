import replaceNewLineWithLineBreak from '.';

describe('server/helpers/replace-new-line-with-line-break', () => {
  describe('if string contains "\r\n', () => {
    it('should replace "\r\n with "<br />', () => {
      const string = 'test\r\ntest1\r\ntest2';

      const result = replaceNewLineWithLineBreak(string);

      const expected = 'test<br />test1<br />test2';

      expect(result).toEqual(expected);
    });
  });

  describe('if string does not contain "\r\n', () => {
    it('should return the string', () => {
      const string = 'testtest1test2';

      const result = replaceNewLineWithLineBreak(string);

      const expected = 'testtest1test2';

      expect(result).toEqual(expected);
    });
  });
});
