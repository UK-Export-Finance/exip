import submitInsuranceEligibilityAnswersHappyPath from './eligibility/submit-answers-happy-path';
import { completeEligibleToApplyOnlineForm } from './eligibility/forms';

export default () => {
  submitInsuranceEligibilityAnswersHappyPath();
  completeEligibleToApplyOnlineForm();
};
