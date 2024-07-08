import submitInsuranceEligibilityAnswersFromExporterLocationHappyPath from './submit-answers-from-exporter-location-happy-path';
import { completeCheckIfEligibleForm } from './forms';

export default () => {
  cy.navigateToCheckIfEligibleUrl();

  completeCheckIfEligibleForm();
  submitInsuranceEligibilityAnswersFromExporterLocationHappyPath();
};
