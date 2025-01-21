import { ORDNANCE_SURVEY_EXAMPLES } from '../../constants';
import { radios } from '../../pages/shared';
import { POLICY as POLICY_FIELD_IDS } from '../../constants/field-ids/insurance/policy';

const { TREASURY } = ORDNANCE_SURVEY_EXAMPLES;

const {
  BROKER_ADDRESSES: { SELECT_THE_ADDRESS: FIELD_ID },
} = POLICY_FIELD_IDS;

/**
 * completeBrokerAddressesForm
 * Complete "broker addresses" form
 * @param {String} optionValue: Address option value
 */
const completeBrokerAddressesForm = ({ optionValue = `${TREASURY.ADDRESS_LINE_1} ${TREASURY.ADDRESS_LINE_2}` }) => {
  const optionDataCy = `${FIELD_ID}-${optionValue}`;

  radios(optionDataCy).option.label().click();
};

export default completeBrokerAddressesForm;
