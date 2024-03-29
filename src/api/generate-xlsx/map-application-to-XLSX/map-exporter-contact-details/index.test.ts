import mapExporterContactDetails from '.';
import ACCOUNT_FIELD_IDS from '../../../constants/field-ids/insurance/account';
import { XLSX } from '../../../content-strings';
import xlsxRow from '../helpers/xlsx-row';
import { mockApplication } from '../../../test-mocks';

const { FIRST_NAME, LAST_NAME, EMAIL } = ACCOUNT_FIELD_IDS;

const {
  SECTION_TITLES: { EXPORTER_CONTACT_DETAILS },
  FIELDS,
} = XLSX;

describe('api/generate-xlsx/map-application-to-xlsx/map-exporter-contact-details', () => {
  it('should return an array of mapped exporter contact details', () => {
    const result = mapExporterContactDetails(mockApplication);

    const { policyContact } = mockApplication;

    const expected = [
      xlsxRow(EXPORTER_CONTACT_DETAILS),
      xlsxRow(FIELDS.EXPORTER_CONTACT[FIRST_NAME], policyContact[FIRST_NAME]),
      xlsxRow(FIELDS.EXPORTER_CONTACT[LAST_NAME], policyContact[LAST_NAME]),
      xlsxRow(FIELDS.EXPORTER_CONTACT.EXPORTER_CONTACT_EMAIL, policyContact[EMAIL]),
    ];

    expect(result).toEqual(expected);
  });
});
