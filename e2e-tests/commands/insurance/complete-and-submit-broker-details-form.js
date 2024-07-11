/**
 * completeAndSubmitBrokerDetailsForm
 * Complete and submit "broker details" form
 * @param {String} name: Broker name
 * @param {String} email: Broker email
 * @param {String} fullAddress: Broker's full address
 */
const completeAndSubmitBrokerDetailsForm = ({ name, email, fullAddress }) => {
  cy.completeBrokerDetailsForm({ name, email, fullAddress });

  cy.clickSubmitButton();
};

export default completeAndSubmitBrokerDetailsForm;
