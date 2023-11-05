import submitInsuranceEligibilityAnswersFromBuyerCountryHappyPath from './submit-answers-from-buyer-country-happy-path';

import { completeStartForm, completeCheckIfEligibleForm } from './forms';

export default () => {
  completeStartForm();
  completeCheckIfEligibleForm();
  submitInsuranceEligibilityAnswersFromBuyerCountryHappyPath();
};
