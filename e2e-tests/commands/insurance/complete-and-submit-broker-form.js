import { yesRadioInput, noRadioInput } from '../../pages/shared';

/**
 * completeAndSubmitBrokerForm
 * Complete and submit "using broker" form
 * @param {Boolean} usingBroker: Should submit "yes" or "no" to "using a broker". Defaults to "no".
 */
const completeAndSubmitBrokerForm = ({
  usingBroker = false,
}) => {
  if (usingBroker) {
    yesRadioInput().click();
  } else {
    noRadioInput().click();
  }

  cy.clickSubmitButton();
};

export default completeAndSubmitBrokerForm;
