import mapExporterContactDetails from '.';
import FIELD_IDS from '../../../constants/field-ids/insurance';
import { XLSX } from '../../../content-strings';
import xlsxRow from '../helpers/xlsx-row';
import { mockApplication } from '../../../test-mocks';

const {
  ACCOUNT: { FIRST_NAME, LAST_NAME, EMAIL },
  POLICY: {
    NAME_ON_POLICY: { POSITION },
  },
} = FIELD_IDS;

const { FIELDS } = XLSX;

describe('api/generate-xlsx/map-application-to-xlsx/map-exporter-contact-details', () => {
  it('should return an array of mapped exporter contact details', () => {
    const result = mapExporterContactDetails(mockApplication);

    const { policyContact } = mockApplication;

    const expected = [
      xlsxRow(FIELDS.EXPORTER_CONTACT.TITLE),
      xlsxRow(FIELDS.EXPORTER_CONTACT[FIRST_NAME], policyContact[FIRST_NAME]),
      xlsxRow(FIELDS.EXPORTER_CONTACT[LAST_NAME], policyContact[LAST_NAME]),
      xlsxRow(FIELDS.EXPORTER_CONTACT.EXPORTER_CONTACT_EMAIL, policyContact[EMAIL]),
      xlsxRow(FIELDS.EXPORTER_CONTACT.EXPORTER_CONTACT_POSITION, policyContact[POSITION]),
    ];

    expect(result).toEqual(expected);
  });
});
