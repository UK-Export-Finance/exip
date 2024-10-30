import modifyRowHeights from '.';
import { XLSX_CONFIG } from '../../../constants';
import APPLICATION_INFORMATION_INDEXES from '../../../constants/XLSX-CONFIG/INDEXES/APPLICATION_INFORMATION';
import { createMockWorksheet } from '../../../test-mocks';

const { LARGE_ADDITIONAL_COLUMN_HEIGHT, ADDITIONAL_TITLE_COLUMN_HEIGHT } = XLSX_CONFIG;

const { EXPORTER_CONTACT_DETAILS, KEY_INFORMATION } = APPLICATION_INFORMATION_INDEXES;

describe('api/generate-xlsx/styled-columns/modify-row-heights', () => {
  const { mockWorksheet, mockSheetName } = createMockWorksheet();

  it('should add column heights to particular columns', async () => {
    const mockIndexes = [5, 6];

    const result = modifyRowHeights(mockIndexes, mockWorksheet, mockSheetName);

    result.eachRow((row, rowNumber) => {
      if (rowNumber === 1) {
        expect(row.height).toEqual(ADDITIONAL_TITLE_COLUMN_HEIGHT);
      }

      if (rowNumber === EXPORTER_CONTACT_DETAILS) {
        expect(row.height).toEqual(ADDITIONAL_TITLE_COLUMN_HEIGHT);
      }

      if (rowNumber === KEY_INFORMATION) {
        expect(row.height).toEqual(ADDITIONAL_TITLE_COLUMN_HEIGHT);
      }

      if (mockIndexes.includes(rowNumber)) {
        expect(row.height).toEqual(LARGE_ADDITIONAL_COLUMN_HEIGHT);
      }
    });
  });
});
