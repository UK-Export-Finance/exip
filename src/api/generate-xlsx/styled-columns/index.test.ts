import ExcelJS from 'exceljs';
import styledColumns, { worksheetRowHeights } from '.';
import HEADER_COLUMNS from '../header-columns';
import mapApplicationToXLSX from '../map-application-to-XLSX';
import { XLSX_CONFIG } from '../../constants';
import { mockApplication } from '../../test-mocks';

const { ROW_INDEXES, ADDITIONAL_COLUMN_HEIGHT, FONT_SIZE } = XLSX_CONFIG();

describe('api/generate-xlsx/styled-columns/index', () => {
  const workbook = new ExcelJS.Workbook();

  const worksheet = workbook.addWorksheet();

  worksheet.columns = HEADER_COLUMNS;

  const TITLE_INDEXES = Object.values(XLSX_CONFIG(mockApplication).TITLE_ROW_INDEXES);

  describe('styledColumns', () => {
    it('should add custom `alignment` and font size properties to each column', () => {
      const result = styledColumns(mockApplication, worksheet);

      result.eachRow((row, rowNumber) => {
        row.eachCell((cell, colNumber) => {
          const cellData = row.getCell(colNumber);

          const expectedAlignment = {
            vertical: 'top',
            wrapText: true,
          };

          expect(cellData.alignment).toEqual(expectedAlignment);

          const isTitleRow = TITLE_INDEXES.includes(rowNumber);

          if (!isTitleRow) {
            expect(cellData.font.size).toEqual(FONT_SIZE.DEFAULT);
          }
        });
      });
    });

    it('should add bold font style and different font size to title rows', () => {
      const result = styledColumns(mockApplication, worksheet);

      const expectedRows = TITLE_INDEXES;

      expectedRows.forEach((rowIndex) => {
        const row = result.getRow(rowIndex);

        row.eachCell((cell) => {
          expect(cell.style.font?.bold).toEqual(true);

          expect(cell.style.font?.size).toEqual(FONT_SIZE.TITLE);
        });
      });

      result.eachRow((row) => {
        row.eachCell((cell, colNumber) => {
          const cellData = row.getCell(colNumber);

          const expected = {
            vertical: 'top',
            wrapText: true,
          };

          expect(cellData.alignment).toEqual(expected);
        });
      });
    });
  });

  describe('worksheetRowHeights', () => {
    it('should add column heights to particular columns', () => {
      const xlsxData = mapApplicationToXLSX(mockApplication);

      xlsxData.forEach((row) => {
        worksheet.addRow(row);
      });

      const result = worksheetRowHeights(TITLE_INDEXES, worksheet);

      const row1 = result.getRow(ROW_INDEXES.COMPANY_ADDRESS);
      expect(row1.height).toEqual(ADDITIONAL_COLUMN_HEIGHT * 2);

      const row2 = result.getRow(ROW_INDEXES.COMPANY_SIC_CODES);
      expect(row2.height).toEqual(ADDITIONAL_COLUMN_HEIGHT);

      const row3 = result.getRow(ROW_INDEXES.BROKER_ADDRESS);
      expect(row3.height).toEqual(ADDITIONAL_COLUMN_HEIGHT * 2);

      const row4 = result.getRow(ROW_INDEXES.BUYER_ADDRESS);
      expect(row4.height).toEqual(ADDITIONAL_COLUMN_HEIGHT * 2);

      const row5 = result.getRow(ROW_INDEXES.BUYER_CONTACT_DETAILS);
      expect(row5.height).toEqual(ADDITIONAL_COLUMN_HEIGHT * 2);
    });
  });
});
