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
const csv = (application: Application) => {
  const { referenceNumber } = application;

  const filePath = `./csv/${referenceNumber}.csv`;

  const csvData = mapApplicationToCsv(application);

  stringify(csvData, { header: true }, (err, output) => {
    fs.writeFile(filePath, output, (result) => {
      return result;
    });
  });

  return filePath;
};

const generate = {
  csv,
};

export default generate;
