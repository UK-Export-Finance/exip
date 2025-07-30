/**
 * completeAndSubmitBrokerDetailsForm
 * Complete and submit "broker details" form
 * @param {string} name: Broker name
 * @param {string} email: Broker email
 * @param {boolean} isBasedInUk: Broker is based in the UK
 * @param {string} postcode: Broker postcode
 * @param {string} buildingNumberOrName: Broker building name or number
 */
const completeAndSubmitBrokerDetailsForm = ({ name, email, isBasedInUk, postcode, buildingNumberOrName }) => {
  cy.completeBrokerDetailsForm({ name, email, isBasedInUk, postcode, buildingNumberOrName });

  cy.clickSubmitButton();
};

export default completeAndSubmitBrokerDetailsForm;
