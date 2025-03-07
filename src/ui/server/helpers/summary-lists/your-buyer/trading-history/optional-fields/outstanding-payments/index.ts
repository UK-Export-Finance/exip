import { YOUR_BUYER_FIELDS as FIELDS } from '../../../../../../content-strings/fields/insurance';
import INSURANCE_FIELD_IDS from '../../../../../../constants/field-ids/insurance';
import { YOUR_BUYER as YOUR_BUYER_ROUTES } from '../../../../../../constants/routes/insurance/your-buyer';
import fieldGroupItem from '../../../../generate-field-group-item';
import getFieldById from '../../../../../get-field-by-id';
import generateChangeLink from '../../../../../generate-change-link';
import formatCurrency from '../../../../../format-currency';
import { ApplicationBuyerTradingHistory, SummaryListItemData } from '../../../../../../../types';

const {
  OUTSTANDING_OR_OVERDUE_PAYMENTS_CHANGE,
  OUTSTANDING_OR_OVERDUE_PAYMENTS_CHECK_AND_CHANGE,
  CURRENCY_OF_LATE_PAYMENTS_CHANGE,
  CURRENCY_OF_LATE_PAYMENTS_CHECK_AND_CHANGE,
} = YOUR_BUYER_ROUTES;

const {
  YOUR_BUYER: { OUTSTANDING_PAYMENTS, TOTAL_OUTSTANDING_PAYMENTS, TOTAL_AMOUNT_OVERDUE },
  CURRENCY: { CURRENCY_CODE },
} = INSURANCE_FIELD_IDS;

/**
 * optionalOutstandingPaymentsFields
 * optional OUTSTANDING_PAYMENTS fields for the trading history summary list
 * if OUTSTANDING_PAYMENTS is true, render additional rows in summary list
 * @param {ApplicationBuyerTradingHistory} answers: Buyer trading history answers
 * @param {Number} referenceNumber: Application reference number
 * @param {Boolean} checkAndChange: True if coming from check your answers section in submit application section
 * @returns {Array<SummaryListItemData>} Array including or excluding TOTAL_OUTSTANDING_PAYMENTS and TOTAL_AMOUNT_OVERDUE in correct structure
 */
const optionalOutstandingPaymentsFields = (answers: ApplicationBuyerTradingHistory, referenceNumber: number, checkAndChange?: boolean) => {
  const fields = [] as Array<SummaryListItemData>;

  if (answers[OUTSTANDING_PAYMENTS]) {
    fields.push(
      fieldGroupItem({
        field: getFieldById(FIELDS, CURRENCY_CODE),
        data: answers,
        href: generateChangeLink(
          CURRENCY_OF_LATE_PAYMENTS_CHANGE,
          CURRENCY_OF_LATE_PAYMENTS_CHECK_AND_CHANGE,
          `#${CURRENCY_CODE}-label`,
          referenceNumber,
          checkAndChange,
        ),
        renderChangeLink: true,
      }),
      fieldGroupItem(
        {
          field: getFieldById(FIELDS, TOTAL_OUTSTANDING_PAYMENTS),
          data: answers,
          href: generateChangeLink(
            OUTSTANDING_OR_OVERDUE_PAYMENTS_CHANGE,
            OUTSTANDING_OR_OVERDUE_PAYMENTS_CHECK_AND_CHANGE,
            `#${TOTAL_OUTSTANDING_PAYMENTS}-label`,
            referenceNumber,
            checkAndChange,
          ),
          renderChangeLink: true,
        },
        formatCurrency(Number(answers[TOTAL_OUTSTANDING_PAYMENTS]), String(answers[CURRENCY_CODE])),
      ),
      fieldGroupItem(
        {
          field: getFieldById(FIELDS, TOTAL_AMOUNT_OVERDUE),
          data: answers,
          href: generateChangeLink(
            OUTSTANDING_OR_OVERDUE_PAYMENTS_CHANGE,
            OUTSTANDING_OR_OVERDUE_PAYMENTS_CHECK_AND_CHANGE,
            `#${TOTAL_AMOUNT_OVERDUE}-label`,
            referenceNumber,
            checkAndChange,
          ),
          renderChangeLink: true,
        },
        formatCurrency(Number(answers[TOTAL_AMOUNT_OVERDUE]), String(answers[CURRENCY_CODE])),
      ),
    );
  }

  return fields;
};

export default optionalOutstandingPaymentsFields;
