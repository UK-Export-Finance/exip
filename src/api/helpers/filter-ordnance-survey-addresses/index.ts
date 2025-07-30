import { OrdnanceSurveyAddress } from '../../types';

/**
 * filterOrdnanceSurveyAddress
 * Filter an Ordnance Survey address from the provided building name/number
 * @param {OrdnanceSurveyAddress} addresses
 * @param {string} houseNameOrNumber
 * @returns {Address} Filtered address
 */
export const filterOrdnanceSurveyAddress = (address: OrdnanceSurveyAddress, houseNameOrNumber: string): OrdnanceSurveyAddress | null => {
  if (address.DPA.SUB_BUILDING_NAME && address.DPA.SUB_BUILDING_NAME.includes(houseNameOrNumber)) {
    return address;
  }

  if (address.DPA.BUILDING_NAME && address.DPA.BUILDING_NAME.includes(houseNameOrNumber)) {
    return address;
  }

  if (address.DPA.ORGANISATION_NAME && address.DPA.ORGANISATION_NAME.includes(houseNameOrNumber)) {
    return address;
  }

  if (address.DPA.BUILDING_NUMBER && address.DPA.BUILDING_NUMBER.includes(houseNameOrNumber)) {
    return address;
  }

  return null;
};

/**
 * filterOrdnanceSurveyAddresses
 * Filter Ordnance Survey addresses from a provided building name/number
 * @param {Array<OrdnanceSurveyAddress>} addresses
 * @param {string} houseNameOrNumber
 * @returns {Array<Address>} Filtered addresses
 */
const filterOrdnanceSurveyAddresses = (addresses: Array<OrdnanceSurveyAddress>, houseNameOrNumber: string): Array<OrdnanceSurveyAddress> =>
  addresses.filter((address: OrdnanceSurveyAddress) => filterOrdnanceSurveyAddress(address, houseNameOrNumber));

export default filterOrdnanceSurveyAddresses;
