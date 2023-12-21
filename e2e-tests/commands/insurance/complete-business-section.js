import { submitButton } from '../../pages/shared';

/**
 * completeBusinessSection
 * Complete the "business" section
 * @param {Boolean} differentTradingAddress: Should submit "yes" to "trade from a different address" in the "company details" form.
 * @param {Boolean} submitCheckYourAnswers: Click policy "check your answers" submit button
 */
const completeBusinessSection = ({ differentTradingAddress = false, submitCheckYourAnswers = false }) => {
  cy.startYourBusinessSection({});

  cy.completeAndSubmitCompanyDetails({ differentTradingAddress });

  if (differentTradingAddress) {
    cy.completeAndSubmitAlternativeTradingAddressForm();
  }

  cy.completeAndSubmitNatureOfYourBusiness();
  cy.completeAndSubmitTurnoverForm();
  cy.completeAndSubmitCreditControlForm({});

  if (submitCheckYourAnswers) {
    submitButton().click();
  }
};

export default completeBusinessSection;
