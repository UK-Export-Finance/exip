import { XLSX_CONFIG } from '../../../../constants';

const { KEY, VALUE } = XLSX_CONFIG;

/**
 * xlsxRow
 * Generate a row for an exceljs XLSX
 * @returns {Object}
 */
const xlsxRow = (fieldName: string, answer?: string | number) => {
  const value = answer || answer === 0 ? answer : '';

  const row = {
    [KEY.ID]: fieldName,
    [VALUE.ID]: String(value),
  };

  return row;
};

export default xlsxRow;
