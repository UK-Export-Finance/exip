import { YOUR_BUYER_FIELDS as FIELDS } from '../../../../../../content-strings/fields/insurance';
import BUYER_FIELD_IDS from '../../../../../../constants/field-ids/insurance/your-buyer';
import { YOUR_BUYER as YOUR_BUYER_ROUTES } from '../../../../../../constants/routes/insurance/your-buyer';
import fieldGroupItem from '../../../../generate-field-group-item';
import getFieldById from '../../../../../get-field-by-id';
import mapYesNoField from '../../../../../mappings/map-yes-no-field';
import generateChangeLink from '../../../../../generate-change-link';
import { ApplicationBuyerTradingHistory, SummaryListItemData } from '../../../../../../../types';

const { TRADING_HISTORY_CHANGE, TRADING_HISTORY_CHECK_AND_CHANGE } = YOUR_BUYER_ROUTES;

const { TRADED_WITH_BUYER, OUTSTANDING_PAYMENTS, FAILED_PAYMENTS } = BUYER_FIELD_IDS;

/**
 * optionalTradedWithBuyerFields
 * optional TRADED_WITH_BUYER fields for the trading history summary list
 * if TRADED_WITH_BUYER is true, render additional rows in summary list
 * @param {ApplicationBuyerTradingHistory} answers: Buyer trading history answers
 * @param {Number} referenceNumber: Application reference number
 * @param {Boolean} checkAndChange true if coming from check your answers section in submit application section
 * @returns {Array<SummaryListItemData>} Array including or excluding OUTSTANDING_PAYMENTS and FAILED_PAYMENTS in correct structure
 */
const optionalTradedWithBuyerFields = (answers: ApplicationBuyerTradingHistory, referenceNumber: number, checkAndChange?: boolean) => {
  const fields = [] as Array<SummaryListItemData>;

  if (answers[TRADED_WITH_BUYER]) {
    fields.push(
      fieldGroupItem(
        {
          field: getFieldById(FIELDS, OUTSTANDING_PAYMENTS),
          data: answers,
          href: generateChangeLink(TRADING_HISTORY_CHANGE, TRADING_HISTORY_CHECK_AND_CHANGE, `#${OUTSTANDING_PAYMENTS}-label`, referenceNumber, checkAndChange),
          renderChangeLink: true,
        },
        mapYesNoField(answers[OUTSTANDING_PAYMENTS]),
      ),
      fieldGroupItem(
        {
          field: getFieldById(FIELDS, FAILED_PAYMENTS),
          data: answers,
          href: generateChangeLink(TRADING_HISTORY_CHANGE, TRADING_HISTORY_CHECK_AND_CHANGE, `#${FAILED_PAYMENTS}-label`, referenceNumber, checkAndChange),
          renderChangeLink: true,
        },
        mapYesNoField(answers[FAILED_PAYMENTS]),
      ),
    );
  }

  return fields;
};

export default optionalTradedWithBuyerFields;
