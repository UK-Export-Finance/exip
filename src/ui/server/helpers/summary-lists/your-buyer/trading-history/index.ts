import { YOUR_BUYER_FIELDS as FIELDS } from '../../../../content-strings/fields/insurance';
import { FORM_TITLES } from '../../../../content-strings/form-titles';
import INSURANCE_FIELD_IDS from '../../../../constants/field-ids/insurance';
import { INSURANCE_ROUTES } from '../../../../constants/routes/insurance';
import fieldGroupItem from '../../generate-field-group-item';
import getFieldById from '../../../get-field-by-id';
import mapYesNoField from '../../../mappings/map-yes-no-field';
import generateChangeLink from '../../../generate-change-link';
import formatCurrency from '../../../format-currency';
import { ApplicationBuyerTradingHistory, SummaryListItemData, SummaryListGroupData } from '../../../../../types';

const {
  YOUR_BUYER: { TRADING_HISTORY: FORM_TITLE },
} = FORM_TITLES;

const {
  YOUR_BUYER: { TRADED_WITH_BUYER_CHANGE, TRADED_WITH_BUYER_CHECK_AND_CHANGE, TRADING_HISTORY_CHANGE, TRADING_HISTORY_CHECK_AND_CHANGE },
} = INSURANCE_ROUTES;

const { TRADED_WITH_BUYER, OUTSTANDING_PAYMENTS, TOTAL_OUTSTANDING_PAYMENTS, TOTAL_AMOUNT_OVERDUE, FAILED_PAYMENTS } = INSURANCE_FIELD_IDS.YOUR_BUYER;
const { CURRENCY_CODE } = INSURANCE_FIELD_IDS.CURRENCY;

/**
 * optionalFields
 * optionalFields for trading history summary list
 * if OUTSTANDING_PAYMENTS is true, then renders extra rows in summary list
 * @param {ApplicationBuyerTradingHistory} answers
 * @param {Number} referenceNumber
 * @param {Boolean} checkAndChange
 * @returns {Array<SummaryListItemData>} Array including or excluding TOTAL_OUTSTANDING_PAYMENTS and TOTAL_AMOUNT_OVERDUE in correct structure
 */
export const optionalFields = (answers: ApplicationBuyerTradingHistory, referenceNumber: number, checkAndChange?: boolean) => {
  const fields = [] as Array<SummaryListItemData>;

  /**
   * if OUTSTANDING_PAYMENTS is true
   * pushes TOTAL_OUTSTANDING_PAYMENTS and TOTAL_AMOUNT_OVERDUE to the summary list
   */
  if (answers[OUTSTANDING_PAYMENTS]) {
    fields.push(
      fieldGroupItem(
        {
          field: getFieldById(FIELDS, TOTAL_OUTSTANDING_PAYMENTS),
          data: answers,
          href: generateChangeLink(
            TRADING_HISTORY_CHANGE,
            TRADING_HISTORY_CHECK_AND_CHANGE,
            `#${TOTAL_OUTSTANDING_PAYMENTS}-label`,
            referenceNumber,
            checkAndChange,
          ),
          renderChangeLink: true,
        },
        formatCurrency(answers[TOTAL_OUTSTANDING_PAYMENTS], answers[CURRENCY_CODE]),
      ),
    );

    fields.push(
      fieldGroupItem(
        {
          field: getFieldById(FIELDS, TOTAL_AMOUNT_OVERDUE),
          data: answers,
          href: generateChangeLink(TRADING_HISTORY_CHANGE, TRADING_HISTORY_CHECK_AND_CHANGE, `#${TOTAL_AMOUNT_OVERDUE}-label`, referenceNumber, checkAndChange),
          renderChangeLink: true,
        },
        formatCurrency(answers[TOTAL_AMOUNT_OVERDUE], answers[CURRENCY_CODE]),
      ),
    );
  }

  return fields;
};
/**
 * tradingHistoryFields
 * Create all trading history fields and values for the Insurance - your buyer govukSummaryList
 * @param {ApplicationBuyerTradingHistory} answers buyer trading history data
 * @param {Number} referenceNumber application reference number
 * @param {Boolean} checkAndChange
 * @returns {Array<SummaryListItemData>} All trading history fields and values in an object structure for GOVUK summary list structure
 */
const tradingHistoryFields = (answers: ApplicationBuyerTradingHistory, referenceNumber: number, checkAndChange?: boolean): SummaryListGroupData => {
  const fields = [
    fieldGroupItem(
      {
        field: getFieldById(FIELDS, TRADED_WITH_BUYER),
        data: answers,
        href: generateChangeLink(TRADED_WITH_BUYER_CHANGE, TRADED_WITH_BUYER_CHECK_AND_CHANGE, `#${TRADED_WITH_BUYER}-label`, referenceNumber, checkAndChange),
        renderChangeLink: true,
      },
      mapYesNoField(answers[TRADED_WITH_BUYER]),
    ),
    fieldGroupItem(
      {
        field: getFieldById(FIELDS, OUTSTANDING_PAYMENTS),
        data: answers,
        href: generateChangeLink(TRADING_HISTORY_CHANGE, TRADING_HISTORY_CHECK_AND_CHANGE, `#${OUTSTANDING_PAYMENTS}-label`, referenceNumber, checkAndChange),
        renderChangeLink: true,
      },
      mapYesNoField(answers[OUTSTANDING_PAYMENTS]),
    ),
    ...optionalFields(answers, referenceNumber, checkAndChange),
    fieldGroupItem(
      {
        field: getFieldById(FIELDS, FAILED_PAYMENTS),
        data: answers,
        href: generateChangeLink(TRADING_HISTORY_CHANGE, TRADING_HISTORY_CHECK_AND_CHANGE, `#${FAILED_PAYMENTS}-label`, referenceNumber, checkAndChange),
        renderChangeLink: true,
      },
      mapYesNoField(answers[FAILED_PAYMENTS]),
    ),
  ] as Array<SummaryListItemData>;

  return {
    title: FORM_TITLE,
    fields,
  };
};

export default tradingHistoryFields;
