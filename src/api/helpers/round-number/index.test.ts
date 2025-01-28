import roundNumber from '.';

describe('roundNumber', () => {
  it('should return a rounded number', () => {
    const number = 1234;

    const result = roundNumber(number);

    const expected = Math.round(number);

    expect(result).toEqual(expected);
  });
});
