import ExcelJS from 'exceljs';
import styledColumns, { worksheetRowHeights } from '.';
import { XLSX_CONFIG } from '../../constants';
import { mockApplicationMinimalBrokerBuyerAndCompany as mockApplication } from '../../test-mocks';

const { LARGE_ADDITIONAL_COLUMN_HEIGHT, ADDITIONAL_TITLE_COLUMN_HEIGHT, FONT_SIZE } = XLSX_CONFIG;

describe('api/generate-xlsx/styled-columns/index', () => {
  const mockSheetName = 'mock sheet name';

  const workbook = new ExcelJS.Workbook();

  const worksheet = workbook.addWorksheet(mockSheetName);

  describe('worksheetRowHeights', () => {
    it('should add column heights to particular columns', async () => {
      const mockIndexes = [5, 6];

      const result = worksheetRowHeights(mockIndexes, worksheet);

      result.eachRow((row, rowNumber) => {
        if (rowNumber === 1) {
          expect(row.height).toEqual(ADDITIONAL_TITLE_COLUMN_HEIGHT);
        } else if (mockIndexes.includes(rowNumber)) {
          expect(row.height).toEqual(LARGE_ADDITIONAL_COLUMN_HEIGHT);
        }
      });
    });
  });

  describe('styledColumns', () => {
    it('should add custom `alignment` and font size properties to each column', async () => {
      const result = styledColumns(mockApplication, worksheet, mockSheetName);

      result.eachRow((row, rowNumber) => {
        const isHeaderRow = rowNumber === 1;

        if (isHeaderRow) {
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
});
