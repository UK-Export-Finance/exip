import { CSV } from '../../../content-strings';
import { POLICY_AND_EXPORTS_FIELDS } from '../../../content-strings/fields/insurance';
import FIELD_IDS from '../../../constants/field-ids/insurance';
import csvRow from '../helpers/csv-row';
import { Application } from '../../../types';

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

/**
 * mapSecondaryKeyInformation
 * Map secondary key information for an application
 * @param {Object} Application
 * @returns {Array} Array of objects for CSV generation
 */
const mapSecondaryKeyInformation = (application: Application) => {
  const { policyAndExport } = application;

  const mapped = [
    csvRow(KEY_INFORMATION),
    csvRow(FIELDS[EXPORTER_COMPANY_NAME], application.exporterBusiness[EXPORTER_COMPANY_NAME]),
    csvRow(FIELDS[COUNTRY], application.buyer[COUNTRY]),
    csvRow(FIELDS[BUYER_COMPANY_NAME], application.buyer[BUYER_COMPANY_NAME]),
    csvRow(String(CONTENT_STRINGS[POLICY_TYPE].SUMMARY?.TITLE), policyAndExport[POLICY_TYPE]),
  ];

  return mapped;
};

export default mapSecondaryKeyInformation;
