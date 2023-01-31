import submitInsuranceEligibilityAnswersHappyPath from './eligibility/submit-answers-happy-path';
import { tempCreateAccountButton, noRadioInput, submitButton } from '../../e2e/pages/shared';

export default () => {
  submitInsuranceEligibilityAnswersHappyPath();

  tempCreateAccountButton().click();
  
  // submit "I do not already have an account"
  noRadioInput().click();
  submitButton().click();
};
