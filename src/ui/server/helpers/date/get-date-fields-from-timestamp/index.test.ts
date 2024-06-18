import { getDate, getMonth, getYear } from 'date-fns';
import getDateFieldsFromTimestamp from '.';

describe('server/helpers/date/get-date-fields-from-timestamp', () => {
  const mockTimestamp = new Date();
  const mockFieldId = 'mock';

  it('should return day, month and year fields prefixed with field ID', () => {
    const result = getDateFieldsFromTimestamp(mockTimestamp, mockFieldId);

    const expectedDay = getDate(mockTimestamp);
    const expectedMonth = getMonth(mockTimestamp) + 1;
    const expectedYear = getYear(mockTimestamp);

    const expected = {
      [`${mockFieldId}-day`]: expectedDay,
      [`${mockFieldId}-month`]: expectedMonth,
      [`${mockFieldId}-year`]: expectedYear,
    };

    expect(result).toEqual(expected);
  });
});
