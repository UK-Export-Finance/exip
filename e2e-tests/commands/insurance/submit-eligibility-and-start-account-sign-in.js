import submitInsuranceEligibilityAnswersHappyPath from './eligibility/submit-answers-happy-path';

export default () => {
  submitInsuranceEligibilityAnswersHappyPath();

  // submit "I already have an account"
  cy.clickYesRadioInput();
  cy.clickSubmitButton();
};
