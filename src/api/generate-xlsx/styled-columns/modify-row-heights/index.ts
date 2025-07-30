import { Worksheet } from 'exceljs';
import { XLSX_CONFIG } from '../../../constants';
import SECTION_NAMES from '../../../constants/XLSX-CONFIG/SECTION_NAMES';
import APPLICATION_INFORMATION_INDEXES from '../../../constants/XLSX-CONFIG/INDEXES/APPLICATION_INFORMATION';

const { LARGE_ADDITIONAL_COLUMN_HEIGHT, ADDITIONAL_TITLE_COLUMN_HEIGHT } = XLSX_CONFIG;

const { APPLICATION_INFORMATION } = SECTION_NAMES;

const { EXPORTER_CONTACT_DETAILS, KEY_INFORMATION } = APPLICATION_INFORMATION_INDEXES;

/**
 * modifyRowHeights
 * Add custom heights to certain worksheet rows
 * @param {Array<number>} rowIndexes: Row indexes
 * @param {ExcelJS.Worksheet} worksheet: ExcelJS worksheet
 * @param {string} ExcelJS sheetName: worksheet name
 * @returns {ExcelJS.Worksheet} Modified ExcelJS worksheet
 */
const modifyRowHeights = (rowIndexes: Array<number>, worksheet: Worksheet, sheetName: string) => {
  const modifiedWorksheet = worksheet;

  modifiedWorksheet.getRow(1).height = ADDITIONAL_TITLE_COLUMN_HEIGHT;

  if (sheetName === APPLICATION_INFORMATION) {
    modifiedWorksheet.getRow(EXPORTER_CONTACT_DETAILS).height = ADDITIONAL_TITLE_COLUMN_HEIGHT;
    modifiedWorksheet.getRow(KEY_INFORMATION).height = ADDITIONAL_TITLE_COLUMN_HEIGHT;
  }

  rowIndexes.forEach((rowIndex) => {
    modifiedWorksheet.getRow(rowIndex).height = LARGE_ADDITIONAL_COLUMN_HEIGHT;
  });

  return modifiedWorksheet;
};

export default modifyRowHeights;
