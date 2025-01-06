import { Row, Worksheet } from 'exceljs';
import { XLSX_CONFIG } from '../../constants';
import XLSX_ROW_INDEXES from '../../constants/XLSX-CONFIG/INDEXES';
import SECTION_NAMES from '../../constants/XLSX-CONFIG/SECTION_NAMES';
import { Application } from '../../types';

const { LARGE_ADDITIONAL_COLUMN_HEIGHT, ADDITIONAL_TITLE_COLUMN_HEIGHT, FONT_SIZE } = XLSX_CONFIG;

const { APPLICATION_INFORMATION } = SECTION_NAMES;

/**
 * worksheetRowHeights
 * Add custom heights to certain worksheet cells
 * @param {Array<number>} rowIndexes: Row indexes
 * @param {ExcelJS.Worksheet} worksheet: ExcelJS worksheet
 * @param {String} ExcelJS sheetName: worksheet name
 * @returns {ExcelJS.Worksheet} ExcelJS worksheet
 */
export const worksheetRowHeights = (rowIndexes: Array<number>, worksheet: Worksheet, sheetName: string) => {
  const modifiedWorksheet = worksheet;

  modifiedWorksheet.getRow(1).height = ADDITIONAL_TITLE_COLUMN_HEIGHT;

  const isInformationSheet = sheetName === APPLICATION_INFORMATION;

  if (isInformationSheet) {
    modifiedWorksheet.getRow(8).height = ADDITIONAL_TITLE_COLUMN_HEIGHT;
    modifiedWorksheet.getRow(13).height = ADDITIONAL_TITLE_COLUMN_HEIGHT;
  }

  rowIndexes.forEach((rowIndex) => {
    modifiedWorksheet.getRow(rowIndex).height = LARGE_ADDITIONAL_COLUMN_HEIGHT;
  });

  return modifiedWorksheet;
};

/**
 * styledColumns
 * Add custom styles to each worksheet cell
 * @param {Application} application
 * @param {ExcelJS.Worksheet} worksheet: ExcelJS worksheet
 * @param {String} sheetName: ExcelJS worksheet name
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

      const isInformationSheet = sheetName === APPLICATION_INFORMATION;
      const isInformationTitleOne = isInformationSheet && rowNumber === 8;
      const isInformationTitleTwo = isInformationSheet && rowNumber === 13;

      const isInformationTitle = isInformationTitleOne || isInformationTitleTwo;

      const isTitleRow = rowNumber === 1 || isInformationTitle;

      modifiedRow.getCell(colNumber).font = {
        bold: Boolean(isTitleRow),
        size: isTitleRow ? FONT_SIZE.TITLE : FONT_SIZE.DEFAULT,
      };
    });
  });

  let INDEXES = [] as Array<number>;

  if (XLSX_ROW_INDEXES[sheetName]) {
    const sheetIndexes = XLSX_ROW_INDEXES[sheetName](application);

    INDEXES = Object.values(sheetIndexes);
  }

  modifiedWorksheet = worksheetRowHeights(INDEXES, modifiedWorksheet, sheetName);

  return modifiedWorksheet;
};

export default styledColumns;
