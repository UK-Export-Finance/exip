import { POLICY_FIELDS as FIELDS } from '../../../../../content-strings/fields/insurance';
import { POLICY as POLICY_FIELD_IDS } from '../../../../../constants/field-ids/insurance/policy';
import { INSURANCE_ROUTES } from '../../../../../constants/routes/insurance';
import fieldGroupItem from '../../../generate-field-group-item';
import getFieldById from '../../../../get-field-by-id';
import formatCurrency from '../../../../format-currency';
import mapMonthString from '../../../../data-content-mappings/map-month-string';
import { ApplicationPolicy, SummaryListItemData } from '../../../../../../types';
import generateChangeLink from '../../../../generate-change-link';

const {
  CONTRACT_POLICY: {
    POLICY_CURRENCY_CODE,
    MULTIPLE: { TOTAL_MONTHS_OF_COVER },
  },
  EXPORT_VALUE: {
    MULTIPLE: { TOTAL_SALES_TO_BUYER, MAXIMUM_BUYER_WILL_OWE },
  },
} = POLICY_FIELD_IDS;

const {
  POLICY: {
    MULTIPLE_CONTRACT_POLICY_CHANGE,
    MULTIPLE_CONTRACT_POLICY_CHECK_AND_CHANGE,
    MULTIPLE_CONTRACT_POLICY_EXPORT_VALUE_CHANGE,
    MULTIPLE_CONTRACT_POLICY_EXPORT_VALUE_CHECK_AND_CHANGE,
  },
} = INSURANCE_ROUTES;

/**
 * generateMultipleContractPolicyFields
 * Create all fields and values for the Insurance - Type of policy - single contract policy govukSummaryList
 * @param {object} All submitted policy data
 * @param {boolean} checkAndChange true if coming application level check your answers (/check-and-change)
 * @returns {object} All Multiple contract policy fields and values in an object structure for GOVUK summary list structure
 */
const generateMultipleContractPolicyFields = (answers: ApplicationPolicy, referenceNumber: number, checkAndChange?: boolean) => {
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
      mapMonthString(Number(answers[TOTAL_MONTHS_OF_COVER])),
    ),
    fieldGroupItem(
      {
        field: getFieldById(FIELDS.EXPORT_VALUE.MULTIPLE, TOTAL_SALES_TO_BUYER),
        data: answers,
        renderChangeLink: true,
        href: generateChangeLink(
          MULTIPLE_CONTRACT_POLICY_EXPORT_VALUE_CHANGE,
          MULTIPLE_CONTRACT_POLICY_EXPORT_VALUE_CHECK_AND_CHANGE,
          `#${TOTAL_SALES_TO_BUYER}-label`,
          referenceNumber,
          checkAndChange,
        ),
      },
      formatCurrency(Number(answers[TOTAL_SALES_TO_BUYER]), String(answers[POLICY_CURRENCY_CODE])),
    ),
    fieldGroupItem(
      {
        field: getFieldById(FIELDS.EXPORT_VALUE.MULTIPLE, MAXIMUM_BUYER_WILL_OWE),
        data: answers,
        renderChangeLink: true,
        href: generateChangeLink(
          MULTIPLE_CONTRACT_POLICY_EXPORT_VALUE_CHANGE,
          MULTIPLE_CONTRACT_POLICY_EXPORT_VALUE_CHECK_AND_CHANGE,
          `#${MAXIMUM_BUYER_WILL_OWE}-label`,
          referenceNumber,
          checkAndChange,
        ),
      },
      formatCurrency(Number(answers[MAXIMUM_BUYER_WILL_OWE]), String(answers[POLICY_CURRENCY_CODE])),
    ),
  ] as Array<SummaryListItemData>;

  return fields;
};

export default generateMultipleContractPolicyFields;
