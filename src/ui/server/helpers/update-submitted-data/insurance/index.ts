import { sanitiseData } from '../../sanitise-data';
import { RequestBody, SubmittedDataInsuranceEligibility } from '../../../../types';

/*
 * updateSubmittedData
 * update insurance eligibility session data with sanitised form data
 */
const updateSubmittedData = (formData: RequestBody, existingData?: SubmittedDataInsuranceEligibility): SubmittedDataInsuranceEligibility => {
  const submittedFormData = formData;
  delete submittedFormData._csrf;

  const modifiedData = {
    ...existingData,
    ...submittedFormData,
  };

  const sanitised = sanitiseData(modifiedData);

  return sanitised;
};

export { updateSubmittedData };
