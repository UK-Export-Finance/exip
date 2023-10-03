import ACCOUNT_FIELD_IDS from '../../../constants/field-ids/insurance/account';
import { XLSX } from '../../../content-strings';
import xlsxRow from '../helpers/xlsx-row';
import { Application } from '../../../types';

const { FIRST_NAME, LAST_NAME, EMAIL } = ACCOUNT_FIELD_IDS;

const {
  SECTION_TITLES: { EXPORTER_CONTACT_DETAILS },
  FIELDS,
} = XLSX;

/**
 * mapExporterContactDetails
 * Map an application's exporter/policy contact details fields into an array of objects for XLSX generation
 * @param {Application}
 * @returns {Array} Array of objects for XLSX generation
 */
const mapExporterContactDetails = (application: Application) => {
  const { policyContact } = application;

  const mapped = [
    xlsxRow(EXPORTER_CONTACT_DETAILS),
    xlsxRow(FIELDS.EXPORTER_CONTACT[FIRST_NAME], policyContact[FIRST_NAME]),
    xlsxRow(FIELDS.EXPORTER_CONTACT[LAST_NAME], policyContact[LAST_NAME]),
    xlsxRow(FIELDS.EXPORTER_CONTACT.EXPORTER_CONTACT_EMAIL, policyContact[EMAIL]),
  ];

  return mapped;
};

export default mapExporterContactDetails;
