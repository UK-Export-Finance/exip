/**
 * completeAndSubmitBrokerAddressesForm
 * Complete and submit "broker addresses" form
 * @param {String} optionValue: Address option value
 */
const completeAndSubmitBrokerAddressesForm = ({ optionValue }) => {
  cy.completeBrokerDetailsForm({ optionValue });

  cy.clickSubmitButton();
};

export default completeAndSubmitBrokerAddressesForm;
