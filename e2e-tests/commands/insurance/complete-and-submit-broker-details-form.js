/**
 * completeAndSubmitBrokerDetailsForm
 * Complete and submit "broker details" form
 */
const completeAndSubmitBrokerDetailsForm = () => {
  cy.completeBrokerDetailsForm();

  cy.clickSubmitButton();
};

export default completeAndSubmitBrokerDetailsForm;
