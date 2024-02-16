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
  YOUR_BUYER: { CONNECTION_TO_BUYER: FORM_TITLE },
} = FORM_TITLES;

const {
  INSURANCE: {
    YOUR_BUYER: { CONNECTION_WITH_BUYER_CHANGE, CONNECTION_WITH_BUYER_CHECK_AND_CHANGE },
  },
} = ROUTES;

const { CONNECTION_WITH_BUYER, CONNECTION_WITH_BUYER_DESCRIPTION } = FIELD_IDS;

/**
 * optionalFields
 * optionalFields for connection with buyer summary list
 * if CONNECTION_WITH_BUYER is true, then renders extra row in summary list
 * @param {ApplicationBuyerRelationship} answers: Buyer answers
 * @param {Number} referenceNumber: Application reference number
 * @param {Boolean} checkAndChange: true if coming from check your answers section in submit application section
 * @returns {Array<SummaryListItemData>} Array including or excluding CONNECTION_WITH_BUYER_DESCRIPTION in an object structure for GOVUK summary list structure
 */
export const optionalFields = (answers: ApplicationBuyerRelationship, referenceNumber: number, checkAndChange?: boolean) => {
  const fields = [] as Array<SummaryListItemData>;

  /**
   * if CONNECTION_WITH_BUYER is true
   * pushes CONNECTION_WITH_BUYER_DESCRIPTION to the summary list
   */
  if (answers[CONNECTION_WITH_BUYER]) {
    fields.push(
      fieldGroupItem({
        field: getFieldById(FIELDS, CONNECTION_WITH_BUYER_DESCRIPTION),
        data: answers,
        href: generateChangeLink(
          CONNECTION_WITH_BUYER_CHANGE,
          CONNECTION_WITH_BUYER_CHECK_AND_CHANGE,
          `#${CONNECTION_WITH_BUYER_DESCRIPTION}-label`,
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
 * connectionWithBuyerFields
 * Create all connection with buyer fields and values for the Insurance - your buyer govukSummaryList
 * @param {ApplicationBuyer} answers: buyer relationship data
 * @param {Number} referenceNumber: Application reference number
 * @param {Boolean} checkAndChange: Is "check and change"
 * @returns {Array<SummaryListItemData>} All connection with buyer fields and values in an object structure for GOVUK summary list structure
 */
const connectionWithBuyerFields = (answers: ApplicationBuyerRelationship, referenceNumber: number, checkAndChange?: boolean): SummaryListGroupData => {
  const fields = [
    fieldGroupItem(
      {
        field: getFieldById(FIELDS, CONNECTION_WITH_BUYER),
        data: answers,
        href: generateChangeLink(
          CONNECTION_WITH_BUYER_CHANGE,
          CONNECTION_WITH_BUYER_CHECK_AND_CHANGE,
          `#${CONNECTION_WITH_BUYER}-label`,
          referenceNumber,
          checkAndChange,
        ),
        renderChangeLink: true,
      },
      mapYesNoField(answers[CONNECTION_WITH_BUYER]),
    ),
    ...optionalFields(answers, referenceNumber, checkAndChange),
  ] as Array<SummaryListItemData>;

  return {
    title: FORM_TITLE,
    fields,
  };
};

export default connectionWithBuyerFields;
