import { sanitiseData } from '../../sanitise-data';
import { RequestBody, SubmittedDataInsuranceEligibility } from '../../../../types';

/*
 * updateSubmittedData
 * update insurance eligibility session data with sanitised form data
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
