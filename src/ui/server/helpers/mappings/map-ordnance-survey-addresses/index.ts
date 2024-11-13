import { MappedOrdnanceSurveyAddress } from '../../../../types';

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
    };
  });

  return mapped;
};

export default mapOrdnanceSurveyAddresses;
