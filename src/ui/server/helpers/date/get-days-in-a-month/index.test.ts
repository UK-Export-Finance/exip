import getDaysInAMonth from '.';

describe('server/helpers/date/get-days-in-a-month', () => {
  const date = new Date();
  const month = date.getMonth();
  const year = date.getFullYear();

  it('should return the days in the provided month', () => {
    const result = getDaysInAMonth(month, year);

    const expected = new Date(year, month, 0).getDate();

    expect(result).toEqual(expected);
  });
});
