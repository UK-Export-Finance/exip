/**
 * completeAndSubmitBrokerAddressesForm
 * Complete and submit "broker addresses" form
 * @param {String} optionValue: Address option value
 */
const completeAndSubmitBrokerAddressesForm = ({ optionValue }) => {
  cy.completeBrokerAddressesForm({ optionValue });

  cy.clickSubmitButton();
};

export default completeAndSubmitBrokerAddressesForm;
