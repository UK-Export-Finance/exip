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
    YOUR_BUYER: { WORKING_WITH_BUYER_CHANGE, WORKING_WITH_BUYER_CHECK_AND_CHANGE },
  },
} = ROUTES;

const {
  WORKING_WITH_BUYER: { CONNECTED_WITH_BUYER, TRADED_WITH_BUYER },
} = FIELD_IDS;

/**
 * workingWithBuyerFields
 * Create all working with buyer fields and values for the Insurance - your buyer govukSummaryList
 * @param {ApplicationBuyer} answers buyer data
 * @param {Number} referenceNumber application reference number
 * @returns {Object} All working with buyer fields and values in an object structure for GOVUK summary list structure
 */
const workingWithBuyerFields = (answers: ApplicationBuyer, referenceNumber: number, checkAndChange: boolean) => {
  const fields = [
    fieldGroupItem(
      {
        field: getFieldById(FIELDS.WORKING_WITH_BUYER, CONNECTED_WITH_BUYER),
        data: answers,
        href: generateChangeLink(
          WORKING_WITH_BUYER_CHANGE,
          WORKING_WITH_BUYER_CHECK_AND_CHANGE,
          `#${CONNECTED_WITH_BUYER}-label`,
          referenceNumber,
          checkAndChange,
        ),
        renderChangeLink: true,
      },
      mapYesNoField(answers[CONNECTED_WITH_BUYER]),
    ),
    fieldGroupItem(
      {
        field: getFieldById(FIELDS.WORKING_WITH_BUYER, TRADED_WITH_BUYER),
        data: answers,
        href: generateChangeLink(
          WORKING_WITH_BUYER_CHANGE,
          WORKING_WITH_BUYER_CHECK_AND_CHANGE,
          `#${TRADED_WITH_BUYER}-label`,
          referenceNumber,
          checkAndChange,
        ),
        renderChangeLink: true,
      },
      mapYesNoField(answers[TRADED_WITH_BUYER]),
    ),
  ] as Array<SummaryListItemData>;

  return fields;
};

export default workingWithBuyerFields;
