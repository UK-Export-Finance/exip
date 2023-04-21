import { REFERENCE_NUMBER, DATE_SUBMITTED, TIME_SUBMITTED } from '../../../content-strings/fields/insurance';
import { CSV } from '../../../content-strings';
import ACCOUNT from '../../../constants/field-ids/insurance/account';
import csvRow from '../helpers/csv-row';
import formatDate from '../helpers/format-date';
import formatTimeOfDay from '../helpers/format-time-of-day';
import { Application } from '../../../types';

const { FIELDS } = CSV;

const { FIRST_NAME, LAST_NAME, EMAIL } = ACCOUNT;

/**
 * mapKeyInformation
 * Map key information for an application
 * @param {Object} Application
 * @returns {Array} Array of objects for CSV generation
 */
const mapKeyInformation = (application: Application) => {
  const mapped = [
    csvRow(REFERENCE_NUMBER.SUMMARY.TITLE, application.referenceNumber),
    csvRow(DATE_SUBMITTED.SUMMARY.TITLE, formatDate(application.submissionDate)),
    csvRow(TIME_SUBMITTED.SUMMARY.TITLE, formatTimeOfDay(application.submissionDate)),
    csvRow(FIELDS[FIRST_NAME], application.exporter[FIRST_NAME]),
    csvRow(FIELDS[LAST_NAME], application.exporter[LAST_NAME]),
    csvRow(FIELDS[EMAIL], application.exporter[EMAIL]),
  ];

  return mapped;
};

export default mapKeyInformation;
