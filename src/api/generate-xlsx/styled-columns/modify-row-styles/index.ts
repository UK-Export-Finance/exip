import { Row, Worksheet } from 'exceljs';
import { XLSX_CONFIG } from '../../../constants';
import isTitleRow from '../is-title-row';

const { FONT_SIZE } = XLSX_CONFIG;

/**
 * modifyRowStyles
 * Add row styles to certain worksheet rows
 * @param {ExcelJS.Worksheet} worksheet: ExcelJS worksheet
 * @param {String} ExcelJS sheetName: worksheet name
 * @returns {ExcelJS.Worksheet} Modified ExcelJS worksheet
 */
const modifyRowStyles = (worksheet: Worksheet, sheetName: string) => {
  worksheet.eachRow((row: Row, rowNumber: number) => {
    row.eachCell((cell, colNumber) => {
      const modifiedRow = row;

      modifiedRow.getCell(colNumber).alignment = {
        vertical: 'top',
        wrapText: true,
      };

      const isATitleRow = isTitleRow(sheetName, rowNumber);

      modifiedRow.getCell(colNumber).font = {
        bold: Boolean(isATitleRow),
        size: isATitleRow ? FONT_SIZE.TITLE : FONT_SIZE.DEFAULT,
      };
    });
  });

  return worksheet;
};

export default modifyRowStyles;
