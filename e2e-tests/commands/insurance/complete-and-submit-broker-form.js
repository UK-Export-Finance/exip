import { brokerPage } from '../../pages/insurance/policy';
import { POLICY as POLICY_FIELD_IDS } from '../../constants/field-ids/insurance/policy';

const {
  BROKER: {
    USING_BROKER,
  },
} = POLICY_FIELD_IDS;

/**
 * completeAndSubmitBrokerForm
 * Complete and submit "using broker" form
 * @param {Boolean} usingBroker: Should submit "yes" or "no" to "using a broker". Defaults to "no".
 */
const completeAndSubmitBrokerForm = ({
  usingBroker = false,
}) => {
  if (usingBroker) {
    brokerPage[USING_BROKER].yesRadioInput().click();
  } else {
    brokerPage[USING_BROKER].noRadioInput().click();
  }

  cy.clickSubmitButton();
};

export default completeAndSubmitBrokerForm;
