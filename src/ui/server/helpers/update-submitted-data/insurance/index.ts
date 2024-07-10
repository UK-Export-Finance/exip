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
  // only sanitise the new form data
  const sanitisedFormData = sanitiseData(formData);

  const data = {
    ...existingData,
    ...sanitisedFormData,
  };

  return data;
};

export { updateSubmittedData };
