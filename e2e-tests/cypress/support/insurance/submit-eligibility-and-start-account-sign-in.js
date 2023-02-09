import submitInsuranceEligibilityAnswersHappyPath from './eligibility/submit-answers-happy-path';
import { tempCreateAccountButton, yesRadioInput, submitButton } from '../../e2e/pages/shared';

export default () => {
  submitInsuranceEligibilityAnswersHappyPath();

  tempCreateAccountButton().click();

  // submit "I already have an account"
  yesRadioInput().click();
  submitButton().click();
};
