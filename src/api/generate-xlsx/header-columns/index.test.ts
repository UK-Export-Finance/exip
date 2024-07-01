import XLSX_HEADER_COLUMNS from '.';
import { XLSX_CONFIG } from '../../constants';

const { KEY, VALUE, COLUMN_WIDTH } = XLSX_CONFIG;

describe('api/generate-xlsx/header-columns', () => {
  it('should return an array of header columns', () => {
    const mockSheetName = 'sheet name';

    const result = XLSX_HEADER_COLUMNS(mockSheetName);

    const expected = [
      { key: KEY, header: mockSheetName, width: COLUMN_WIDTH },
      { key: VALUE, header: '', width: COLUMN_WIDTH },
    ];

    expect(result).toEqual(expected);
  });
});
