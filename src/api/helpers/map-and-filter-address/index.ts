import { OrdnanceSurveyResponse, Address } from '../../types';
import mapAddress from '../map-address';

/**
 * mapAndFilterAddress
 * filters address based on house number or house name
 * maps filtered address to correct format
 * returns array of matching addresses
 * @param {String} house name or address
 * @param {Array<OrdnanceSurveyResponse>} ordnanceSurveyResponse
 * @returns {Array<Address>} mapped addresses
 */
const mapAndFilterAddress = (houseNameOrNumber: string, ordnanceSurveyResponse: Array<OrdnanceSurveyResponse>) => {
  // returns array of addresses which match house number or house name
  const filtered = ordnanceSurveyResponse.filter(
    (eachAddress) => eachAddress.DPA.BUILDING_NUMBER === houseNameOrNumber || eachAddress.DPA.BUILDING_NAME === houseNameOrNumber,
  );

  // empty array returned if no addresses found
  if (!filtered.length) {
    return [];
  }

  const mappedFilteredAddresses = [] as Array<Address>;

  filtered.forEach((address) => {
    mappedFilteredAddresses.push(mapAddress(address));
  });

  return mappedFilteredAddresses;
};

export default mapAndFilterAddress;
