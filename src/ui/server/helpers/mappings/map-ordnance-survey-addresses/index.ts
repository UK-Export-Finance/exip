import POLICY_FIELD_IDS from '../../../constants/field-ids/insurance/policy';
import { MappedOrdnanceSurveyAddress } from '../../../../types';

const { SELECT_THE_ADDRESS: FIELD_ID } = POLICY_FIELD_IDS.BROKER_ADDRESSES;

/**
 * mapOrdnanceSurveyAddresses
 * Map Ordnance Survey addresses into the required structure for GOV radios component.
 * @param {Array} Array of currency objects
 * @returns {Array} Mapped addresses for GOV radios component
 */
const mapOrdnanceSurveyAddresses = (addresses: Array<MappedOrdnanceSurveyAddress>) => {
  const mapped = addresses.map((address: MappedOrdnanceSurveyAddress) => {
    const addressString = `${address.addressLine1} ${address.addressLine2}`;

    return {
      text: addressString,
      value: addressString,
      label: {
        attributes: {
          'data-cy': `${FIELD_ID}-${addressString}-label`,
        },
      },
      attributes: {
        'data-cy': `${FIELD_ID}-${addressString}-input`,
      },
    };
  });

  return mapped;
};

export default mapOrdnanceSurveyAddresses;
