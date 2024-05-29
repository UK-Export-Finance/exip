import INSURANCE_FIELD_IDS from '../../../constants/field-ids/insurance';
import { XLSX } from '../../../content-strings';
import { YOUR_BUYER_FIELDS } from '../../../content-strings/fields/insurance/your-buyer';
import xlsxRow from '../helpers/xlsx-row';
import NEW_LINE from '../helpers/xlsx-new-line';
import mapYesNoField from '../helpers/map-yes-no-field';
import formatCurrency from '../helpers/format-currency';
import { Application } from '../../../types';

const CONTENT_STRINGS = {
  ...YOUR_BUYER_FIELDS.COMPANY_OR_ORGANISATION,
  ...YOUR_BUYER_FIELDS,
};

const {
  CURRENCY: { CURRENCY_CODE },
  YOUR_BUYER: {
    COMPANY_OR_ORGANISATION: { NAME, ADDRESS, COUNTRY, REGISTRATION_NUMBER, WEBSITE },
    CONNECTION_WITH_BUYER,
    CONNECTION_WITH_BUYER_DESCRIPTION,
    FAILED_PAYMENTS,
    HAS_BUYER_FINANCIAL_ACCOUNTS,
    HAS_PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER,
    OUTSTANDING_PAYMENTS,
    PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER,
    TRADED_WITH_BUYER,
    TOTAL_OUTSTANDING_PAYMENTS,
    TOTAL_AMOUNT_OVERDUE,
  },
} = INSURANCE_FIELD_IDS;

const { SECTION_TITLES, FIELDS } = XLSX;

/**
 * mapBuyer
 * Map an application's buyer fields into an array of objects for XLSX generation
 * @param {Application}
 * @returns {Array} Array of objects for XLSX generation
 */
const mapBuyer = (application: Application) => {
  const { buyer } = application;

  const { buyerTradingHistory, relationship } = buyer;

  let mapped = [
    xlsxRow(SECTION_TITLES.BUYER, ''),
    xlsxRow(FIELDS[NAME], buyer[NAME]),
    xlsxRow(String(CONTENT_STRINGS[ADDRESS].SUMMARY?.TITLE), `${buyer[ADDRESS]} ${NEW_LINE}${buyer[COUNTRY].name}`),
    xlsxRow(FIELDS[REGISTRATION_NUMBER], buyer[REGISTRATION_NUMBER]),
    xlsxRow(String(CONTENT_STRINGS[WEBSITE].SUMMARY?.TITLE), buyer[WEBSITE]),
    xlsxRow(String(FIELDS[CONNECTION_WITH_BUYER]), mapYesNoField(relationship[CONNECTION_WITH_BUYER])),
  ];

  if (relationship[CONNECTION_WITH_BUYER]) {
    mapped.push(xlsxRow(String(FIELDS[CONNECTION_WITH_BUYER_DESCRIPTION]), relationship[CONNECTION_WITH_BUYER_DESCRIPTION]));
  }

  mapped = [...mapped, xlsxRow(String(FIELDS[TRADED_WITH_BUYER]), mapYesNoField(buyerTradingHistory[TRADED_WITH_BUYER]))];

  if (buyerTradingHistory[TRADED_WITH_BUYER]) {
    mapped.push(xlsxRow(String(FIELDS[OUTSTANDING_PAYMENTS]), mapYesNoField(buyerTradingHistory[OUTSTANDING_PAYMENTS])));

    if (buyerTradingHistory[OUTSTANDING_PAYMENTS]) {
      const totalOutstandingPaymentsValue = formatCurrency(buyerTradingHistory[TOTAL_OUTSTANDING_PAYMENTS], buyerTradingHistory[CURRENCY_CODE]);

      mapped.push(xlsxRow(String(FIELDS[TOTAL_OUTSTANDING_PAYMENTS]), totalOutstandingPaymentsValue));

      const totalAmountOverdueValue = formatCurrency(buyerTradingHistory[TOTAL_AMOUNT_OVERDUE], buyerTradingHistory[CURRENCY_CODE]);

      mapped.push(xlsxRow(String(CONTENT_STRINGS[TOTAL_AMOUNT_OVERDUE].SUMMARY?.TITLE), totalAmountOverdueValue));
    }

    mapped.push(xlsxRow(String(FIELDS[FAILED_PAYMENTS]), mapYesNoField(buyerTradingHistory[FAILED_PAYMENTS])));
  }

  mapped = [
    ...mapped,
    xlsxRow(String(FIELDS[HAS_PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER]), mapYesNoField(relationship[HAS_PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER], 'No')),
  ];

  if (relationship[HAS_PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER]) {
    mapped.push(xlsxRow(String(FIELDS[PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER]), relationship[PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER]));
  }

  mapped = [...mapped, xlsxRow(String(FIELDS[HAS_BUYER_FINANCIAL_ACCOUNTS]), mapYesNoField(relationship[HAS_BUYER_FINANCIAL_ACCOUNTS]))];

  return mapped;
};

export default mapBuyer;
