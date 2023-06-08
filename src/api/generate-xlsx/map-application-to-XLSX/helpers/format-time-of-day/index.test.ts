import formatTimeOfDay from '.';
import formatDate from '../../../../helpers/format-date';
import { DATE_FORMAT } from '../../../../constants';

describe('api/generate-xlsx/map-application-to-xlsx/helpers/format-time-of-day', () => {
  const mockTimestamp = new Date();

  it('should return a formatted time via formatDate', () => {
    const result = formatTimeOfDay(mockTimestamp);

    const expected = formatDate(mockTimestamp, DATE_FORMAT.HOURS_AND_MINUTES);

    expect(result).toEqual(expected);
  });
});
