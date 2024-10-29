import modifyRowStyles from '.';
import { XLSX_CONFIG } from '../../../constants';
import isTitleRow from '../is-title-row';
import { createMockWorksheet } from '../../../test-mocks';

const { FONT_SIZE } = XLSX_CONFIG;

describe('api/generate-xlsx/styled-columns/modify-row-styles', () => {
  const { mockWorksheet, mockSheetName } = createMockWorksheet();

  it('should add custom `alignment` and font size properties to each column', async () => {
    const result = modifyRowStyles(mockWorksheet, mockSheetName);

    result.eachRow((row, rowNumber) => {
      const isATitleRow = isTitleRow(mockSheetName, rowNumber);

      if (isATitleRow) {
        row.eachCell((cell, colNumber) => {
          const cellData = row.getCell(colNumber);

          expect(cellData.font.bold).toEqual(true);
          expect(cellData.font.size).toEqual(FONT_SIZE.TITLE);
        });
      } else {
        row.eachCell((cell, colNumber) => {
          const cellData = row.getCell(colNumber);

          expect(cellData.font.bold).toEqual(false);
          expect(cellData.font.size).toEqual(FONT_SIZE.DEFAULT);
        });
      }
    });
  });
});
