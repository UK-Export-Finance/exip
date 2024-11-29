/**
 * completeAndSubmitBrokerDetailsForm
 * Complete and submit "broker details" form
 * @param {String} name: Broker name
 * @param {String} email: Broker email
 * @param {Boolean} isBasedInUk: Broker is based in the UK
 */
const completeAndSubmitBrokerDetailsForm = ({ name, email, isBasedInUk }) => {
  cy.completeBrokerDetailsForm({ name, email, isBasedInUk });

  cy.clickSubmitButton();
};

export default completeAndSubmitBrokerDetailsForm;
