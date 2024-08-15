import FIELD_IDS from '../../../constants/field-ids/insurance/your-buyer';
import { XLSX } from '../../../content-strings';
import { YOUR_BUYER_FIELDS } from '../../../content-strings/fields/insurance/your-buyer';
import xlsxRow from '../helpers/xlsx-row';
import NEW_LINE from '../helpers/xlsx-new-line';
import mapYesNoField from '../helpers/map-yes-no-field';
import mapConnectionWithBuyer from './map-connection-with-buyer';
import mapBuyerTradingHistory from './map-buyer-trading-history';
import mapPreviousCoverWithBuyer from './map-previous-cover-with-buyer';
import { Application } from '../../../types';

const CONTENT_STRINGS = {
  ...YOUR_BUYER_FIELDS.COMPANY_OR_ORGANISATION,
  ...YOUR_BUYER_FIELDS,
};

const {
  COMPANY_OR_ORGANISATION: { NAME, ADDRESS, COUNTRY, REGISTRATION_NUMBER, WEBSITE },
  CONNECTION_WITH_BUYER,
  HAS_BUYER_FINANCIAL_ACCOUNTS,
  TRADED_WITH_BUYER,
} = FIELD_IDS;

const { FIELDS } = XLSX;

/**
 * mapBuyer
 * Map an application's buyer fields into an array of objects for XLSX generation
 * @param {Application} application
 * @returns {Array<object>} Array of objects for XLSX generation
 */
const mapBuyer = (application: Application) => {
  const { buyer } = application;
  const { buyerTradingHistory, relationship } = buyer;

  const mapped = [
    xlsxRow(String(FIELDS[NAME]), buyer[NAME]),
    xlsxRow(String(CONTENT_STRINGS[ADDRESS].SUMMARY?.TITLE), `${buyer[ADDRESS]} ${NEW_LINE}${buyer[COUNTRY].name}`),
    xlsxRow(String(FIELDS[REGISTRATION_NUMBER]), buyer[REGISTRATION_NUMBER]),
    xlsxRow(String(CONTENT_STRINGS[WEBSITE].SUMMARY?.TITLE), buyer[WEBSITE]),
    xlsxRow(String(FIELDS[CONNECTION_WITH_BUYER]), mapYesNoField({ answer: relationship[CONNECTION_WITH_BUYER] })),

    mapConnectionWithBuyer(relationship),

    xlsxRow(String(FIELDS[TRADED_WITH_BUYER]), mapYesNoField({ answer: buyerTradingHistory[TRADED_WITH_BUYER] })),

    ...mapBuyerTradingHistory(buyerTradingHistory),

    ...mapPreviousCoverWithBuyer(application),

    xlsxRow(String(FIELDS[HAS_BUYER_FINANCIAL_ACCOUNTS]), mapYesNoField({ answer: relationship[HAS_BUYER_FINANCIAL_ACCOUNTS] })),
  ];

  return mapped;
};

export default mapBuyer;
