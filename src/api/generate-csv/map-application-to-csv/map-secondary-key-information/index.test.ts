import mapPolicyAndExport from '.';
import { CSV } from '../../../content-strings';
import { POLICY_AND_EXPORTS_FIELDS } from '../../../content-strings/fields/insurance';
import FIELD_IDS from '../../../constants/field-ids/insurance';
import csvRow from '../helpers/csv-row';
import { mockApplication } from '../../../test-mocks';

const {
  SECTION_TITLES: { KEY_INFORMATION },
  FIELDS,
} = CSV;

const CONTENT_STRINGS = {
  ...POLICY_AND_EXPORTS_FIELDS,
};

const {
  EXPORTER_BUSINESS: {
    COMPANY_HOUSE: { COMPANY_NAME: EXPORTER_COMPANY_NAME },
  },
  YOUR_BUYER: {
    COMPANY_OR_ORGANISATION: { COUNTRY, NAME: BUYER_COMPANY_NAME },
  },
  POLICY_AND_EXPORTS: {
    TYPE_OF_POLICY: { POLICY_TYPE },
  },
} = FIELD_IDS;

describe('api/generate-csv/map-application-to-csv/map-secondary-key-information', () => {
  it('should return an array of mapped buyer fields', () => {
    const result = mapPolicyAndExport(mockApplication);

    const { policyAndExport } = mockApplication;

    const expected = [
      csvRow(KEY_INFORMATION),
      csvRow(FIELDS[EXPORTER_COMPANY_NAME], mockApplication.exporterBusiness[EXPORTER_COMPANY_NAME]),
      csvRow(FIELDS[COUNTRY], mockApplication.buyer[COUNTRY]),
      csvRow(FIELDS[BUYER_COMPANY_NAME], mockApplication.buyer[BUYER_COMPANY_NAME]),
      csvRow(String(CONTENT_STRINGS[POLICY_TYPE].SUMMARY?.TITLE), policyAndExport[POLICY_TYPE]),
    ];

    expect(result).toEqual(expected);
  });
});
