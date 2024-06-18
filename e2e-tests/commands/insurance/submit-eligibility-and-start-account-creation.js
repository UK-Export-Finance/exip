import submitInsuranceEligibilityAnswersHappyPath from './eligibility/submit-answers-happy-path';

export default () => {
  submitInsuranceEligibilityAnswersHappyPath();

  // submit "I do not already have an account"
  cy.clickNoRadioInput();
  cy.clickSubmitButton();
};
