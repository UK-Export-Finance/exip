import FIELD_IDS from '../../../constants/field-ids/insurance';
import { XLSX } from '../../../content-strings';
import xlsxRow from '../helpers/xlsx-row';
import { Application } from '../../../types';

const {
  ACCOUNT: { FIRST_NAME, LAST_NAME, EMAIL },
  POLICY: {
    NAME_ON_POLICY: { POSITION },
  },
} = FIELD_IDS;

const { FIELDS } = XLSX;

/**
 * mapExporterContactDetails
 * Map an application's exporter/policy contact details fields into an array of objects for XLSX generation
 * @param {Application}
 * @returns {Array<object>} Array of objects for XLSX generation
 */
const mapExporterContactDetails = (application: Application) => {
  const { policyContact } = application;

  const mapped = [
    xlsxRow(FIELDS.EXPORTER_CONTACT.TITLE),
    xlsxRow(FIELDS.EXPORTER_CONTACT[FIRST_NAME], policyContact[FIRST_NAME]),
    xlsxRow(FIELDS.EXPORTER_CONTACT[LAST_NAME], policyContact[LAST_NAME]),
    xlsxRow(FIELDS.EXPORTER_CONTACT.EXPORTER_CONTACT_EMAIL, policyContact[EMAIL]),
    xlsxRow(FIELDS.EXPORTER_CONTACT.EXPORTER_CONTACT_POSITION, policyContact[POSITION]),
  ];

  return mapped;
};

export default mapExporterContactDetails;
