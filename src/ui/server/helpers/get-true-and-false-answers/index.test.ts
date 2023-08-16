import getTrueAndFalseAnswers from '.';

describe('server/helpers/get-true-and-false-answers', () => {
  it('should return an object with valid property values', () => {
    const mockObj = {
      a: true,
      b: false,
      c: true,
      d: false,
    };

    const result = getTrueAndFalseAnswers(mockObj);

    const expected = {
      a: true,
      b: false,
      c: true,
      d: false,
    };

    expect(result).toEqual(expected);
  });
});
