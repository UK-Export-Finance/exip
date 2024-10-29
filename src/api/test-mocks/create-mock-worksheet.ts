import ExcelJS, { Worksheet } from 'exceljs';
import SECTION_NAMES from '../constants/XLSX-CONFIG/SECTION_NAMES';
import HEADER_COLUMNS from '../generate-xlsx/header-columns';
import mapApplicationToXLSX from '../generate-xlsx/map-application-to-XLSX';
import mockApplication from './mock-application';
import mockCountries from './mock-countries';

const { APPLICATION_INFORMATION } = SECTION_NAMES;

/**
 * createMockWorksheet
 * Create a mock ExcelJS worksheet
 * @returns {ExcelJS.Worksheet}
 */
export const createMockWorksheet = () => {
  const workbook = new ExcelJS.Workbook();

  const xlsxData = mapApplicationToXLSX(mockApplication, mockCountries);

  const sheetNames = Object.values(SECTION_NAMES);

  const mockWorksheets = [] as Array<Worksheet>;

  sheetNames.forEach((sheetName) => {
    const worksheet = workbook.addWorksheet(sheetName);

    worksheet.columns = HEADER_COLUMNS(sheetName);

    xlsxData[sheetName].forEach((row) => {
      worksheet.addRow(row);
    });

    mockWorksheets.push(worksheet);
  });

  const [mockWorksheet] = mockWorksheets;
  const mockSheetName = APPLICATION_INFORMATION;

  return {
    mockWorksheet,
    mockSheetName,
  };
};

export default createMockWorksheet;
