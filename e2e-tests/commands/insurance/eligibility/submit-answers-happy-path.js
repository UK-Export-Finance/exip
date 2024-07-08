import submitInsuranceEligibilityAnswersFromExporterLocationHappyPath from './submit-answers-from-exporter-location-happy-path';
import { completeStartForm, completeCheckIfEligibleForm } from './forms';

/**
 * submitAnswersHappyPath
 * Submit the eligibility answers
 * @param {String} companyNumber
 */
const submitAnswersHappyPath = (companyNumber) => {
  completeStartForm();
  completeCheckIfEligibleForm();
  submitInsuranceEligibilityAnswersFromExporterLocationHappyPath({ companyNumber });
};

export default submitAnswersHappyPath;
