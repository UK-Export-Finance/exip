import mapBuyer from '.';
import INSURANCE_FIELD_IDS from '../../../constants/field-ids/insurance';
import { XLSX } from '../../../content-strings';
import xlsxRow from '../helpers/xlsx-row';
import { mockApplication } from '../../../test-mocks';

const {
  ACCOUNT: { FIRST_NAME, LAST_NAME, EMAIL },
} = INSURANCE_FIELD_IDS;

const {
  SECTION_TITLES: { EXPORTER_CONTACT_DETAILS },
  FIELDS,
} = XLSX;

describe('api/generate-xlsx/map-application-to-xlsx/map-exporter-contact-details', () => {
  it('should return an array of mapped exporter contact details', () => {
    const result = mapBuyer(mockApplication);

    const {
      business: { businessContactDetail },
    } = mockApplication;

    const expected = [
      xlsxRow(EXPORTER_CONTACT_DETAILS),
      xlsxRow(FIELDS.EXPORTER_CONTACT[FIRST_NAME], businessContactDetail[FIRST_NAME]),
      xlsxRow(FIELDS.EXPORTER_CONTACT[LAST_NAME], businessContactDetail[LAST_NAME]),
      xlsxRow(FIELDS.EXPORTER_CONTACT.EXPORTER_CONTACT_EMAIL, businessContactDetail[EMAIL]),
    ];

    expect(result).toEqual(expected);
  });
});
