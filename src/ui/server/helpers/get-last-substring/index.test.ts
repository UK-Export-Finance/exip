import getLastSubstring from '.';

describe('server/helpers/get-last-substring', () => {
  it('should return the last sub string', () => {
    const mockStr = 'a/b/c';

    const result = getLastSubstring(mockStr);

    expect(result).toEqual('c');
  });
});
