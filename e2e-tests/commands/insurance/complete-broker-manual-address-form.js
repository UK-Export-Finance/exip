import { field } from '../../pages/shared';
import { POLICY as POLICY_FIELD_IDS } from '../../constants/field-ids/insurance/policy';
import mockApplication from '../../fixtures/application';

const { BROKER } = mockApplication;

const {
  BROKER_DETAILS: { FULL_ADDRESS },
} = POLICY_FIELD_IDS;

/**
 * completeBrokerManualAddressForm
 * Complete and submit "broker manual address" form
 * @param {String} fullAddress: Broker's full address
 */
const completeBrokerManualAddressForm = ({ fullAddress = BROKER[FULL_ADDRESS] }) => {
  cy.keyboardInput(field(FULL_ADDRESS).textarea(), fullAddress);
};

export default completeBrokerManualAddressForm;
