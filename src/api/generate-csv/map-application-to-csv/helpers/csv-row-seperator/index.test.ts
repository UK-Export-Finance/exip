import ROW_SEPERATOR from '.';
import csvRow from '../csv-row';
import { DEFAULT } from '../../../../content-strings';

describe('api/generate-csv/map-application-to-csv/helpers/csv-row-seperator', () => {
  it('should return a csv row with default empty dashes', () => {
    const expected = csvRow(DEFAULT.EMPTY, DEFAULT.EMPTY);

    expect(ROW_SEPERATOR).toEqual(expected);
  });
});
