import { YOUR_BUYER_FIELDS as FIELDS } from '../../../../content-strings/fields/insurance';
import { FORM_TITLES } from '../../../../content-strings/form-titles';
import YOUR_BUYER_FIELD_IDS from '../../../../constants/field-ids/insurance/your-buyer';
import { ROUTES } from '../../../../constants';
import fieldGroupItem from '../../generate-field-group-item';
import getFieldById from '../../../get-field-by-id';
import mapYesNoField from '../../../mappings/map-yes-no-field';
import generateChangeLink from '../../../generate-change-link';
import { ApplicationBuyerRelationship, SummaryListItemData, SummaryListGroupData } from '../../../../../types';

const {
  YOUR_BUYER: { FINANCIAL_ACCOUNTS: FORM_TITLE },
} = FORM_TITLES;

const {
  INSURANCE: {
    YOUR_BUYER: { BUYER_FINANCIAL_INFORMATION_CHANGE, BUYER_FINANCIAL_INFORMATION_CHECK_AND_CHANGE },
  },
} = ROUTES;

const { HAS_BUYER_FINANCIAL_ACCOUNTS } = YOUR_BUYER_FIELD_IDS;

/**
 * financialAccountsFields
 * Create all buyer financial accounts fields and values for the Insurance - your buyer govukSummaryList
 * @param {ApplicationBuyer} answers: buyer relationship data
 * @param {Number} referenceNumber: Application reference number
 * @param {Boolean} checkAndChange: Is "check and change"
 * @returns {Array<SummaryListItemData>} All buyer financial account fields and values in an object structure for GOVUK summary list structure
 */
const financialAccountsFields = (answers: ApplicationBuyerRelationship, referenceNumber: number, checkAndChange?: boolean): SummaryListGroupData => {
  const fields = [
    fieldGroupItem(
      {
        field: getFieldById(FIELDS, HAS_BUYER_FINANCIAL_ACCOUNTS),
        data: answers,
        href: generateChangeLink(
          BUYER_FINANCIAL_INFORMATION_CHANGE,
          BUYER_FINANCIAL_INFORMATION_CHECK_AND_CHANGE,
          `#${HAS_BUYER_FINANCIAL_ACCOUNTS}-label`,
          referenceNumber,
          checkAndChange,
        ),
        renderChangeLink: true,
      },
      mapYesNoField(answers[HAS_BUYER_FINANCIAL_ACCOUNTS]),
    ),
  ] as Array<SummaryListItemData>;

  return {
    title: FORM_TITLE,
    fields,
  };
};

export default financialAccountsFields;
