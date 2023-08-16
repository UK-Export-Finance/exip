import submitInsuranceEligibilityAnswersHappyPath from './eligibility/submit-answers-happy-path';
import { noRadioInput, submitButton } from '../../pages/shared';

export default () => {
  submitInsuranceEligibilityAnswersHappyPath();

  // submit "I do not already have an account"
  noRadioInput().click();
  submitButton().click();
};
