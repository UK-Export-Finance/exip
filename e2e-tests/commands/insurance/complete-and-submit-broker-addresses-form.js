/**
 * completeAndSubmitBrokerAddressesForm
 * Complete and submit "broker addresses" form
 * @param {string} optionValue: Address option value
 */
const completeAndSubmitBrokerAddressesForm = ({ optionValue }) => {
  cy.completeBrokerAddressesForm({ optionValue });

  cy.clickSubmitButton();
};

export default completeAndSubmitBrokerAddressesForm;
