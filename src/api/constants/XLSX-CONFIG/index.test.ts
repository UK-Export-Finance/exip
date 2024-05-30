import { XLSX_CONFIG } from '.';

describe('api/constants/XLSX-CONFIG', () => {
  describe('XLSX_CONFIG', () => {
    it('should return a config for XLSX', () => {
      const result = XLSX_CONFIG;

      const expected = {
        KEY: {
          ID: 'field',
          COPY: 'Field',
        },
        VALUE: {
          ID: 'answer',
          COPY: 'Answer',
        },
        COLUMN_WIDTH: 85,
        ADDITIONAL_TITLE_COLUMN_HEIGHT: 25,
        ADDITIONAL_COLUMN_HEIGHT: 50,
        LARGE_ADDITIONAL_COLUMN_HEIGHT: 50 * 2,
        FONT_SIZE: {
          DEFAULT: 11,
          TITLE: 14,
        },
      };

      expect(result).toEqual(expected);
    });
  });
});
