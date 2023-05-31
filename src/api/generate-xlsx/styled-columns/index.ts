import { Row, Worksheet } from 'exceljs';
import { XLSX_CONFIG } from '../../constants';

const { ADDITIONAL_COLUMN_HEIGHT, ADDITIONAL_TITLE_COLUMN_HEIGHT, ROW_INDEXES, TITLE_ROW_INDEXES, FONT_SIZE } = XLSX_CONFIG;

/**
 * worksheetRowHeights
 * Add custom heights to certain worksheet cells
 * @param {ExcelJS.Worksheet} ExcelJS worksheet
 * @returns {ExcelJS.Worksheet} ExcelJS worksheet
 */
export const worksheetRowHeights = (worksheet: Worksheet) => {
  const modifiedWorksheet = worksheet;

  modifiedWorksheet.getRow(ROW_INDEXES.COMPANY_ADDRESS).height = ADDITIONAL_COLUMN_HEIGHT * 2;
  modifiedWorksheet.getRow(ROW_INDEXES.COMPANY_SIC_CODES).height = ADDITIONAL_COLUMN_HEIGHT;
  modifiedWorksheet.getRow(ROW_INDEXES.BROKER_ADDRESS).height = ADDITIONAL_COLUMN_HEIGHT * 2;
  modifiedWorksheet.getRow(ROW_INDEXES.BUYER_ADDRESS).height = ADDITIONAL_COLUMN_HEIGHT * 2;
  modifiedWorksheet.getRow(ROW_INDEXES.BUYER_CONTACT_DETAILS).height = ADDITIONAL_COLUMN_HEIGHT * 2;

  Object.values(TITLE_ROW_INDEXES).forEach((rowIndex) => {
    modifiedWorksheet.getRow(rowIndex).height = ADDITIONAL_TITLE_COLUMN_HEIGHT;
  });

  return modifiedWorksheet;
};

/**
 * styledColumns
 * Add custom styles to each worksheet cell
 * @param {ExcelJS.Worksheet} ExcelJS worksheet
 * @returns {ExcelJS.Worksheet} ExcelJS worksheet
 */
const styledColumns = (worksheet: Worksheet) => {
  let modifiedWorksheet = worksheet;

  modifiedWorksheet.eachRow((row: Row, rowNumber: number) => {
    row.eachCell((cell, colNumber) => {
      const modifiedRow = row;

      modifiedRow.getCell(colNumber).alignment = {
        vertical: 'top',
        wrapText: true,
      };

      const isTitleRow = Object.values(TITLE_ROW_INDEXES).includes(rowNumber);

      modifiedRow.getCell(colNumber).font = {
        bold: Boolean(isTitleRow),
        size: isTitleRow ? FONT_SIZE.TITLE : FONT_SIZE.DEFAULT,
      };
    });
  });

  modifiedWorksheet = worksheetRowHeights(modifiedWorksheet);

  return modifiedWorksheet;
};

export default styledColumns;
