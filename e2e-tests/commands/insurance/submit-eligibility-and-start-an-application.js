import submitInsuranceEligibilityAnswersHappyPath from './eligibility/submit-answers-happy-path';

export default () => {
  submitInsuranceEligibilityAnswersHappyPath();
  cy.completeEligibleToApplyOnlineForm();
};
