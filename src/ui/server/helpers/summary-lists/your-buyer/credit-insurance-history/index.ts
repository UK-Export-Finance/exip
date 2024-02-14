import { YOUR_BUYER_FIELDS as FIELDS } from '../../../../content-strings/fields/insurance';
import { FORM_TITLES } from '../../../../content-strings/form-titles';
import INSURANCE_FIELD_IDS from '../../../../constants/field-ids/insurance';
import { ROUTES } from '../../../../constants';
import fieldGroupItem from '../../generate-field-group-item';
import getFieldById from '../../../get-field-by-id';
import mapYesNoField from '../../../mappings/map-yes-no-field';
import generateChangeLink from '../../../generate-change-link';
import { ApplicationBuyerRelationship, SummaryListItemData, SummaryListGroupData } from '../../../../../types';

const { YOUR_BUYER: FIELD_IDS } = INSURANCE_FIELD_IDS;

const {
  YOUR_BUYER: { CREDIT_INSURANCE_HISTORY: FORM_TITLE },
} = FORM_TITLES;

const {
  INSURANCE: {
    YOUR_BUYER: { CREDIT_INSURANCE_COVER_CHANGE, CREDIT_INSURANCE_COVER_CHECK_AND_CHANGE },
  },
} = ROUTES;

const { HAS_PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER, PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER } = FIELD_IDS;

/**
 * optionalFields
 * optionalFields for connection with buyer summary list
 * if CONNECTION_WITH_BUYER is true, then renders extra row in summary list
 * @param {ApplicationBuyerRelationship} answers
 * @param {Number} referenceNumber: Application reference number
 * @param {Boolean} checkAndChange
 * @returns {Array<SummaryListItemData>} Array including or excluding CONNECTION_WITH_BUYER_DESCRIPTION in an object structure for GOVUK summary list structure
 */
export const optionalFields = (answers: ApplicationBuyerRelationship, referenceNumber: number, checkAndChange?: boolean) => {
  const fields = [] as Array<SummaryListItemData>;

  /**
   * if HAS_PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER is true
   * pushes PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER to the summary list
   */
  if (answers[HAS_PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER]) {
    fields.push(
      fieldGroupItem({
        field: getFieldById(FIELDS, PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER),
        data: answers,
        href: generateChangeLink(
          CREDIT_INSURANCE_COVER_CHANGE,
          CREDIT_INSURANCE_COVER_CHECK_AND_CHANGE,
          `#${PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER}-label`,
          referenceNumber,
          checkAndChange,
        ),
        renderChangeLink: true,
      }),
    );
  }

  return fields;
};
/**
 * creditInsuranceHistoryFields
 * Create all credit insurance fields and values for the Insurance - your buyer govukSummaryList
 * @param {ApplicationBuyer} answers buyer relationship data
 * @param {Number} referenceNumber: Application reference number
 * @param {Boolean} checkAndChange
 * @returns {Array<SummaryListItemData>} All credit insurance fields and values in an object structure for GOVUK summary list structure
 */
const creditInsuranceHistoryFields = (answers: ApplicationBuyerRelationship, referenceNumber: number, checkAndChange?: boolean): SummaryListGroupData => {
  const fields = [
    fieldGroupItem(
      {
        field: getFieldById(FIELDS, HAS_PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER),
        data: answers,
        href: generateChangeLink(
          CREDIT_INSURANCE_COVER_CHANGE,
          CREDIT_INSURANCE_COVER_CHECK_AND_CHANGE,
          `#${HAS_PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER}-label`,
          referenceNumber,
          checkAndChange,
        ),
        renderChangeLink: true,
      },
      mapYesNoField(answers[HAS_PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER]),
    ),
    ...optionalFields(answers, referenceNumber, checkAndChange),
  ] as Array<SummaryListItemData>;

  return {
    title: FORM_TITLE,
    fields,
  };
};

export default creditInsuranceHistoryFields;
