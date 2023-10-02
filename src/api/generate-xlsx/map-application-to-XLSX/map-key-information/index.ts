import { REFERENCE_NUMBER, DATE_SUBMITTED, TIME_SUBMITTED } from '../../../content-strings/fields/insurance';
import { XLSX } from '../../../content-strings';
import ACCOUNT from '../../../constants/field-ids/insurance/account';
import xlsxRow from '../helpers/xlsx-row';
import formatDate from '../../../helpers/format-date';
import formatTimeOfDay from '../helpers/format-time-of-day';
import { Application } from '../../../types';

const { FIELDS } = XLSX;

const { FIRST_NAME, LAST_NAME, EMAIL } = ACCOUNT;

/**
 * mapKeyInformation
 * Map key information for an application
 * @param {Application}
 * @returns {Array} Array of objects for XLSX generation
 */
const mapKeyInformation = (application: Application) => {
  const mapped = [
    xlsxRow(REFERENCE_NUMBER.SUMMARY.TITLE, application.referenceNumber),
    xlsxRow(DATE_SUBMITTED.SUMMARY.TITLE, formatDate(application.submissionDate, 'dd-MM-yyyy')),
    xlsxRow(TIME_SUBMITTED.SUMMARY.TITLE, formatTimeOfDay(application.submissionDate)),
    xlsxRow(FIELDS[FIRST_NAME], application.owner[FIRST_NAME]),
    xlsxRow(FIELDS[LAST_NAME], application.owner[LAST_NAME]),
    xlsxRow(FIELDS.APPLICANT_EMAIL_ADDRESS, application.owner[EMAIL]),
  ];

  return mapped;
};

export default mapKeyInformation;
