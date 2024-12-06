import POLICY_FIELD_IDS from '../../../constants/field-ids/insurance/policy';
import isChecked from './is-checked';
import { MappedOrdnanceSurveyAddress, ApplicationBroker } from '../../../../types';

const { SELECT_THE_ADDRESS: FIELD_ID } = POLICY_FIELD_IDS.BROKER_ADDRESSES;

/**
 * mapOrdnanceSurveyAddresses
 * Map Ordnance Survey addresses into the required structure for GOV radios component.
 * @param {Array<MappedOrdnanceSurveyAddress>} Ordnance survey addresses
 * @param {ApplicationBroker} Application broker address
 * @returns {Array} Mapped addresses for GOV radios component
 */
const mapOrdnanceSurveyAddresses = (addresses: Array<MappedOrdnanceSurveyAddress>, submittedAddress: ApplicationBroker) => {
  const mapped = addresses.map((address: MappedOrdnanceSurveyAddress, index: number) => {
    const addressString = `${address.addressLine1} ${address.addressLine2}`;

    return {
      text: addressString,
      value: String(index),
      label: {
        attributes: {
          'data-cy': `${FIELD_ID}-${addressString}-label`,
        },
      },
      attributes: {
        'data-cy': `${FIELD_ID}-${addressString}-input`,
      },
      checked: isChecked(address, submittedAddress),
    };
  });

  return mapped;
};

export default mapOrdnanceSurveyAddresses;
