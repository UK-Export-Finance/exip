import { submitButton } from '../../pages/shared';

/**
 * completeExportContractSection
 * Complete the "Export contract" section
 * @param {Boolean} exporterHasTradedWithBuyer: Submit "yes" to "have traded with buyer before" in the "working with buyer" form.
 * @param {Boolean} submitCheckYourAnswers: Click buyer "check your answers" submit button
 */
const completeBuyerSection = ({ viaTaskList, exporterHasTradedWithBuyer, submitCheckYourAnswers = false }) => {
  cy.startInsuranceYourBuyerSection({ viaTaskList });

  cy.completeAndSubmitCompanyOrOrganisationForm({});
  cy.completeAndSubmitConnectionToTheBuyerForm({});
  cy.completeAndSubmitWorkingWithBuyerForm({ exporterHasTradedWithBuyer });

  if (submitCheckYourAnswers) {
    submitButton().click();
  }
};

export default completeBuyerSection;
