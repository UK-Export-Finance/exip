import mapPolicyAndExport from '.';
import { REFERENCE_NUMBER, DATE_SUBMITTED, TIME_SUBMITTED } from '../../../content-strings/fields/insurance';
import csvRow from '../helpers/csv-row';
import formatDate from '../helpers/format-date';
import formatTimeOfDay from '../helpers/format-time-of-day';
import { mockApplication } from '../../../test-mocks';

describe('api/generate-csv/map-application-to-csv/map-reference-number-and-dates', () => {
  it('should return an array of mapped buyer fields', () => {
    const result = mapPolicyAndExport(mockApplication);

    const expected = [
      csvRow(REFERENCE_NUMBER.SUMMARY.TITLE, mockApplication.referenceNumber),
      csvRow(DATE_SUBMITTED.SUMMARY.TITLE, formatDate(mockApplication.submissionDate)),
      csvRow(TIME_SUBMITTED.SUMMARY.TITLE, formatTimeOfDay(mockApplication.submissionDate)),
    ];

    expect(result).toEqual(expected);
  });
});
