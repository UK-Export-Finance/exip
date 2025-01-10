import mapAddress from '../map-ordnance-survey-address';
import { Address, OrdnanceSurveyResponse } from '../../types';

/**
 * mapOrdnanceSurveyAddresses
 * Map Ordnance Survey addresses
 * @param {Array<OrdnanceSurveyResponse>} addresses
 * @param {String} houseNameOrNumber
 * @returns {Array<Address>} Filtered addresses
 */
const mapOrdnanceSurveyAddresses = (addresses: Array<OrdnanceSurveyResponse>): Array<Address> => {
  const mapped = addresses.map((address) => mapAddress(address));

  return mapped;
};

export default mapOrdnanceSurveyAddresses;
