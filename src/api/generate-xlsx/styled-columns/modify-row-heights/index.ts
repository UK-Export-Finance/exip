import { Worksheet } from 'exceljs';
import { XLSX_CONFIG } from '../../../constants';
import SECTION_NAMES from '../../../constants/XLSX-CONFIG/SECTION_NAMES';

const { LARGE_ADDITIONAL_COLUMN_HEIGHT, ADDITIONAL_TITLE_COLUMN_HEIGHT } = XLSX_CONFIG;

const { APPLICATION_INFORMATION } = SECTION_NAMES;

/**
 * modifyRowHeights
 * Add custom heights to certain worksheet cells
 * @param {Array<number>} rowIndexes: Row indexes
 * @param {ExcelJS.Worksheet} worksheet: ExcelJS worksheet
 * @param {String} ExcelJS sheetName: worksheet name
 * @returns {ExcelJS.Worksheet} Modified ExcelJS worksheet
 */
const modifyRowHeights = (rowIndexes: Array<number>, worksheet: Worksheet, sheetName: string) => {
  const modifiedWorksheet = worksheet;

  modifiedWorksheet.getRow(1).height = ADDITIONAL_TITLE_COLUMN_HEIGHT;

  const isInfoSheet = sheetName === APPLICATION_INFORMATION;

  if (isInfoSheet) {
    modifiedWorksheet.getRow(8).height = ADDITIONAL_TITLE_COLUMN_HEIGHT;
    modifiedWorksheet.getRow(13).height = ADDITIONAL_TITLE_COLUMN_HEIGHT;
  }

  rowIndexes.forEach((rowIndex) => {
    modifiedWorksheet.getRow(rowIndex).height = LARGE_ADDITIONAL_COLUMN_HEIGHT;
  });

  return modifiedWorksheet;
};

export default modifyRowHeights;
