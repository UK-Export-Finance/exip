import formatSortCode, { SORT_CODE_LENGTH } from '.';
import { DEFAULT } from '../../content-strings';

const { EMPTY } = DEFAULT;

describe('server/helpers/format-sort-code', () => {
  describe(`when the sort code has exactly ${SORT_CODE_LENGTH} digits`, () => {
    const mockSortCode = '123456';

    it('should return a formatted sort code', () => {
      const result = formatSortCode(mockSortCode);

      const expected = `$12${EMPTY}34${EMPTY}56`;

      expect(result).toEqual(expected);
    });
  });

  describe(`when the sort code has more than ${SORT_CODE_LENGTH} digits`, () => {
    const mockSortCode = '1234567';

    it(`should return ${EMPTY}`, () => {
      const result = formatSortCode(mockSortCode);

      expect(result).toEqual(EMPTY);
    });
  });

  describe(`when the sort code has less than ${SORT_CODE_LENGTH} digits`, () => {
    const mockSortCode = '12345';

    it(`should return ${EMPTY}`, () => {
      const result = formatSortCode(mockSortCode);

      expect(result).toEqual(EMPTY);
    });
  });

  describe('when the sort code has no length', () => {
    it(`should return ${EMPTY}`, () => {
      const result = formatSortCode('');

      expect(result).toEqual(EMPTY);
    });
  });
});
