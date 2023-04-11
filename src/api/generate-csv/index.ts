import fs from 'fs';
import { stringify } from 'csv-stringify';
import mapApplicationToCsv from './map-application-to-csv';
import { Application } from '../types';

/**
 * csv
 * Generate a CSV file
 * @param {Object} Application
 * @returns {String} File path
 */
const csv = (application: Application): Promise<string> => {
  try {
    console.info('Generating CSV file');

    const { referenceNumber } = application;

    return new Promise((resolve) => {
      const filePath = `csvs/${referenceNumber}.csv`;

      const csvData = mapApplicationToCsv(application);

      stringify(csvData, { header: true }, (err, output) => {
        fs.writeFile(filePath, output, () => resolve(String(filePath)));
      });
    });
  } catch (err) {
    console.error(err);

    throw new Error(`Generating CSV file ${err}`);
  }
};

const generate = {
  csv,
};

export default generate;
