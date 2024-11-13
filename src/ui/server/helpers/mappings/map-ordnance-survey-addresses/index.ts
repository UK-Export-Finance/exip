import { MappedOrdnanceSurveyAddress } from '../../../../types';

/**
 * mapOrdnanceSurveyAddresses
 * Map Ordnance Survey addresses into the required structure for GOV radios component.
 * @param {Array} Array of currency objects
 * @returns {Array} Mapped addresses for GOV radios component
 */
const mapOrdnanceSurveyAddresses = (addresses: Array<MappedOrdnanceSurveyAddress>) => {
  const mapped = addresses.map((address: MappedOrdnanceSurveyAddress) => ({
    text: address.addressLine1,
    value: address.addressLine1,
  }));

  return mapped;
};

export default mapOrdnanceSurveyAddresses;
