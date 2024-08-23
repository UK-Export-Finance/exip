/**
 * completeAndSubmitCheckYourAnswers
 * Complete and submit all "Application - Check your answers" forms:
 * 1) Your business
 * 2) Your buyer
 * 3) Policy
 * 4) Export contract
 */
const completeAndSubmitCheckYourAnswers = () => {
  cy.clickTaskCheckAnswers();

  cy.completeAndSubmitMultipleCheckYourAnswers({ count: 4 });
};

export default completeAndSubmitCheckYourAnswers;
