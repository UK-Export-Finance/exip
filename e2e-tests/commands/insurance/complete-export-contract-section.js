import { submitButton } from '../../pages/shared';

/**
 * completeExportContractSection
 * Complete the "Export contract" section
 * @param {Boolean} submitCheckYourAnswers: Click export contract "check your answers" submit button
 */
const completeExportContractSection = ({ viaTaskList, submitCheckYourAnswers = false }) => {
  cy.startInsuranceExportContractSection({ viaTaskList });

  cy.completeAndSubmitAboutGoodsOrServicesForm({});

  if (submitCheckYourAnswers) {
    submitButton().click();
  }
};

export default completeExportContractSection;
