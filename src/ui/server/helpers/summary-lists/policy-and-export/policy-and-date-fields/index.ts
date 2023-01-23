import { POLICY_AND_EXPORTS_FIELDS as FIELDS } from '../../../../content-strings/fields/insurance';
import { FIELD_IDS, ROUTES } from '../../../../constants';
import fieldGroupItem from '../../generate-field-group-item';
import getFieldById from '../../../get-field-by-id';
import formatDate from '../../../date/format-date';
import { isSinglePolicyType, isMultiPolicyType } from '../../../policy-type';
import { ApplicationPolicyAndExport, SummaryListItemData } from '../../../../../types';

const {
  INSURANCE: {
    POLICY_AND_EXPORTS: {
      TYPE_OF_POLICY: { POLICY_TYPE },
      CONTRACT_POLICY: { REQUESTED_START_DATE },
    },
  },
} = FIELD_IDS;

const {
  INSURANCE: {
    INSURANCE_ROOT,
    POLICY_AND_EXPORTS: { TYPE_OF_POLICY_CHANGE, SINGLE_CONTRACT_POLICY_CHANGE, MULTIPLE_CONTRACT_POLICY_CHANGE },
  },
} = ROUTES;

/**
 * requestedStartDateChangeLink
 * Get requested start date change link depending on the policy type
 * @param {String} Policy type
 * @param {Number} Application reference number
 * @returns {Object} Requested start date object with link
 */
export const requestedStartDateChangeLink = (policyType: string, referenceNumber: number) => {
  if (isSinglePolicyType(policyType)) {
    return {
      renderChangeLink: true,
      href: `${INSURANCE_ROOT}/${referenceNumber}${SINGLE_CONTRACT_POLICY_CHANGE}#${REQUESTED_START_DATE}-label`,
    };
  }

  if (isMultiPolicyType(policyType)) {
    return {
      renderChangeLink: true,
      href: `${INSURANCE_ROOT}/${referenceNumber}${MULTIPLE_CONTRACT_POLICY_CHANGE}#${REQUESTED_START_DATE}-label`,
    };
  }

  return {
    renderChangeLink: false,
  };
};

/**
 * generatePolicyAndDateFields
 * Create all policy and date fields and values for the Insurance - Type of policy govukSummaryList
 * @param {Object} All submitted policy and export data
 * @returns {Object} All policy and date fields and values in an object structure for GOVUK summary list structure
 */
const generatePolicyAndDateFields = (answers: ApplicationPolicyAndExport, referenceNumber: number) => {
  const fields = [
    fieldGroupItem({
      field: getFieldById(FIELDS, POLICY_TYPE),
      data: answers,
      href: `${INSURANCE_ROOT}/${referenceNumber}${TYPE_OF_POLICY_CHANGE}#heading`,
      renderChangeLink: true,
    }),
    fieldGroupItem(
      {
        field: getFieldById(FIELDS.CONTRACT_POLICY, REQUESTED_START_DATE),
        ...requestedStartDateChangeLink(answers[POLICY_TYPE], referenceNumber),
      },
      formatDate(answers[REQUESTED_START_DATE]),
    ),
  ] as Array<SummaryListItemData>;

  return fields;
};

export default generatePolicyAndDateFields;
