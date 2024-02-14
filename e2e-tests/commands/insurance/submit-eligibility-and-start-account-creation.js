import submitInsuranceEligibilityAnswersHappyPath from './eligibility/submit-answers-happy-path';
import { noRadio, submitButton } from '../../pages/shared';

export default () => {
  submitInsuranceEligibilityAnswersHappyPath();

  // submit "I do not already have an account"
  noRadio().label().click();
  submitButton().click();
};
