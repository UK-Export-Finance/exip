import dotenv from 'dotenv';
import ExcelJS from 'exceljs';
import SECTION_NAMES from '../constants/XLSX-CONFIG/SECTION_NAMES';
import mapApplicationToXLSX from './map-application-to-XLSX';
import HEADER_COLUMNS from './header-columns';
import styledColumns from './styled-columns';
import { Application, Country } from '../types';

dotenv.config();

const { EXCELJS_PROTECTION_PASSWORD } = process.env;

/**
 * XLSX
 * Generate an XLSX file with exceljs
 * @param {Application} application
 * @param {Array<Country>} countries
 * @returns {Promise<String>} File path
 */
const XLSX = (application: Application, countries: Array<Country>): Promise<string> => {
  try {
    console.info('Generating XLSX file for application %s', application.id);

    const { referenceNumber } = application;

    const refNumber = String(referenceNumber);

    return new Promise((resolve) => {
      const filePath = `XLSX/${refNumber}.xlsx`;

      const xlsxData = mapApplicationToXLSX(application, countries);

      console.info('Generating XLSX file - creating a new workbook');

      const workbook = new ExcelJS.Workbook();

      console.info('Generating XLSX file - adding worksheets to workbook');

      const sheetNames = Object.values(SECTION_NAMES);

      sheetNames.forEach((sheetName) => {
        console.info('Generating XLSX file - adding %s worksheet', sheetName);

        let worksheet = workbook.addWorksheet(sheetName);

        console.info('Generating XLSX file - protecting %s worksheet from modification', sheetName);

        worksheet.protect(String(EXCELJS_PROTECTION_PASSWORD), {});

        console.info('Generating XLSX file - adding %s worksheet header columns', sheetName);

        worksheet.columns = HEADER_COLUMNS(sheetName);

        xlsxData[sheetName].forEach((row) => {
          console.info('Generating XLSX file - adding rows to %s worksheeet', sheetName);

          /**
           * NOTE: some rows are undefined.
           * Therefore, only add rows that have data.
           */
          if (row) {
            worksheet.addRow(row);
          }
        });

        console.info('Generating XLSX file - adding custom styles to %s worksheet', sheetName);

        /**
         * Add custom styles to each column in the worksheet.
         * This introduces e.g:
         * - bold heading rows.
         * - larger rows for address and SIC codes.
         */
        worksheet = styledColumns(application, worksheet, sheetName);
      });

      /**
       * Write the file,
       * return the file path
       */
      console.info('Generating XLSX file - writing file');

      workbook.xlsx.writeFile(filePath).then(() => resolve(filePath));
    });
  } catch (error) {
    console.error('Error generating XLSX file %O', error);

    throw new Error(`Generating XLSX file ${error}`);
  }
};

const generate = {
  XLSX,
};

export default generate;
