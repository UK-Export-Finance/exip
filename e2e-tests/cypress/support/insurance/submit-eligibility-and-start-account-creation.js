import submitInsuranceEligibilityAnswersHappyPath from './eligibility/submit-answers-happy-path';
import { noRadioInput, submitButton } from '../../e2e/pages/shared';
import { completeAccountToApplyOnlineForm } from '../../support/insurance/eligibility/forms';

export default () => {
  submitInsuranceEligibilityAnswersHappyPath();

  // submit "I do not already have an account"
  noRadioInput().click();
  submitButton().click();
};
