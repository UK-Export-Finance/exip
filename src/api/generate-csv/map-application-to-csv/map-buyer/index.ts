import FIELD_IDS from '../../../constants/field-ids/insurance/your-buyer';
import { CSV } from '../../../content-strings';
import { YOUR_BUYER_FIELDS } from '../../../content-strings/fields/insurance/your-buyer';
import csvRow from '../helpers/csv-row';
import NEW_LINE from '../helpers/csv-new-line';
import { Application } from '../../../types';

const CONTENT_STRINGS = {
  ...YOUR_BUYER_FIELDS.COMPANY_OR_ORGANISATION,
  ...YOUR_BUYER_FIELDS.WORKING_WITH_BUYER,
};

const {
  COMPANY_OR_ORGANISATION: { NAME, ADDRESS, REGISTRATION_NUMBER, WEBSITE, FIRST_NAME, LAST_NAME, POSITION, EMAIL, CAN_CONTACT_BUYER },
  WORKING_WITH_BUYER: { CONNECTED_WITH_BUYER, TRADED_WITH_BUYER },
} = FIELD_IDS;

/**
 * mapBuyer
 * Map an application's buyer fields into an array of objects for CSV generation
 * @param {Object} Application
 * @returns {Array} Array of objects for CSV generation
 */
const mapBuyer = (application: Application) => {
  const { buyer } = application;

  const mapped = [
    csvRow(CSV.SECTION_TITLES.BUYER, ''),
    csvRow(CSV.FIELDS[NAME], buyer[NAME]),
    csvRow(String(CONTENT_STRINGS[ADDRESS].SUMMARY?.TITLE), buyer[ADDRESS]),
    csvRow(CSV.FIELDS[REGISTRATION_NUMBER], buyer[REGISTRATION_NUMBER]),
    csvRow(String(CONTENT_STRINGS[WEBSITE].SUMMARY?.TITLE), buyer[WEBSITE]),
    csvRow(CSV.FIELDS[FIRST_NAME], `${buyer[FIRST_NAME]} ${buyer[LAST_NAME]} ${NEW_LINE} ${buyer[POSITION]} ${NEW_LINE} ${buyer[EMAIL]}`),
    csvRow(String(CONTENT_STRINGS[CAN_CONTACT_BUYER].SUMMARY?.TITLE), buyer[CAN_CONTACT_BUYER]),
    csvRow(String(CONTENT_STRINGS[CONNECTED_WITH_BUYER].SUMMARY?.TITLE), buyer[CONNECTED_WITH_BUYER]),
    csvRow(String(CONTENT_STRINGS[TRADED_WITH_BUYER].SUMMARY?.TITLE), buyer[TRADED_WITH_BUYER]),
  ];

  return mapped;
};

export default mapBuyer;
