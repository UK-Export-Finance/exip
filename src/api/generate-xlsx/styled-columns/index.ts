import { Worksheet } from 'exceljs';
import XLSX_ROW_INDEXES from '../../constants/XLSX-CONFIG/INDEXES';
import modifyRowStyles from './modify-row-styles';
import modifyRowHeights from './modify-row-heights';
import { Application } from '../../types';

// TODO: unit test for getAdditionalRowHeightIndexes

/**
 * getAdditionalRowHeightIndexes
 * Get some specific row indexes for the XLSX.
 * These indexes are then used for styling purposes.
 * @param {Application} application
 * @param {String} sheetName: ExcelJS worksheet name
 * @returns {Array<number>} Row indexes
 */
export const getAdditionalRowHeightIndexes = (application: Application, sheetName: string) => {
  let INDEXES = [] as Array<number>;

  if (XLSX_ROW_INDEXES[sheetName]) {
    const sheetIndexes = XLSX_ROW_INDEXES[sheetName](application);

    INDEXES = Object.values(sheetIndexes);
  }

  return INDEXES;
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
  const withRowStyles = modifyRowStyles(worksheet, sheetName);

  const indexes = getAdditionalRowHeightIndexes(application, sheetName);

  const withRowHeights = modifyRowHeights(indexes, withRowStyles, sheetName);

  return withRowHeights;
};

export default styledColumns;
