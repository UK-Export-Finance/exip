import ExcelJS from 'exceljs';
import styledColumns, { worksheetRowHeights } from '.';
import HEADER_COLUMNS from '../header-columns';
import mapApplicationToXLSX from '../map-application-to-XLSX';
import { XLSX_CONFIG } from '../../constants';
import { mockApplication } from '../../test-mocks';

const { COLUMN_INDEXES, ADDITIONAL_COLUMN_HEIGHT } = XLSX_CONFIG;

describe('api/generate-xlsx/styled-columns/index', () => {
  const workbook = new ExcelJS.Workbook();

  const worksheet = workbook.addWorksheet();

  worksheet.columns = HEADER_COLUMNS;

  describe('styledColumns', () => {
    it('should add custom `alignment` properties to each column', () => {
      const result = styledColumns(worksheet);

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

      const result = worksheetRowHeights(worksheet);

      const row1 = result.getRow(COLUMN_INDEXES.COMPANY_ADDRESS);
      expect(row1.height).toEqual(ADDITIONAL_COLUMN_HEIGHT * 2);

      const row2 = result.getRow(COLUMN_INDEXES.COMPANY_SIC_CODES);
      expect(row2.height).toEqual(ADDITIONAL_COLUMN_HEIGHT);

      const row3 = result.getRow(COLUMN_INDEXES.BROKER_ADDRESS);
      expect(row3.height).toEqual(ADDITIONAL_COLUMN_HEIGHT * 2);

      const row4 = result.getRow(COLUMN_INDEXES.BUYER_ADDRESS);
      expect(row4.height).toEqual(ADDITIONAL_COLUMN_HEIGHT * 2);

      const row5 = result.getRow(COLUMN_INDEXES.BUYER_CONTACT_DETAILS);
      expect(row5.height).toEqual(ADDITIONAL_COLUMN_HEIGHT * 2);
    });
  });
});
