import { XLSX } from '../../../content-strings';
import { POLICY_FIELDS } from '../../../content-strings/fields/insurance';
import FIELD_IDS from '../../../constants/field-ids/insurance';
import xlsxRow from '../helpers/xlsx-row';
import { Application } from '../../../types';

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

/**
 * mapSecondaryKeyInformation
 * Map secondary key information for an application
 * @param {Application}
 * @returns {Array} Array of objects for XLSX generation
 */
const mapSecondaryKeyInformation = (application: Application) => {
  const { policy } = application;

  const mapped = [
    xlsxRow(KEY_INFORMATION),
    xlsxRow(FIELDS[EXPORTER_COMPANY_NAME], application.company[EXPORTER_COMPANY_NAME]),
    xlsxRow(FIELDS[COUNTRY], application.buyer[COUNTRY].name),
    xlsxRow(FIELDS[BUYER_COMPANY_NAME], application.buyer[BUYER_COMPANY_NAME]),
    xlsxRow(String(CONTENT_STRINGS[POLICY_TYPE].SUMMARY?.TITLE), policy[POLICY_TYPE]),
  ];

  return mapped;
};

export default mapSecondaryKeyInformation;
