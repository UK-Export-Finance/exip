/**
 * completeAndSubmitBrokerDetailsForm
 * Complete and submit "broker details" form
 * @param {String} name: Broker name
 * @param {String} email: Broker email
 * @param {String} fullAddress: Broker's full address
 * @param {Boolean} isBasedInUk: Broker is based in the UK
 */
const completeAndSubmitBrokerDetailsForm = ({ name, email, fullAddress, isBasedInUk }) => {
  cy.completeBrokerDetailsForm({ name, email, fullAddress, isBasedInUk });

  cy.clickSubmitButton();
};

export default completeAndSubmitBrokerDetailsForm;
