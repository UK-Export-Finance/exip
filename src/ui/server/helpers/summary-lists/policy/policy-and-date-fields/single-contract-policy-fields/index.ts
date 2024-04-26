import { POLICY_FIELDS as FIELDS } from '../../../../../content-strings/fields/insurance';
import FIELD_IDS from '../../../../../constants/field-ids/insurance/policy';
import { INSURANCE_ROUTES } from '../../../../../constants/routes/insurance';
import fieldGroupItem from '../../../generate-field-group-item';
import getFieldById from '../../../../get-field-by-id';
import formatDate from '../../../../date/format-date';
import formatCurrency from '../../../../format-currency';
import { ApplicationPolicy, SummaryListItemData } from '../../../../../../types';
import generateChangeLink from '../../../../generate-change-link';

const {
  CONTRACT_POLICY: {
    POLICY_CURRENCY_CODE,
    SINGLE: { CONTRACT_COMPLETION_DATE, TOTAL_CONTRACT_VALUE },
  },
} = FIELD_IDS;

const {
  POLICY: {
    SINGLE_CONTRACT_POLICY_CHANGE,
    SINGLE_CONTRACT_POLICY_CHECK_AND_CHANGE,
    SINGLE_CONTRACT_POLICY_TOTAL_CONTRACT_VALUE_CHANGE,
    SINGLE_CONTRACT_POLICY_TOTAL_CONTRACT_VALUE_CHECK_AND_CHANGE,
  },
} = INSURANCE_ROUTES;

/**
 * generateSingleContractPolicyFields
 * Create all fields and values for the Insurance - Type of policy - single contract policy govukSummaryList
 * @param {Object} All submitted policy data
 * @param {Boolean} checkAndChange true if coming from check your answers section in submit application section
 * @returns {Object} All Multiple contract policy fields and values in an object structure for GOVUK summary list structure
 */
const generateSingleContractPolicyFields = (answers: ApplicationPolicy, referenceNumber: number, checkAndChange: boolean) => {
  const fields = [
    fieldGroupItem(
      {
        field: getFieldById(FIELDS.CONTRACT_POLICY.SINGLE, CONTRACT_COMPLETION_DATE),
        renderChangeLink: true,
        href: generateChangeLink(
          SINGLE_CONTRACT_POLICY_CHANGE,
          SINGLE_CONTRACT_POLICY_CHECK_AND_CHANGE,
          `#${CONTRACT_COMPLETION_DATE}-label`,
          referenceNumber,
          checkAndChange,
        ),
      },
      answers[CONTRACT_COMPLETION_DATE] && formatDate(answers[CONTRACT_COMPLETION_DATE]),
    ),
    fieldGroupItem(
      {
        field: getFieldById(FIELDS.CONTRACT_POLICY.SINGLE, TOTAL_CONTRACT_VALUE),
        renderChangeLink: true,
        href: generateChangeLink(
          SINGLE_CONTRACT_POLICY_TOTAL_CONTRACT_VALUE_CHANGE,
          SINGLE_CONTRACT_POLICY_TOTAL_CONTRACT_VALUE_CHECK_AND_CHANGE,
          `#${TOTAL_CONTRACT_VALUE}-label`,
          referenceNumber,
          checkAndChange,
        ),
      },
      answers[TOTAL_CONTRACT_VALUE] && formatCurrency(answers[TOTAL_CONTRACT_VALUE], answers[POLICY_CURRENCY_CODE]),
    ),
  ] as Array<SummaryListItemData>;

  return fields;
};

export default generateSingleContractPolicyFields;
