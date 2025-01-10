import { OrdnanceSurveyAddress } from '../../types';

/**
 * filterOrdnanceSurveyAddresses
 * Filter Ordnance Survey addresses based on building name/number
 * @param {Array<OrdnanceSurveyAddress>} addresses
 * @param {String} houseNameOrNumber
 * @returns {Array<Address>} Filtered addresses
 */
const filterOrdnanceSurveyAddresses = (addresses: Array<OrdnanceSurveyAddress>, houseNameOrNumber: string): Array<OrdnanceSurveyAddress> => {
  const filtered = addresses.filter((address: OrdnanceSurveyAddress) => {
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
  });

  return filtered;
};

export default filterOrdnanceSurveyAddresses;
