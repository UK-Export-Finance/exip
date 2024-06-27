import mapKeyInformation from '.';
import { XLSX } from '../../../content-strings';
import { POLICY_FIELDS } from '../../../content-strings/fields/insurance';
import FIELD_IDS from '../../../constants/field-ids/insurance';
import xlsxRow from '../helpers/xlsx-row';
import { mockApplication } from '../../../test-mocks';

const {
  SECTION_TITLES: { KEY_INFORMATION },
  FIELDS,
} = XLSX;

const CONTENT_STRINGS = {
  ...POLICY_FIELDS,
};

const {
  EXPORTER_BUSINESS: {
    COMPANIES_HOUSE: { COMPANY_NAME: EXPORTER_COMPANY_NAME },
  },
  YOUR_BUYER: {
    COMPANY_OR_ORGANISATION: { COUNTRY, NAME: BUYER_COMPANY_NAME },
  },
  POLICY: {
    TYPE_OF_POLICY: { POLICY_TYPE },
  },
} = FIELD_IDS;

describe('api/generate-xlsx/map-application-to-xlsx/map-key-information', () => {
  it('should return an array of mapped fields', () => {
    const result = mapKeyInformation(mockApplication);

    const { policy } = mockApplication;

    const expected = [
      xlsxRow(KEY_INFORMATION),
      xlsxRow(String(FIELDS[EXPORTER_COMPANY_NAME]), mockApplication.company[EXPORTER_COMPANY_NAME]),
      xlsxRow(String(FIELDS[COUNTRY]), mockApplication.buyer[COUNTRY].name),
      xlsxRow(String(FIELDS[BUYER_COMPANY_NAME]), mockApplication.buyer[BUYER_COMPANY_NAME]),
      xlsxRow(String(CONTENT_STRINGS[POLICY_TYPE].SUMMARY?.TITLE), policy[POLICY_TYPE]),
    ];

    expect(result).toEqual(expected);
  });
});
