import { POLICY_FIELDS as FIELDS } from '../../../../content-strings/fields/insurance';
import FIELD_IDS from '../../../../constants/field-ids/insurance/policy';
import { GBP_CURRENCY_CODE, ROUTES } from '../../../../constants';
import fieldGroupItem from '../../generate-field-group-item';
import getFieldById from '../../../get-field-by-id';
import formatCurrency from '../../../format-currency';
import mapMonthString from '../../../data-content-mappings/map-month-string';
import { ApplicationPolicy, SummaryListItemData } from '../../../../../types';
import generateChangeLink from '../../../generate-change-link';

const {
  CONTRACT_POLICY: {
    MULTIPLE: { TOTAL_MONTHS_OF_COVER, TOTAL_SALES_TO_BUYER, MAXIMUM_BUYER_WILL_OWE },
  },
} = FIELD_IDS;

const {
  INSURANCE: {
    POLICY: { MULTIPLE_CONTRACT_POLICY_CHANGE, MULTIPLE_CONTRACT_POLICY_CHECK_AND_CHANGE },
  },
} = ROUTES;

/**
 * generateMultipleContractPolicyFields
 * Create all fields and values for the Insurance - Type of policy - single contract policy govukSummaryList
 * @param {Object} All submitted policy data
 * @param {Boolean} checkAndChange true if coming application level check your answers (/check-and-change)
 * @returns {Object} All Multiple contract policy fields and values in an object structure for GOVUK summary list structure
 */
const generateMultipleContractPolicyFields = (answers: ApplicationPolicy, referenceNumber: number, checkAndChange: boolean) => {
  const fields = [
    fieldGroupItem(
      {
        field: getFieldById(FIELDS.CONTRACT_POLICY.MULTIPLE, TOTAL_MONTHS_OF_COVER),
        data: answers,
        renderChangeLink: true,
        href: generateChangeLink(
          MULTIPLE_CONTRACT_POLICY_CHANGE,
          MULTIPLE_CONTRACT_POLICY_CHECK_AND_CHANGE,
          `#${TOTAL_MONTHS_OF_COVER}-label`,
          referenceNumber,
          checkAndChange,
        ),
      },
      answers[TOTAL_MONTHS_OF_COVER] && mapMonthString(answers[TOTAL_MONTHS_OF_COVER]),
    ),
    fieldGroupItem(
      {
        field: getFieldById(FIELDS.CONTRACT_POLICY.MULTIPLE, TOTAL_SALES_TO_BUYER),
        data: answers,
        renderChangeLink: true,
        href: generateChangeLink(
          MULTIPLE_CONTRACT_POLICY_CHANGE,
          MULTIPLE_CONTRACT_POLICY_CHECK_AND_CHANGE,
          `#${TOTAL_SALES_TO_BUYER}-label`,
          referenceNumber,
          checkAndChange,
        ),
      },
      answers[TOTAL_SALES_TO_BUYER] && formatCurrency(answers[TOTAL_SALES_TO_BUYER], GBP_CURRENCY_CODE),
    ),
    fieldGroupItem(
      {
        field: getFieldById(FIELDS.CONTRACT_POLICY.MULTIPLE, MAXIMUM_BUYER_WILL_OWE),
        data: answers,
        renderChangeLink: true,
        href: generateChangeLink(
          MULTIPLE_CONTRACT_POLICY_CHANGE,
          MULTIPLE_CONTRACT_POLICY_CHECK_AND_CHANGE,
          `#${MAXIMUM_BUYER_WILL_OWE}-label`,
          referenceNumber,
          checkAndChange,
        ),
      },
      answers[MAXIMUM_BUYER_WILL_OWE] && formatCurrency(answers[MAXIMUM_BUYER_WILL_OWE], GBP_CURRENCY_CODE),
    ),
  ] as Array<SummaryListItemData>;

  return fields;
};

export default generateMultipleContractPolicyFields;
