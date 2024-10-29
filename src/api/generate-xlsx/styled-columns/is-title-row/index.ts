import SECTION_NAMES from '../../../constants/XLSX-CONFIG/SECTION_NAMES';

const { APPLICATION_INFORMATION } = SECTION_NAMES;

/**
 * isTitleRow
 * Check if a row is a title row.
 * @param {String} sheetName: ExcelJS worksheet name
 * @param {Integer} rowNumber: Row number
 * @returns {Boolean}
 */
const isTitleRow = (sheetName: string, rowNumber: number) => {
  const isInfoSheet = sheetName === APPLICATION_INFORMATION;
  const isInfoTitleOne = isInfoSheet && rowNumber === 8;
  const isInfoTitleTwo = isInfoSheet && rowNumber === 13;

  const isInfoTitle = isInfoTitleOne || isInfoTitleTwo;

  const result = rowNumber === 1 || isInfoTitle;

  return result;
};

export default isTitleRow;
