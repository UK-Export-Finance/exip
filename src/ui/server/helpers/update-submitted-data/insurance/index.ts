import { sanitiseData } from '../../sanitise-data';
import { RequestBody, SubmittedDataInsuranceEligibility } from '../../../../types';

/**
 * updateSubmittedData
 * update insurance eligibility session data with sanitised form data
 * Map and sanitise form data
 * @param {Express.Request.body} Form body
 * @param {Object} Existing submitted data
 * @returns {Object} Mapped and sanitised data
 */
const updateSubmittedData = (formData: RequestBody, existingData?: SubmittedDataInsuranceEligibility): SubmittedDataInsuranceEligibility => {
  const modifiedData = {
    ...existingData,
    ...formData,
  };

  const sanitised = sanitiseData(modifiedData);

  return sanitised;
};

export { updateSubmittedData };
