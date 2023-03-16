import getTrueProperties from '.';

describe('server/helpers/get-true-properties', () => {
  it('should return an object with only true properties', () => {
    const mockObj = {
      a: true,
      b: false,
    };

    const result = getTrueProperties(mockObj);

    const expected = {
      a: true,
    };

    expect(result).toEqual(expected);
  });
});
