import { Row, Worksheet } from 'exceljs';
import { XLSX_CONFIG, XLSX_ROW_INDEXES } from '../../constants';
import { Application } from '../../types';

const { LARGE_ADDITIONAL_COLUMN_HEIGHT, ADDITIONAL_TITLE_COLUMN_HEIGHT, FONT_SIZE } = XLSX_CONFIG;

/**
 * worksheetRowHeights
 * Add custom heights to certain worksheet cells
 * @param {Array} Title row indexes
 * @param {ExcelJS.Worksheet} ExcelJS worksheet
 * @returns {ExcelJS.Worksheet} ExcelJS worksheet
 */
export const worksheetRowHeights = (titleRowIndexes: Array<number>, rowIndexes: Array<number>, worksheet: Worksheet) => {
  const modifiedWorksheet = worksheet;

  titleRowIndexes.forEach((rowIndex) => {
    modifiedWorksheet.getRow(rowIndex).height = ADDITIONAL_TITLE_COLUMN_HEIGHT;
  });

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
const styledColumns = (application: Application, worksheet: Worksheet) => {
  let modifiedWorksheet = worksheet;

  const INDEXES = XLSX_ROW_INDEXES(application);

  const { TITLES, ...ROWS } = INDEXES;

  const TITLE_INDEXES = Object.values(TITLES);
  const ROW_INDEXES = Object.values(ROWS);

  modifiedWorksheet.eachRow((row: Row, rowNumber: number) => {
    row.eachCell((cell, colNumber) => {
      const modifiedRow = row;

      modifiedRow.getCell(colNumber).alignment = {
        vertical: 'top',
        wrapText: true,
      };

      const isTitleRow = TITLE_INDEXES.includes(rowNumber);

      modifiedRow.getCell(colNumber).font = {
        bold: Boolean(isTitleRow),
        size: isTitleRow ? FONT_SIZE.TITLE : FONT_SIZE.DEFAULT,
      };
    });
  });

  modifiedWorksheet = worksheetRowHeights(TITLE_INDEXES, ROW_INDEXES, modifiedWorksheet);

  return modifiedWorksheet;
};

export default styledColumns;
