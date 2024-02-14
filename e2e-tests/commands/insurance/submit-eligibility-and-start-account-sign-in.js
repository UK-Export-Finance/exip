import submitInsuranceEligibilityAnswersHappyPath from './eligibility/submit-answers-happy-path';
import { yesRadio, submitButton } from '../../pages/shared';

export default () => {
  submitInsuranceEligibilityAnswersHappyPath();

  // submit "I already have an account"
  yesRadio().label().click();
  submitButton().click();
};
