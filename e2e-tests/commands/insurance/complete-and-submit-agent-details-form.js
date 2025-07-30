/**
 * completeAndSubmitAgentDetailsForm
 * Complete and submit the "Agent details" form
 * @param {string} name: Agent's name
 * @param {string} fullAddress: Agent's address
 * @param {string} countryCode: Agent's country code
 */
const completeAndSubmitAgentDetailsForm = ({ name, fullAddress, countryCode }) => {
  cy.completeAgentDetailsForm({
    name,
    fullAddress,
    countryCode,
  });

  cy.clickSubmitButton();
};

export default completeAndSubmitAgentDetailsForm;
