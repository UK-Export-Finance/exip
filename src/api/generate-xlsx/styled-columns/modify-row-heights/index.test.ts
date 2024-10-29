import modifyRowHeights from '.';
import { XLSX_CONFIG } from '../../../constants';
import { createMockWorksheet } from '../../../test-mocks';

const { LARGE_ADDITIONAL_COLUMN_HEIGHT, ADDITIONAL_TITLE_COLUMN_HEIGHT } = XLSX_CONFIG;

describe('api/generate-xlsx/styled-columns/modify-row-heights', () => {
  const { mockWorksheet, mockSheetName } = createMockWorksheet();

  it('should add column heights to particular columns', async () => {
    const mockIndexes = [5, 6];

    const result = modifyRowHeights(mockIndexes, mockWorksheet, mockSheetName);

    result.eachRow((row, rowNumber) => {
      if (rowNumber === 1) {
        expect(row.height).toEqual(ADDITIONAL_TITLE_COLUMN_HEIGHT);
      } else if (mockIndexes.includes(rowNumber)) {
        expect(row.height).toEqual(LARGE_ADDITIONAL_COLUMN_HEIGHT);
      }
    });
  });
});
