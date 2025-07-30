import mapAddress from '../map-ordnance-survey-address';
import { Address, OrdnanceSurveyAddress } from '../../types';

/**
 * mapOrdnanceSurveyAddresses
 * Map Ordnance Survey addresses
 * @param {Array<OrdnanceSurveyAddress>} addresses
 * @param {string} houseNameOrNumber
 * @returns {Array<Address>} Filtered addresses
 */
const mapOrdnanceSurveyAddresses = (addresses: Array<OrdnanceSurveyAddress>): Array<Address> => {
  const mapped = addresses.map((address) => mapAddress(address));

  return mapped;
};

export default mapOrdnanceSurveyAddresses;
