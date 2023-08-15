import submitInsuranceEligibilityAnswersHappyPath from './eligibility/submit-answers-happy-path';
import { yesRadioInput, submitButton } from '../../pages/shared';

export default () => {
  submitInsuranceEligibilityAnswersHappyPath();

  // submit "I already have an account"
  yesRadioInput().click();
  submitButton().click();
};
