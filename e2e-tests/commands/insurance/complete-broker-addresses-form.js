import { radios } from '../../pages/shared';
import { POLICY as POLICY_FIELD_IDS } from '../../constants/field-ids/insurance/policy';

const {
  BROKER_ADDRESSES: { SELECT_THE_ADDRESS: FIELD_ID },
} = POLICY_FIELD_IDS;

/**
 * completeBrokerAddressesForm
 * Complete "broker addresses" form
 * @param {String} optionValue: Address option value
 */
const completeBrokerAddressesForm = ({ optionValue = 'BRITISH BROADCASTING CORPORATION WOGAN HOUSE PORTLAND PLACE' }) => {
  const optionId = `${FIELD_ID}-${optionValue}`;

  radios(optionId).option.label().click();
};

export default completeBrokerAddressesForm;
