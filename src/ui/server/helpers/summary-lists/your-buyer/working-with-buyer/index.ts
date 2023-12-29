import { YOUR_BUYER_FIELDS as FIELDS } from '../../../../content-strings/fields/insurance';
import INSURANCE_FIELD_IDS from '../../../../constants/field-ids/insurance';
import { ROUTES } from '../../../../constants';
import fieldGroupItem from '../../generate-field-group-item';
import getFieldById from '../../../get-field-by-id';
import mapYesNoField from '../../../mappings/map-yes-no-field';
import generateChangeLink from '../../../generate-change-link';
import { ApplicationBuyer, SummaryListItemData } from '../../../../../types';

const { YOUR_BUYER: FIELD_IDS } = INSURANCE_FIELD_IDS;

const {
  INSURANCE: {
    YOUR_BUYER: { CONNECTION_WITH_BUYER_CHANGE, CONNECTION_WITH_BUYER_CHECK_AND_CHANGE, TRADED_WITH_BUYER_CHANGE, TRADED_WITH_BUYER_CHECK_AND_CHANGE },
  },
} = ROUTES;

const { CONNECTION_WITH_BUYER, CONNECTION_WITH_BUYER_DESCRIPTION, TRADED_WITH_BUYER } = FIELD_IDS;

/**
 * optionalFields
 * optionalFields for working with buyer summary list
 * if CONNECTION_WITH_BUYER is true, then renders extra row in summary list
 * @param {ApplicationBuyer} answers
 * @param {Number} referenceNumber
 * @param {Boolean} checkAndChange
 * @returns {Object} Array including or excluding CONNECTION_WITH_BUYER_DESCRIPTION in an object structure for GOVUK summary list structure
 */
export const optionalFields = (answers: ApplicationBuyer, referenceNumber: number, checkAndChange: boolean) => {
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
  ] as Array<SummaryListItemData>;

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
 * workingWithBuyerFields
 * Create all working with buyer fields and values for the Insurance - your buyer govukSummaryList
 * @param {ApplicationBuyer} answers buyer data
 * @param {Number} referenceNumber application reference number
 * @returns {Object} All working with buyer fields and values in an object structure for GOVUK summary list structure
 */
const workingWithBuyerFields = (answers: ApplicationBuyer, referenceNumber: number, checkAndChange: boolean) => {
  const fields = [
    ...optionalFields(answers, referenceNumber, checkAndChange),
    fieldGroupItem(
      {
        field: getFieldById(FIELDS, TRADED_WITH_BUYER),
        data: answers,
        href: generateChangeLink(TRADED_WITH_BUYER_CHANGE, TRADED_WITH_BUYER_CHECK_AND_CHANGE, `#${TRADED_WITH_BUYER}-label`, referenceNumber, checkAndChange),
        renderChangeLink: true,
      },
      mapYesNoField(answers[TRADED_WITH_BUYER]),
    ),
  ] as Array<SummaryListItemData>;

  return fields;
};

export default workingWithBuyerFields;
