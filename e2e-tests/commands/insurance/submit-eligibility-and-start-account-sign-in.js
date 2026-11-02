import { INSURANCE_ROUTES } from '../../constants/routes/insurance';
import submitInsuranceEligibilityAnswersHappyPath from './eligibility/submit-answers-happy-path';

export default () => {
  submitInsuranceEligibilityAnswersHappyPath();

  // submit "I already have an account"
  cy.assertPathnameContains(INSURANCE_ROUTES.ELIGIBILITY.HAVE_AN_ACCOUNT);
  cy.clickYesRadioInput();
  cy.clickSubmitButton();
};
