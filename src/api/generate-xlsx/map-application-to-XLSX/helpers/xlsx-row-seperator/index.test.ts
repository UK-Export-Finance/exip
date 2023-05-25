import ROW_SEPERATOR from '.';
import xlsxRow from '../xlsx-row';
import { DEFAULT } from '../../../../content-strings';

describe('api/generate-xlsx/map-application-to-xlsx/helpers/xlsx-row-seperator', () => {
  it('should return an XLSX row with default empty dashes', () => {
    const expected = xlsxRow(DEFAULT.EMPTY, DEFAULT.EMPTY);

    expect(ROW_SEPERATOR).toEqual(expected);
  });
});
