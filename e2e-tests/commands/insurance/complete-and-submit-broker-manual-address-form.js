/**
 * completeAndSubmitBrokerManualAddressForm
 * Complete and submit "broker manual address" form
 * @param {string} fullAddress: Broker's full address
 */
const completeAndSubmitBrokerManualAddressForm = ({ fullAddress }) => {
  cy.completeBrokerManualAddressForm({ fullAddress });

  cy.clickSubmitButton();
};

export default completeAndSubmitBrokerManualAddressForm;
