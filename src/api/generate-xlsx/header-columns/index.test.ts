import XLSX_HEADER_COLUMNS from '.';
import { XLSX_CONFIG } from '../../constants';

const { KEY, VALUE, COLUMN_WIDTH } = XLSX_CONFIG;

describe('api/generate-xlsx/header-columns', () => {
  it('should return an array of header columns', () => {
    const expected = [
      { key: KEY.ID, header: KEY.COPY, width: COLUMN_WIDTH },
      { key: VALUE.ID, header: VALUE.COPY, width: COLUMN_WIDTH },
    ];

    expect(XLSX_HEADER_COLUMNS).toEqual(expected);
  });
});
