import mapPolicy from '.';
import { REFERENCE_NUMBER, DATE_SUBMITTED, TIME_SUBMITTED } from '../../../content-strings/fields/insurance';
import { XLSX } from '../../../content-strings';
import ACCOUNT from '../../../constants/field-ids/insurance/account';
import xlsxRow from '../helpers/xlsx-row';
import formatDate from '../../../helpers/format-date';
import formatTimeOfDay from '../helpers/format-time-of-day';
import { mockApplication } from '../../../test-mocks';

const { FIELDS } = XLSX;

const { FIRST_NAME, LAST_NAME, EMAIL } = ACCOUNT;

describe('api/generate-xlsx/map-application-to-xlsx/map-key-information', () => {
  it('should return an array of mapped key information', () => {
    const result = mapPolicy(mockApplication);

    const expected = [
      xlsxRow(REFERENCE_NUMBER.SUMMARY.TITLE, mockApplication.referenceNumber),
      xlsxRow(DATE_SUBMITTED.SUMMARY.TITLE, formatDate(mockApplication.submissionDate, 'dd-MM-yyyy')),
      xlsxRow(TIME_SUBMITTED.SUMMARY.TITLE, formatTimeOfDay(mockApplication.submissionDate)),
      xlsxRow(FIELDS[FIRST_NAME], mockApplication.owner[FIRST_NAME]),
      xlsxRow(FIELDS[LAST_NAME], mockApplication.owner[LAST_NAME]),
      xlsxRow(FIELDS.APPLICANT_EMAIL_ADDRESS, mockApplication.owner[EMAIL]),
    ];

    expect(result).toEqual(expected);
  });
});
