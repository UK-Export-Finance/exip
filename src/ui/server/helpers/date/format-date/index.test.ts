import { format } from 'date-fns';
import formatDate from '.';
import { DATE_FORMAT } from '../../../constants';

describe('server/helpers/date/format-date', () => {
  const mockTimestamp = new Date();

  it('should return a formatted date', () => {
    const result = formatDate(mockTimestamp);

    const expected = format(new Date(mockTimestamp), DATE_FORMAT.DEFAULT);

    expect(result).toEqual(expected);
  });
});
