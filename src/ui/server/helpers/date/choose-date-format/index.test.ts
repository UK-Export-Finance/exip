import { format } from 'date-fns';
import chooseDateFormat from '.';

describe('server/helpers/date/chooseDateFormat', () => {
  const mockTimestamp = new Date();

  it('should return a formatted date when format is "dd MMMM yyyy"', () => {
    const result = chooseDateFormat(mockTimestamp, 'dd MMMM yyyy');

    const expected = format(new Date(mockTimestamp), 'dd MMMM yyyy');

    expect(result).toEqual(expected);
  });

  it('should return a formatted date when format is "d MMMM"', () => {
    const result = chooseDateFormat(mockTimestamp, 'd MMMM');

    const expected = format(new Date(mockTimestamp), 'd MMMM');

    expect(result).toEqual(expected);
  });
});
