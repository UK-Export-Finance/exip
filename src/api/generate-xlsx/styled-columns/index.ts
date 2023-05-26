import { Row, Worksheet } from 'exceljs';
import { XLSX_CONFIG } from '../../constants';

const { COLUMN_INDEXES, ADDITIONAL_COLUMN_HEIGHT } = XLSX_CONFIG;

/**
 * worksheetRowHeights
 * Add custom heights to certain worksheet cells
 * @param {ExcelJS.Worksheet} ExcelJS worksheet
 * @returns {ExcelJS.Worksheet} ExcelJS worksheet
 */
export const worksheetRowHeights = (worksheet: Worksheet) => {
  const modifiedWorksheet = worksheet;

  modifiedWorksheet.getRow(COLUMN_INDEXES.COMPANY_ADDRESS).height = ADDITIONAL_COLUMN_HEIGHT * 2;
  modifiedWorksheet.getRow(COLUMN_INDEXES.COMPANY_SIC_CODES).height = ADDITIONAL_COLUMN_HEIGHT;
  modifiedWorksheet.getRow(COLUMN_INDEXES.BROKER_ADDRESS).height = ADDITIONAL_COLUMN_HEIGHT * 2;
  modifiedWorksheet.getRow(COLUMN_INDEXES.BUYER_ADDRESS).height = ADDITIONAL_COLUMN_HEIGHT * 2;
  modifiedWorksheet.getRow(COLUMN_INDEXES.BUYER_CONTACT_DETAILS).height = ADDITIONAL_COLUMN_HEIGHT * 2;

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

  modifiedWorksheet.eachRow((row: Row) => {
    row.eachCell((cell, colNumber) => {
      const modifiedRow = row;

      modifiedRow.getCell(colNumber).alignment = {
        vertical: 'top',
        wrapText: true,
      };
    });
  });

  modifiedWorksheet = worksheetRowHeights(modifiedWorksheet);

  return modifiedWorksheet;
};

export default styledColumns;
