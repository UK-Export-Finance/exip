import submitInsuranceEligibilityAnswersFromExporterLocationHappyPath from './submit-answers-from-exporter-location-happy-path';
import { completeCheckIfEligibleForm } from './forms';

/**
 * submitAnswersHappyPath
 * Submit the eligibility answers
 * @param {String} companyNumber
 */
const submitAnswersHappyPath = (companyNumber) => {
  cy.navigateToCheckIfEligibleUrl();

  completeCheckIfEligibleForm();
  submitInsuranceEligibilityAnswersFromExporterLocationHappyPath({ companyNumber });
};

export default submitAnswersHappyPath;
