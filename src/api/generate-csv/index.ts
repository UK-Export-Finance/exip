import fs from 'fs';
import { stringify } from 'csv-stringify';
import mapApplicationToCsv from './map-application-to-csv';
import { Application } from '../types';

const csv = (application: Application) => {
  const { referenceNumber } = application;

  const filePath = `./csv/${referenceNumber}.csv`;

  const csvData = mapApplicationToCsv(application);

  // maybe don't need header: true?
  stringify(csvData, { header: true }, (err, output) => {
    // fs.writeFile(__dirname + '/spike-POC.csv', output, (result) => {
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
