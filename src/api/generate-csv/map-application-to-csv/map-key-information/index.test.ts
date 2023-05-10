import mapPolicyAndExport from '.';
import { REFERENCE_NUMBER, DATE_SUBMITTED, TIME_SUBMITTED } from '../../../content-strings/fields/insurance';
import { CSV } from '../../../content-strings';
import ACCOUNT from '../../../constants/field-ids/insurance/account';
import csvRow from '../helpers/csv-row';
import formatDate from '../../../helpers/format-date';
import formatTimeOfDay from '../helpers/format-time-of-day';
import { mockApplication } from '../../../test-mocks';

const { FIELDS } = CSV;

const { FIRST_NAME, LAST_NAME, EMAIL } = ACCOUNT;

describe('api/generate-csv/map-application-to-csv/map-key-information', () => {
  it('should return an array of mapped key information', () => {
    const result = mapPolicyAndExport(mockApplication);

    const expected = [
      csvRow(REFERENCE_NUMBER.SUMMARY.TITLE, mockApplication.referenceNumber),
      csvRow(DATE_SUBMITTED.SUMMARY.TITLE, formatDate(mockApplication.submissionDate, 'dd-MM-yyyy')),
      csvRow(TIME_SUBMITTED.SUMMARY.TITLE, formatTimeOfDay(mockApplication.submissionDate)),
      csvRow(FIELDS[FIRST_NAME], mockApplication.owner[FIRST_NAME]),
      csvRow(FIELDS[LAST_NAME], mockApplication.owner[LAST_NAME]),
      csvRow(FIELDS[EMAIL], mockApplication.owner[EMAIL]),
    ];

    expect(result).toEqual(expected);
  });
});
