import { POLICY as FIELD_IDS } from '../../../../../constants/field-ids/insurance/policy';
import { XLSX } from '../../../../../content-strings';
import mapBrokerAddressBasedInTheUk from './based-in-the-uk';
import xlsxRow from '../../../helpers/xlsx-row';
import { ApplicationBroker } from '../../../../../types';

const {
  BROKER_MANUAL_ADDRESS: { FULL_ADDRESS },
} = FIELD_IDS;

const { FIELDS } = XLSX;

/**
 * mapBrokerAddress
 * Map an application's broker address fields into an object for XLSX generation
 * - If the broker has a FULL_ADDRESS field, consume the field value.
 * - Otherwise, consume mapBrokerAddressBasedInTheUk.
 * @param {ApplicationBroker} broker
 * @returns {object} Object for XLSX generation
 */
const mapBrokerAddress = (broker: ApplicationBroker) => {
  let fieldValue = '';

  if (broker[FULL_ADDRESS]) {
    fieldValue = broker[FULL_ADDRESS];
  } else {
    fieldValue = mapBrokerAddressBasedInTheUk(broker);
  }

  return xlsxRow(String(FIELDS[FULL_ADDRESS]), fieldValue);
};

export default mapBrokerAddress;
