import submitInsuranceEligibilityAnswersFromBuyerCountryHappyPath from './submit-answers-from-buyer-country-happy-path';

import { completeStartForm, completeCheckIfEligibleForm } from './forms';

/**
 * startNewApplication defaults to false
 * if true, means on the start new application page from check your answers which redirects to buyer country page
 * if true, then do not need to complete start form or check if eligible
 */
export default (startNewApplication = false) => {
  if (!startNewApplication) {
    completeStartForm();
    completeCheckIfEligibleForm();
  }
  submitInsuranceEligibilityAnswersFromBuyerCountryHappyPath();
};
