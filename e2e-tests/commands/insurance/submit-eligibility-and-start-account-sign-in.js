import submitInsuranceEligibilityAnswersHappyPath from './eligibility/submit-answers-happy-path';
import { yesRadioInput } from '../../pages/shared';

export default () => {
  submitInsuranceEligibilityAnswersHappyPath();

  // submit "I already have an account"
  yesRadioInput().click();
  cy.clickSubmitButton();
};
