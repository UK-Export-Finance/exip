import getLastSubstring from '.';

describe('server/helpers/get-last-substring', () => {
  it('should return the last sub string', () => {
    const mockStr = 'a/b/c';

    const result = getLastSubstring(mockStr);

    expect(result).toEqual('c');
  });

  describe('when no string is provided', () => {
    it('should return null', () => {
      // @ts-ignore
      const result = getLastSubstring();

      expect(result).toEqual(null);
    });
  });
});
