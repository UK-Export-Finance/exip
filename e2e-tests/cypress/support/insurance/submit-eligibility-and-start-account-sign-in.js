import submitInsuranceEligibilityAnswersHappyPath from './eligibility/submit-answers-happy-path';
import { yesRadioInput, submitButton } from '../../e2e/pages/shared';

export default () => {
  submitInsuranceEligibilityAnswersHappyPath();

  // submit "I already have an account"
  yesRadioInput().click();
  submitButton().click();
};
