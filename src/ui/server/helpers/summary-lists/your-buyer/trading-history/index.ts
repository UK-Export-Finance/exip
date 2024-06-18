import { YOUR_BUYER_FIELDS as FIELDS } from '../../../../content-strings/fields/insurance';
import { FORM_TITLES } from '../../../../content-strings/form-titles';
import BUYER_FIELD_IDS from '../../../../constants/field-ids/insurance/your-buyer';
import { YOUR_BUYER as YOUR_BUYER_ROUTES } from '../../../../constants/routes/insurance/your-buyer';
import fieldGroupItem from '../../generate-field-group-item';
import getFieldById from '../../../get-field-by-id';
import mapYesNoField from '../../../mappings/map-yes-no-field';
import generateChangeLink from '../../../generate-change-link';
import optionalTradedWithBuyerFields from './optional-fields/traded-with-buyer';
import optionalOutstandingPaymentsFields from './optional-fields/outstanding-payments';
import { ApplicationBuyerTradingHistory, SummaryListItemData, SummaryListGroupData } from '../../../../../types';

const {
  YOUR_BUYER: { TRADING_HISTORY: FORM_TITLE },
} = FORM_TITLES;

const { TRADED_WITH_BUYER_CHANGE, TRADED_WITH_BUYER_CHECK_AND_CHANGE } = YOUR_BUYER_ROUTES;

const { TRADED_WITH_BUYER } = BUYER_FIELD_IDS;

/**
 * tradingHistoryFields
 * Create all trading history fields and values for the Insurance - your buyer govukSummaryList
 * @param {ApplicationBuyerTradingHistory} answers: buyer trading history data
 * @param {Number} referenceNumber: Application reference number
 * @param {Boolean} checkAndChange: Is "check and change"
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
    ...optionalTradedWithBuyerFields(answers, referenceNumber, checkAndChange),
    ...optionalOutstandingPaymentsFields(answers, referenceNumber, checkAndChange),
  ] as Array<SummaryListItemData>;

  return {
    title: FORM_TITLE,
    fields,
  };
};

export default tradingHistoryFields;
