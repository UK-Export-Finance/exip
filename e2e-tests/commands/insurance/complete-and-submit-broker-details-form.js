/**
 * completeAndSubmitBrokerDetailsForm
 * Complete and submit "broker details" form
 * @param {String} name: Broker name
 * @param {String} email: Broker email
 * @param {Boolean} isBasedInUk: Broker is based in the UK
 * @param {String} postcode: Broker postcode
 * @param {String} buildingNumberOrName: Broker building name or number
 */
const completeAndSubmitBrokerDetailsForm = ({ name, email, isBasedInUk, postcode, buildingNumberOrName }) => {
  cy.completeBrokerDetailsForm({ name, email, isBasedInUk, postcode, buildingNumberOrName });

  cy.clickSubmitButton();
};

export default completeAndSubmitBrokerDetailsForm;
