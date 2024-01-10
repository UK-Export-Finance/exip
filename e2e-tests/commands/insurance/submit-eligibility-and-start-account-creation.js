import submitInsuranceEligibilityAnswersHappyPath from './eligibility/submit-answers-happy-path';
import { noRadioInput } from '../../pages/shared';

export default () => {
  submitInsuranceEligibilityAnswersHappyPath();

  // submit "I do not already have an account"
  noRadioInput().click();
  cy.clickSubmitButton();
};
