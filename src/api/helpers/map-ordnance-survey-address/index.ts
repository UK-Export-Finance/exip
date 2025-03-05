import { Address, OrdnanceSurveyAddress } from '../../types';

/**
 * mapOrdnanceSurveyAddress
 * Maps address from OrdnanceSurveyAddress to a UKEF/EXIP aligned format
 * NOTE - depending on the postcode and "house name or number",
 * Ordnance Survey returns different fields.
 * For example, some addresses will only return one of the following fields:
 * - SUB_BUILDING_NAME
 * - BUILDING_NAME
 * - BUILDING_NUMBER
 * - ORGANISATION_NAME
 * Good examples:
 * postcode = SW1A 2HQ, houseNameOrNumber = 1
 * postcode = SW1A 2HQ, houseNameOrNumber = HM Treasury
 * postcode = SW1A 2JR, houseNameOrNumber = Westminster
 * postcode = W1A 1AA, houseNameOrNumber = House
 * @param {OrdnanceSurveyAddress} address
 * @returns {Address} mapped address
 */
const mapOrdnanceSurveyAddress = (address: OrdnanceSurveyAddress): Address => {
  let addressLine1 = '';

  if (address.DPA.BUILDING_NUMBER) {
    addressLine1 = `${address.DPA.BUILDING_NUMBER} `;
  }

  if (address.DPA.SUB_BUILDING_NAME) {
    addressLine1 += `${address.DPA.SUB_BUILDING_NAME} `;
  }

  if (address.DPA.ORGANISATION_NAME) {
    addressLine1 += `${address.DPA.ORGANISATION_NAME} `;
  }

  if (address.DPA.BUILDING_NAME) {
    addressLine1 += `${address.DPA.BUILDING_NAME} `;
  }

  /**
   * Trim the first address line.
   * Otherwise, it will contain an empty space.
   */
  addressLine1 = addressLine1.trim();

  /**
   * NOTE: Ordnance Survey does not return county data.
   * Therefore this should be set to an empty string,
   * to avoid any null/mapping/type issues.
   */
  const county = '';

  return {
    addressLine1,
    addressLine2: address.DPA.THOROUGHFARE_NAME,
    town: address.DPA.POST_TOWN,
    county,
    postcode: address.DPA.POSTCODE,
  };
};

export default mapOrdnanceSurveyAddress;
