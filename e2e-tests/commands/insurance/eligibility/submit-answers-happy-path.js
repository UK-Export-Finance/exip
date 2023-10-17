import submitInsuranceEligibilityAnswersFromExporterLocationHappyPath from './submit-answers-from-exporter-location-happy-path';

export default () => {
  cy.completeStartForm();
  cy.completeCheckIfEligibleForm();
  submitInsuranceEligibilityAnswersFromExporterLocationHappyPath();
};
