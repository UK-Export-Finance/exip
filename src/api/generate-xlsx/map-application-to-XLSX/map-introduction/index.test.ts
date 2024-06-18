import mapIntroduction from '.';
import { DATE_FORMAT } from '../../../constants';
import { REFERENCE_NUMBER, DATE_SUBMITTED, TIME_SUBMITTED } from '../../../content-strings/fields/insurance';
import { XLSX } from '../../../content-strings';
import FIELD_IDS from '../../../constants/field-ids/insurance/account';
import xlsxRow from '../helpers/xlsx-row';
import formatDate from '../../../helpers/format-date';
import formatTimeOfDay from '../helpers/format-time-of-day';
import { mockApplication } from '../../../test-mocks';

const { FIELDS } = XLSX;

const { FIRST_NAME, LAST_NAME, EMAIL } = FIELD_IDS;

describe('api/generate-xlsx/map-application-to-xlsx/map-introduction', () => {
  it('should return an array of introductory information', () => {
    const result = mapIntroduction(mockApplication);

    const expected = [
      xlsxRow(REFERENCE_NUMBER.SUMMARY.TITLE, mockApplication.referenceNumber),
      xlsxRow(DATE_SUBMITTED.SUMMARY.TITLE, formatDate(mockApplication.submissionDate, DATE_FORMAT.XLSX)),
      xlsxRow(TIME_SUBMITTED.SUMMARY.TITLE, formatTimeOfDay(mockApplication.submissionDate)),
      xlsxRow(FIELDS[FIRST_NAME], mockApplication.owner[FIRST_NAME]),
      xlsxRow(FIELDS[LAST_NAME], mockApplication.owner[LAST_NAME]),
      xlsxRow(FIELDS.APPLICANT_EMAIL_ADDRESS, mockApplication.owner[EMAIL]),
    ];

    expect(result).toEqual(expected);
  });
});
