import { POLICY as FIELD_IDS } from '../../../../../constants/field-ids/insurance/policy';
import { XLSX } from '../../../../../content-strings';
import mapBrokerAddressBasedInTheUk from './based-in-the-uk';
import xlsxRow from '../../../helpers/xlsx-row';
import { ApplicationBroker } from '../../../../../types';

const {
  BROKER_DETAILS: { IS_BASED_IN_UK },
  BROKER_MANUAL_ADDRESS: { FULL_ADDRESS },
} = FIELD_IDS;

const { FIELDS } = XLSX;

/**
 * mapBrokerAddress
 * Map an application's broker address fields into an object for XLSX generation
 * - If the broker is based in the UK, consume mapBrokerAddressBasedInTheUk.
 * - Otherwise, simply consume the FULL_ADDRESS field.
 * @param {ApplicationBroker} broker
 * @returns {object} Object for XLSX generation
 */
const mapBrokerAddress = (broker: ApplicationBroker) => {
  let fieldValue = '';

  if (broker[IS_BASED_IN_UK]) {
    fieldValue = mapBrokerAddressBasedInTheUk(broker);
  } else {
    fieldValue = broker[FULL_ADDRESS];
  }

  return xlsxRow(String(FIELDS[FULL_ADDRESS]), fieldValue);
};

export default mapBrokerAddress;
