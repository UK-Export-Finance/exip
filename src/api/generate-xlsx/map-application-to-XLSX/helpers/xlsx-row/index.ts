import { XLSX_CONFIG } from '../../../../constants';
import replaceCharacterCodesWithCharacters from '../../../../helpers/replace-character-codes-with-characters';

const { KEY, VALUE } = XLSX_CONFIG;

/**
 * xlsxRow
 * Generate a row for an exceljs XLSX
 * @returns {Object}
 */
const xlsxRow = (fieldName: string, answer?: string | number) => {
  if (fieldName) {
    console.info('Mapping XLSX row %s', fieldName);

    const value = answer || answer === 0 ? answer : '';

    const cleanValue = replaceCharacterCodesWithCharacters(String(value));

    const row = {
      [KEY]: fieldName,
      [VALUE]: cleanValue,
    };

    return row;
  }
};

export default xlsxRow;
