import SECTION_NAMES from '../../../constants/XLSX-CONFIG/SECTION_NAMES';
import APPLICATION_INFORMATION_INDEXES from '../../../constants/XLSX-CONFIG/INDEXES/APPLICATION_INFORMATION';

const { APPLICATION_INFORMATION } = SECTION_NAMES;
const { EXPORTER_CONTACT_DETAILS, KEY_INFORMATION } = APPLICATION_INFORMATION_INDEXES;

/**
 * isTitleRow
 * Check if a row is a title row.
 * @param {string} sheetName: ExcelJS worksheet name
 * @param {number} rowNumber: Row number
 * @returns {boolean}
 */
const isTitleRow = (sheetName: string, rowNumber: number) => {
  const isInfoSheet = sheetName === APPLICATION_INFORMATION;

  const isInfoTitle = isInfoSheet && (rowNumber === EXPORTER_CONTACT_DETAILS || rowNumber === KEY_INFORMATION);

  const result = rowNumber === 1 || isInfoTitle;

  return result;
};

export default isTitleRow;
