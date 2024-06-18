import { XLSX_CONFIG } from '../../../../constants';
import replaceCharacterCodesWithCharacters from '../../../../helpers/replace-character-codes-with-characters';

const { KEY, VALUE } = XLSX_CONFIG;

/**
 * xlsxRow
 * Generate a row for an exceljs XLSX
 * @returns {Object}
 */
const xlsxRow = (fieldName: string, answer?: string | number) => {
  console.info('Mapping XLSX row %s', fieldName);

  const value = answer || answer === 0 ? answer : '';

  const cleanValue = replaceCharacterCodesWithCharacters(String(value));

  const row = {
    [KEY.ID]: fieldName,
    [VALUE.ID]: cleanValue,
  };

  return row;
};

export default xlsxRow;
