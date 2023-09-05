import { FIELD_IDS, FIELD_VALUES } from '../../../constants';
import { isSinglePolicyType, isMultiplePolicyType } from '../../policy-type';
import { sanitiseData } from '../../sanitise-data';
import { RequestBody, SubmittedDataQuoteEligibility } from '../../../../types';
import { objectHasProperty } from '../../object';

const {
  ELIGIBILITY: { CREDIT_PERIOD, CONTRACT_VALUE, MAX_AMOUNT_OWED },
  POLICY_LENGTH,
  POLICY_TYPE,
} = FIELD_IDS;

/**
 * mapSubmittedData
 * Delete policy specific fields depending on what is submitted.
 * If the policy type is single:
 * - Delete multiple policy length.
 * - Delete maximum amount owed.
 * - Add policy length if provided.
 * If the policy type is multiple:
 * - Delete contract value.
 * - Add a default policy length.
 * @param {Object} All submitted data
 * @returns {Object} Submitted data
 */
const mapSubmittedData = (submittedData: SubmittedDataQuoteEligibility): SubmittedDataQuoteEligibility => {
  const mapped = submittedData;

  if (isSinglePolicyType(submittedData[POLICY_TYPE])) {
    delete mapped[CREDIT_PERIOD];
    delete mapped[MAX_AMOUNT_OWED];

    if (objectHasProperty(submittedData, POLICY_LENGTH)) {
      mapped[POLICY_LENGTH] = submittedData[POLICY_LENGTH];
    }
  }

  if (isMultiplePolicyType(submittedData[POLICY_TYPE])) {
    delete mapped[CONTRACT_VALUE];

    // default policy length for a multiple policy
    mapped[POLICY_LENGTH] = FIELD_VALUES.POLICY_LENGTH.MULTIPLE;
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
