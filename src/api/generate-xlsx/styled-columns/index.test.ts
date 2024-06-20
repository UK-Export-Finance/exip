import ExcelJS from 'exceljs';
import styledColumns, { worksheetRowHeights } from '.';
import HEADER_COLUMNS from '../header-columns';
import mapApplicationToXLSX from '../map-application-to-XLSX';
import { XLSX_CONFIG, XLSX_ROW_INDEXES } from '../../constants';
import { generateSubmittedApplication } from '../../test-helpers';
import { mockApplicationMinimalBrokerBuyerAndCompany as mockApplication, mockCountries } from '../../test-mocks';

const { LARGE_ADDITIONAL_COLUMN_HEIGHT, ADDITIONAL_TITLE_COLUMN_HEIGHT, FONT_SIZE } = XLSX_CONFIG;

describe('api/generate-xlsx/styled-columns/index', () => {
  const workbook = new ExcelJS.Workbook();

  const worksheet = workbook.addWorksheet();

  worksheet.columns = HEADER_COLUMNS;

  const INDEXES = XLSX_ROW_INDEXES(mockApplication);

  const { TITLES, ...ROWS } = INDEXES;

  const TITLE_INDEXES = Object.values(TITLES);
  const ROW_INDEXES = Object.values(ROWS);

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
    it('should add column heights to particular columns', async () => {
      const submittedApplication = await generateSubmittedApplication();

      const xlsxData = mapApplicationToXLSX(submittedApplication, mockCountries);

      xlsxData.forEach((row) => {
        worksheet.addRow(row);
      });

      const result = worksheetRowHeights(TITLE_INDEXES, ROW_INDEXES, worksheet);

      TITLE_INDEXES.forEach((rowIndex) => {
        const row = result.getRow(rowIndex);

        expect(row.height).toEqual(ADDITIONAL_TITLE_COLUMN_HEIGHT);
      });

      ROW_INDEXES.forEach((rowIndex) => {
        const row = result.getRow(rowIndex);

        expect(row.height).toEqual(LARGE_ADDITIONAL_COLUMN_HEIGHT);
      });
    });
  });
});
