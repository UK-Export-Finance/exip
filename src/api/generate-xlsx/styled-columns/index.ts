import { Row, Worksheet } from 'exceljs';
import { XLSX_CONFIG } from '../../constants';
import { Application } from '../../types';

const { ADDITIONAL_COLUMN_HEIGHT, LARGE_ADDITIONAL_COLUMN_HEIGHT, ADDITIONAL_TITLE_COLUMN_HEIGHT, ROW_INDEXES, FONT_SIZE } = XLSX_CONFIG();

/**
 * worksheetRowHeights
 * Add custom heights to certain worksheet cells
 * @param {Array} Title row indexes
 * @param {ExcelJS.Worksheet} ExcelJS worksheet
 * @returns {ExcelJS.Worksheet} ExcelJS worksheet
 */
export const worksheetRowHeights = (titleRowIndexes: Array<number>, worksheet: Worksheet) => {
  const modifiedWorksheet = worksheet;

  modifiedWorksheet.getRow(ROW_INDEXES.COMPANY_ADDRESS).height = LARGE_ADDITIONAL_COLUMN_HEIGHT;
  modifiedWorksheet.getRow(ROW_INDEXES.COMPANY_SIC_CODES).height = ADDITIONAL_COLUMN_HEIGHT;
  modifiedWorksheet.getRow(ROW_INDEXES.BROKER_ADDRESS).height = LARGE_ADDITIONAL_COLUMN_HEIGHT;
  modifiedWorksheet.getRow(ROW_INDEXES.BUYER_ADDRESS).height = LARGE_ADDITIONAL_COLUMN_HEIGHT;
  modifiedWorksheet.getRow(ROW_INDEXES.BUYER_CONTACT_DETAILS).height = LARGE_ADDITIONAL_COLUMN_HEIGHT;

  Object.values(titleRowIndexes).forEach((rowIndex) => {
    modifiedWorksheet.getRow(rowIndex).height = ADDITIONAL_TITLE_COLUMN_HEIGHT;
  });

  return modifiedWorksheet;
};

/**
 * styledColumns
 * Add custom styles to each worksheet cell
 * @param {Object} Application
 * @param {ExcelJS.Worksheet} ExcelJS worksheet
 * @returns {ExcelJS.Worksheet} ExcelJS worksheet
 */
const styledColumns = (application: Application, worksheet: Worksheet) => {
  let modifiedWorksheet = worksheet;

  const TITLE_INDEXES = Object.values(XLSX_CONFIG(application).TITLE_ROW_INDEXES);

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

  modifiedWorksheet = worksheetRowHeights(TITLE_INDEXES, modifiedWorksheet);

  return modifiedWorksheet;
};

export default styledColumns;
