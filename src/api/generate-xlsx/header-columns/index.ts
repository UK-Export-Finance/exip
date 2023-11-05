import { XLSX_CONFIG } from '../../constants';

const { KEY, VALUE, COLUMN_WIDTH } = XLSX_CONFIG;

/**
 * XLSX_HEADER_COLUMNS
 * Header columns for XLSX
 * @returns {Array} Columns for exceljs XLSX
 */
const XLSX_HEADER_COLUMNS = [
  { key: KEY.ID, header: KEY.COPY, width: COLUMN_WIDTH },
  { key: VALUE.ID, header: VALUE.COPY, width: COLUMN_WIDTH },
];

export default XLSX_HEADER_COLUMNS;
