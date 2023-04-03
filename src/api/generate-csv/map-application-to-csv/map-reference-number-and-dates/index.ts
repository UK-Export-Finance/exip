import { REFERENCE_NUMBER, DATE_SUBMITTED, TIME_SUBMITTED } from '../../../content-strings/fields/insurance';
import csvRow from '../helpers/csv-row';
import formatDate from '../helpers/format-date';
import formatTimeOfDay from '../helpers/format-time-of-day';
import { Application } from '../../../types';

/**
 * mapReferenceNumberAndDates
 * Map an application's reference number and date fields into an array of objects for CSV generation
 * @param {Object} Application
 * @returns {Array} Array of objects for CSV generation
 */
const mapReferenceNumberAndDates = (application: Application) => {
  const mapped = [
    csvRow(REFERENCE_NUMBER.SUMMARY.TITLE, application.referenceNumber),
    csvRow(DATE_SUBMITTED.SUMMARY.TITLE, formatDate(application.submissionDate)),
    csvRow(TIME_SUBMITTED.SUMMARY.TITLE, formatTimeOfDay(application.submissionDate)),
  ];

  return mapped;
};

export default mapReferenceNumberAndDates;
