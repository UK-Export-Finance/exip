import { Row, Worksheet } from 'exceljs';
import { XLSX_CONFIG } from '../../constants';
import XLSX_ROW_INDEXES from '../../constants/XLSX-CONFIG/INDEXES';
import { Application } from '../../types';

const { LARGE_ADDITIONAL_COLUMN_HEIGHT, ADDITIONAL_TITLE_COLUMN_HEIGHT, FONT_SIZE } = XLSX_CONFIG;

/**
 * worksheetRowHeights
 * Add custom heights to certain worksheet cells
 * @param {Array} rowIndexes: Row indexes
 * @param {ExcelJS.Worksheet} ExcelJS worksheet
 * @returns {ExcelJS.Worksheet} ExcelJS worksheet
 */
export const worksheetRowHeights = (rowIndexes: Array<number>, worksheet: Worksheet) => {
  const modifiedWorksheet = worksheet;

  modifiedWorksheet.getRow(1).height = ADDITIONAL_TITLE_COLUMN_HEIGHT;

  rowIndexes.forEach((rowIndex) => {
    modifiedWorksheet.getRow(rowIndex).height = LARGE_ADDITIONAL_COLUMN_HEIGHT;
  });

  return modifiedWorksheet;
};

/**
 * styledColumns
 * Add custom styles to each worksheet cell
 * @param {Application}
 * @param {ExcelJS.Worksheet} ExcelJS worksheet
 * @returns {ExcelJS.Worksheet} ExcelJS worksheet
 */
const styledColumns = (application: Application, worksheet: Worksheet, sheetName: string) => {
  let modifiedWorksheet = worksheet;

  modifiedWorksheet.eachRow((row: Row, rowNumber: number) => {
    row.eachCell((cell, colNumber) => {
      const modifiedRow = row;

      modifiedRow.getCell(colNumber).alignment = {
        vertical: 'top',
        wrapText: true,
      };

      const isHeaderRow = rowNumber === 1;

      modifiedRow.getCell(colNumber).font = {
        bold: Boolean(isHeaderRow),
        size: isHeaderRow ? FONT_SIZE.TITLE : FONT_SIZE.DEFAULT,
      };
    });
  });

  let INDEXES = [] as Array<number>;

  if (XLSX_ROW_INDEXES[sheetName]) {
    const sheetIndexes = XLSX_ROW_INDEXES[sheetName](application);

    INDEXES = Object.values(sheetIndexes);
  }

  modifiedWorksheet = worksheetRowHeights(INDEXES, modifiedWorksheet);

  return modifiedWorksheet;
};

export default styledColumns;
