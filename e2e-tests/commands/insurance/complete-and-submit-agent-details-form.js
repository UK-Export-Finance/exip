/**
 * completeAndSubmitAgentDetailsForm
 * Complete and submit the "Agent details" form
 * @param {String} name: Agent's name
 * @param {String} fullAddress: Agent's address
 * @param {String} countryCode: Agent's country code
 */
const completeAndSubmitAgentDetailsForm = ({
  name,
  fullAddress,
  countryCode,
}) => {
  cy.completeAgentDetailsForm({
    name,
    fullAddress,
    countryCode,
  });

  cy.clickSubmitButton();
};

export default completeAndSubmitAgentDetailsForm;
