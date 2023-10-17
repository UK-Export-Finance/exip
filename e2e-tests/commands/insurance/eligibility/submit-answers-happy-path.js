import submitInsuranceEligibilityAnswersFromExporterLocationHappyPath from './submit-answers-from-exporter-location-happy-path';
import { completeStartForm, completeCheckIfEligibleForm } from './forms';

export default () => {
  completeStartForm();
  completeCheckIfEligibleForm();
  submitInsuranceEligibilityAnswersFromExporterLocationHappyPath();
};
