import FIELD_IDS from '../../../constants/field-ids/insurance/your-buyer';
import { XLSX } from '../../../content-strings';
import { YOUR_BUYER_FIELDS } from '../../../content-strings/fields/insurance/your-buyer';
import xlsxRow from '../helpers/xlsx-row';
import NEW_LINE from '../helpers/xlsx-new-line';
import mapYesNoField from '../helpers/map-yes-no-field';
import { Application } from '../../../types';

const CONTENT_STRINGS = {
  ...YOUR_BUYER_FIELDS.COMPANY_OR_ORGANISATION,
  ...YOUR_BUYER_FIELDS,
};

const {
  COMPANY_OR_ORGANISATION: { NAME, ADDRESS, COUNTRY, REGISTRATION_NUMBER, WEBSITE },
  CONNECTION_WITH_BUYER,
  TRADED_WITH_BUYER,
} = FIELD_IDS;

/**
 * mapBuyer
 * Map an application's buyer fields into an array of objects for XLSX generation
 * @param {Application}
 * @returns {Array} Array of objects for XLSX generation
 */
const mapBuyer = (application: Application) => {
  const { buyer } = application;

  const mapped = [
    xlsxRow(XLSX.SECTION_TITLES.BUYER, ''),
    xlsxRow(XLSX.FIELDS[NAME], buyer[NAME]),
    xlsxRow(String(CONTENT_STRINGS[ADDRESS].SUMMARY?.TITLE), `${buyer[ADDRESS]} ${NEW_LINE}${buyer[COUNTRY].name}`),
    xlsxRow(XLSX.FIELDS[REGISTRATION_NUMBER], buyer[REGISTRATION_NUMBER]),
    xlsxRow(String(CONTENT_STRINGS[WEBSITE].SUMMARY?.TITLE), buyer[WEBSITE]),
    xlsxRow(String(CONTENT_STRINGS[CONNECTION_WITH_BUYER].SUMMARY?.TITLE), mapYesNoField(buyer[CONNECTION_WITH_BUYER])),
    xlsxRow(String(CONTENT_STRINGS[TRADED_WITH_BUYER].SUMMARY?.TITLE), mapYesNoField(buyer[TRADED_WITH_BUYER])),
  ];

  return mapped;
};

export default mapBuyer;
