import { FIELD_IDS, FIELD_VALUES } from '../../../constants';
import { isSinglePolicyType, isMultiPolicyType } from '../../policy-type';
import { sanitiseData } from '../../sanitise-data';
import { RequestBody, SubmittedDataQuoteEligibility } from '../../../../types';

const {
  ELIGIBILITY: { CREDIT_PERIOD, CONTRACT_VALUE, MAX_AMOUNT_OWED },
  MULTIPLE_POLICY_LENGTH,
  POLICY_LENGTH,
  POLICY_TYPE,
  SINGLE_POLICY_LENGTH,
} = FIELD_IDS;

/**
 * mapSubmittedData
 * Delete policy specific fields depending on what is submitted
 * - Delete single policy length if policy type is multi.
 * - Delete multiple policy length if policy type is single.
 * - Delete contract value if policy type is multi.
 * - Delete maximum amount owed if policy type is single.
 * @param {Object} All submitted data
 * @returns {Object} Submitted data
 */
const mapSubmittedData = (submittedData: SubmittedDataQuoteEligibility): SubmittedDataQuoteEligibility => {
  const mapped = submittedData;

  if (isSinglePolicyType(submittedData[POLICY_TYPE])) {
    mapped[POLICY_LENGTH] = submittedData[POLICY_LENGTH];

    delete mapped[SINGLE_POLICY_LENGTH];
    delete mapped[MULTIPLE_POLICY_LENGTH];
    delete mapped[CREDIT_PERIOD];
    delete mapped[MAX_AMOUNT_OWED];
  }

  if (isMultiPolicyType(submittedData[POLICY_TYPE])) {
    mapped[POLICY_LENGTH] = FIELD_VALUES.POLICY_LENGTH.MULTIPLE;

    delete mapped[SINGLE_POLICY_LENGTH];
    delete mapped[MULTIPLE_POLICY_LENGTH];
    delete mapped[CONTRACT_VALUE];
  }

  return mapped;
};

/**
 * updateSubmittedData
 * update quote eligibility session data with sanitised form data
 * Map and sanitise form data
 * @param {Express.Request.body} Form body
 * @param {Object} Existing submitted data
 * @returns {Object} Mapped and sanitised data
 */
const updateSubmittedData = (formData: RequestBody, existingData?: SubmittedDataQuoteEligibility): SubmittedDataQuoteEligibility => {
  const modifiedData = {
    ...existingData,
    ...formData,
  };

  const sanitised = sanitiseData(modifiedData);

  const mappedFormData = mapSubmittedData(sanitised);

  return mappedFormData;
};

export { mapSubmittedData, updateSubmittedData };
